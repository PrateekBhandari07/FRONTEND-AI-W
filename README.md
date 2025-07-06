# FRONTEND-HWI
Frontend of HWI
# 🤖 TrustPilot – Ethical AI Marketing Platform

**TrustPilot** is an AI-driven platform that enables marketers, data scientists, and compliance officers to build **ethically sound, transparent, and fair marketing campaigns**. It bridges the gap between performance-driven strategies and responsible AI practices.

> 🌐 Built during [Hackathon Name], this project focuses on explainability, fairness, privacy compliance, and a proprietary **Morality Compass** that scores your marketing decisions based on ethical impact.

---

## 🚀 Features

### 📊 Core Functionalities
- **Lead Scoring**  
  Predicts likelihood of conversion using classification models.

- **Budget Optimization**  
  Reallocates marketing spend across segments for better ROI.

- **Bias & Fairness Detection**  
  Flags demographic bias using fairness metrics (Disparate Impact, Demographic Parity).

- **Explainable AI (XAI)**  
  Uses SHAP and LIME to explain lead scoring predictions.

- **Compliance & Privacy Monitoring**  
  Identifies PII and ensures GDPR alignment using NLP-based detection.

- **Anomaly Detection**  
  Alerts abnormal patterns in campaign behavior or audience targeting.

### 🧭 Morality Compass (USP)
A proprietary ethical scoring engine that evaluates marketing campaigns on:
- Transparency
- Manipulation Risk
- Fairness to Audience
- Intent Alignment
- Privacy Impact  
> Returns a score from 0 to 100 along with ethical status: ✅ *Ethical*, ⚠️ *Needs Review*, ❌ *Unethical*

---

## 🧠 Tech Stack

### 🎨 Frontend
- React.js
- Tailwind CSS / Material UI
- Chart.js / Recharts

### 🧩 Backend
- Python (FastAPI)
- Pydantic + Uvicorn
- RESTful APIs

### 🤖 AI/ML
- Scikit-learn / XGBoost (Lead Scoring)
- Fairlearn / AIF360 (Bias Detection)
- SHAP / LIME (Explainability)
- GPT-3.5 / Custom LLM API (Morality Compass)
- spaCy + Transformers (Compliance NLP)

### 💾 Storage
- PostgreSQL
- AWS S3 (for uploads)
- Redis (optional for caching)

---

## 📐 System Architecture

