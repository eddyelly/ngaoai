"""
NgaoAI Model Training Script
------------------------------
Fine-tunes AfriBERT on the Swahili mobile money scam detection dataset.
Pushes trained model to HuggingFace: AstroLeo/ngaoai-swahili-scam-detector

Usage:
    pip install -r requirements.txt
    huggingface-cli login
    python train.py
"""

import pandas as pd
import numpy as np
from datasets import Dataset, DatasetDict
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
    EarlyStoppingCallback,
)
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import torch
import os

# ─── Config ───────────────────────────────────────────────────────────────────

HF_USERNAME = "AstroLeo"
MODEL_NAME = "ngaoai-swahili-scam-detector"
HF_REPO = f"{HF_USERNAME}/{MODEL_NAME}"

# Base model — multilingual, works well for Swahili
BASE_MODEL = "Davlan/afro-xlmr-mini"  # Lightweight, fast, good for African langs
# Alternative: "xlm-roberta-base" (bigger, slower, more accurate)

DATA_FILES = [
    "../data/raw/scam_examples.csv",
    "../data/raw/ngao_v2_dataset.csv",
]

LABEL2ID = {"SAFE": 0, "SCAM": 1}
ID2LABEL = {0: "SAFE", 1: "SCAM"}

MAX_LENGTH = 128
BATCH_SIZE = 16
EPOCHS = 5
LEARNING_RATE = 2e-5

# ─── Load & Prepare Data ──────────────────────────────────────────────────────

print("📂 Loading dataset...")
dfs = []
for f in DATA_FILES:
    try:
        df = pd.read_csv(f, on_bad_lines='skip')
        dfs.append(df)
        print(f"  Loaded {len(df)} rows from {f}")
    except Exception as e:
        print(f"  Warning: Could not load {f}: {e}")

df = pd.concat(dfs, ignore_index=True)
df = df.dropna(subset=['message', 'label'])
df = df[df['label'].isin(['SCAM', 'SAFE'])]
df['label_id'] = df['label'].map(LABEL2ID)

print(f"\n📊 Dataset stats:")
print(f"  Total: {len(df)}")
print(f"  SCAM: {(df['label'] == 'SCAM').sum()}")
print(f"  SAFE: {(df['label'] == 'SAFE').sum()}")

# Train/val/test split
train_df, temp_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df['label'])
val_df, test_df = train_test_split(temp_df, test_size=0.5, random_state=42, stratify=temp_df['label'])

print(f"\n✂️  Split:")
print(f"  Train: {len(train_df)}")
print(f"  Val:   {len(val_df)}")
print(f"  Test:  {len(test_df)}")

# Convert to HuggingFace Dataset
def make_hf_dataset(df):
    return Dataset.from_dict({
        "text": df['message'].tolist(),
        "label": df['label_id'].tolist(),
    })

dataset = DatasetDict({
    "train": make_hf_dataset(train_df),
    "validation": make_hf_dataset(val_df),
    "test": make_hf_dataset(test_df),
})

# ─── Tokenize ─────────────────────────────────────────────────────────────────

print(f"\n🔤 Loading tokenizer: {BASE_MODEL}")
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

def tokenize(batch):
    return tokenizer(
        batch["text"],
        truncation=True,
        padding="max_length",
        max_length=MAX_LENGTH,
    )

tokenized = dataset.map(tokenize, batched=True)

# ─── Model ────────────────────────────────────────────────────────────────────

print(f"\n🤖 Loading model: {BASE_MODEL}")
model = AutoModelForSequenceClassification.from_pretrained(
    BASE_MODEL,
    num_labels=2,
    id2label=ID2LABEL,
    label2id=LABEL2ID,
)

# ─── Metrics ──────────────────────────────────────────────────────────────────

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    precision, recall, f1, _ = precision_recall_fscore_support(
        labels, predictions, average='binary', pos_label=1
    )
    acc = accuracy_score(labels, predictions)
    return {
        "accuracy": acc,
        "f1": f1,
        "precision": precision,
        "recall": recall,
    }

# ─── Training ─────────────────────────────────────────────────────────────────

training_args = TrainingArguments(
    output_dir=f"./{MODEL_NAME}",
    num_train_epochs=EPOCHS,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    learning_rate=LEARNING_RATE,
    weight_decay=0.01,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1",
    push_to_hub=True,
    hub_model_id=HF_REPO,
    logging_steps=10,
    report_to="none",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized["train"],
    eval_dataset=tokenized["validation"],
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
    callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],
)

print(f"\n🚀 Starting training...")
trainer.train()

# ─── Evaluate ─────────────────────────────────────────────────────────────────

print("\n📊 Final evaluation on test set:")
results = trainer.evaluate(tokenized["test"])
print(results)

# ─── Push to HuggingFace ──────────────────────────────────────────────────────

print(f"\n⬆️  Pushing model to HuggingFace: {HF_REPO}")
trainer.push_to_hub(commit_message="🛡️ NgaoAI v1.0 — Swahili mobile money scam detector")
tokenizer.push_to_hub(HF_REPO)

print(f"\n✅ Done! Model live at: https://huggingface.co/{HF_REPO}")
print("\nTo use the model:")
print(f"""
from transformers import pipeline
classifier = pipeline('text-classification', model='{HF_REPO}')
result = classifier("Umeshinda TZS 5,000,000! Tuma TZS 50,000 kupokea zawadi.")
print(result)  # [{{'label': 'SCAM', 'score': 0.99}}]
""")
