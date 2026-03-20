"""
NgaoAI Data Collection Helper
------------------------------
Run this to add new scam/safe examples to the dataset.
Usage: python collect_data.py
"""

import csv
import os
from datetime import datetime

DATA_FILE = "../data/raw/scam_examples.csv"

def add_example():
    print("\n🛡️  NgaoAI — Add Training Example")
    print("=" * 40)
    message = input("Paste the SMS/WhatsApp message:\n> ").strip()
    label = ""
    while label not in ["SCAM", "SAFE"]:
        label = input("Label (SCAM/SAFE): ").strip().upper()
    source = input("Source (e.g. 'community', 'twitter', 'personal'): ").strip()

    row = [message, label, source]

    file_exists = os.path.exists(DATA_FILE)
    with open(DATA_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(["message", "label", "source"])
        writer.writerow(row)

    print(f"\n✅ Added! Label: {label}")
    print(f"Total examples in dataset: {count_examples()}")

def count_examples():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return sum(1 for row in csv.reader(f)) - 1  # subtract header
    except:
        return 0

def show_stats():
    scam, safe = 0, 0
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row["label"] == "SCAM":
                    scam += 1
                elif row["label"] == "SAFE":
                    safe += 1
    except:
        pass
    print(f"\n📊 Dataset Stats:")
    print(f"  SCAM examples: {scam}")
    print(f"  SAFE examples: {safe}")
    print(f"  Total: {scam + safe}")

if __name__ == "__main__":
    show_stats()
    while True:
        add_example()
        cont = input("\nAdd another? (y/n): ").strip().lower()
        if cont != "y":
            break
    show_stats()
    print("\nDone! 🛡️")
