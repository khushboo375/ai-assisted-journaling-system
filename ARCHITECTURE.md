# System Architecture

## Overview

The AI-Assisted Journal System is a full-stack application that combines a REST API backend, a React frontend, a SQLite database, and an LLM for emotion analysis.

Architecture Flow:

User → React Frontend → Express API → SQLite Database
                              ↓
                        LLM Analysis

---

# 1. Scaling to 100k Users

To scale the system:

1. Move from SQLite to PostgreSQL or MongoDB
2. Deploy backend behind a load balancer
3. Use containerization (Docker)
4. Deploy on cloud platforms such as AWS or GCP
5. Use Redis caching for frequently accessed insights
6. Store journal data in scalable cloud databases

---

# 2. Reducing LLM Cost

LLM usage can be optimized by:

- Avoiding repeated analysis
- Running analysis only when a new journal entry is created
- Using smaller or cheaper models for simple emotion detection
- Limiting maximum journal length

This reduces the number of LLM API calls.

---

# 3. Caching Repeated Analysis

If users submit identical journal entries or request repeated analysis:

1. Hash the journal text
2. Store previous LLM results
3. Return cached results instead of calling the LLM again

Example cache structure:

text_hash → emotion + summary + keywords

This reduces API cost and improves response speed.

---

# 4. Protecting Sensitive Journal Data

Journal entries may contain personal thoughts, so security is important.

Security measures:

1. Encrypt data in transit using HTTPS
2. Encrypt sensitive data at rest
3. Add authentication (JWT or OAuth)
4. Restrict API access by user ID
5. Implement rate limiting to prevent abuse

---

# Conclusion

This architecture allows the system to scale efficiently, reduce LLM cost, and protect sensitive journal data while providing meaningful insights to users.