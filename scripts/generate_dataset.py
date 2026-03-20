"""
NgaoAI Dataset Generator
-------------------------
Generates additional synthetic training examples by combining
templates with variations. Expands dataset for model training.
"""

import csv
import random
import os

OUTPUT_FILE = "../data/raw/scam_examples.csv"

# Scam templates with placeholders
SCAM_TEMPLATES = {
    "prize_scam": [
        "Hongera {name}! Umeshinda {prize} katika bahati nasibu ya {company}. Tuma {fee} ili upokee zawadi. Piga: {phone}",
        "HABARI NJEMA! Nambari yako imechaguliwa kushinda {prize}. Wasiliana sasa: {phone}. Muda unakwisha leo!",
        "Umeshinda {prize} ya {company}! Ili kudai tuzo yako tuma {fee} kwa wakala wetu: {phone}",
    ],
    "money_doubling": [
        "Tuma {amount} upate {return_amount} ndani ya saa {hours}. Watu {count} wamefaidika. Haraka: {phone}",
        "Fursa ya kipekee! Weka {amount} upate {return_amount} mara moja. Hakuna hatari. Wasiliana: {phone}",
        "Double pesa yako leo! {amount} inakuwa {return_amount}. Thibitisha kwa: {phone}",
    ],
    "pin_phishing": [
        "M-Pesa support: Akaunti yako ina tatizo. Tuma PIN yako kwa {phone} ili kutatua haraka.",
        "{bank} Bank: Thibitisha akaunti yako tuma nywila yako SMS kwa: {phone} SASA HIVI.",
        "Mfumo wetu unahitaji kuthibitisha akaunti yako. Tuma OTP uliyopokea kwa: {phone}",
    ],
    "emergency_scam": [
        "{relation} wako yuko hospitali! Anahitaji {amount} haraka. Tuma kwa: {phone}. Tafadhali!",
        "Habari ya haraka - {relation} amepata ajali. Tuma {amount} kwa {phone} mara moja.",
        "Niko jela! Nahitaji {amount} kwa dhamana. Tuma kwa {phone}. {relation} yako.",
    ],
    "loan_scam": [
        "Umekubalika kupata mkopo wa {amount} bila dhamana. Lipa ada ya TZS 20,000 kwanza: {phone}",
        "MKOPO HARAKA! Pata {amount} leo. Ada ndogo ya usajili tu. Wasiliana: {phone}",
        "Benki yetu inakupa mkopo wa {amount}. Tuma ada ya ufunguo TZS 15,000 kwa: {phone}",
    ],
    "job_scam": [
        "Umechaguliwa kwa kazi ya {salary}/mwezi. Lipa deposit TZS 50,000 kuthibitisha. Wasiliana: {phone}",
        "Kazi mpya inakusubiri! Mshahara {salary}. Tuma ada ya usajili TZS 30,000 kwa {phone}",
        "TANGAZO LA KAZI: Unahitajika mara moja. Mshahara mkubwa. Ada ya maombi tu: {phone}",
    ],
}

# Safe message templates
SAFE_TEMPLATES = {
    "transaction_confirmation": [
        "M-Pesa: Umefanikiwa kutuma TZS {amount} kwa {name} {phone}. Salio: TZS {balance}. Ref: {ref}",
        "Airtel Money: Umepokea TZS {amount} kutoka {phone}. Salio jipya: TZS {balance}.",
        "Tigo Pesa: Malipo ya TZS {amount} yamefanikiwa. Ref: {ref}. Salio: TZS {balance}.",
    ],
    "bill_payment": [
        "TANESCO: Malipo ya TZS {amount} yamekubaliwa. Akaunti: {account}. Asante.",
        "DAWASCO: Bili ya maji TZS {amount} imelipwa. Nambari ya kumbukumbu: {ref}.",
        "TTCL: Ankara yako ya TZS {amount} imelipwa. Huduma itaendelea kawaida.",
    ],
    "service_notification": [
        "Vodacom: Salio lako la data ni {data}MB. Nunua zaidi: *150*50#",
        "Airtel: Salio lako ni TZS {balance}. Dakika: {minutes}. Data: {data}MB.",
        "NHIF: Kadi yako ya bima ni {status}. Tarehe ya kuisha: {date}.",
    ],
}

# Fill-in values
NAMES = ["Edward", "Amina", "John", "Fatuma", "Hassan", "Maria", "David", "Zainab"]
COMPANIES = ["Vodacom", "Airtel", "Tigo", "CRDB", "NMB", "Equity"]
BANKS = ["CRDB", "NMB", "Equity", "Stanbic", "Absa"]
RELATIONS = ["Mtoto", "Mama", "Baba", "Kaka", "Dada", "Mke", "Mume"]
PHONES = ["0754XXXXXX", "0712XXXXXX", "0768XXXXXX", "0745XXXXXX", "0789XXXXXX"]

def random_amount(min_k=5, max_k=500):
    return f"TZS {random.randint(min_k, max_k) * 1000:,}"

def random_phone():
    return f"07{random.randint(10,99)}{random.randint(100000,999999)}"

def random_ref():
    return f"TZ{random.randint(100000000, 999999999)}"

def generate_scam(category, template):
    return template.format(
        name=random.choice(NAMES),
        prize=random_amount(500, 10000),
        company=random.choice(COMPANIES),
        fee=random_amount(10, 100),
        phone=random_phone(),
        amount=random_amount(5, 200),
        return_amount=random_amount(50, 2000),
        hours=random.randint(1, 24),
        count=random.randint(10, 500),
        bank=random.choice(BANKS),
        relation=random.choice(RELATIONS),
        salary=random_amount(500, 3000),
    )

def generate_safe(category, template):
    return template.format(
        name=random.choice(NAMES),
        phone=random_phone(),
        amount=random_amount(5, 500),
        balance=random_amount(50, 5000),
        ref=random_ref(),
        account=f"{random.randint(1000000000, 9999999999)}",
        data=random.randint(100, 5000),
        minutes=random.randint(10, 1000),
        status="halali",
        date=f"{random.randint(1,28):02d}/0{random.randint(4,9)}/2026",
    )

def generate_dataset(n_per_category=10):
    rows = []

    for category, templates in SCAM_TEMPLATES.items():
        for _ in range(n_per_category):
            template = random.choice(templates)
            message = generate_scam(category, template)
            rows.append([message, "SCAM", category, "synthetic_generated"])

    for category, templates in SAFE_TEMPLATES.items():
        for _ in range(n_per_category):
            template = random.choice(templates)
            message = generate_safe(category, template)
            rows.append([message, "SAFE", category, "synthetic_generated"])

    return rows

if __name__ == "__main__":
    rows = generate_dataset(n_per_category=15)
    random.shuffle(rows)

    # Append to existing dataset
    file_exists = os.path.exists(OUTPUT_FILE)
    with open(OUTPUT_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(["message", "label", "category", "source"])
        writer.writerows(rows)

    scam_count = sum(1 for r in rows if r[1] == "SCAM")
    safe_count = sum(1 for r in rows if r[1] == "SAFE")
    print(f"✅ Generated {len(rows)} examples:")
    print(f"   SCAM: {scam_count}")
    print(f"   SAFE: {safe_count}")
    print(f"   Saved to: {OUTPUT_FILE}")
