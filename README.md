# AI-Assisted Journal System

## Overview

The AI-Assisted Journal System allows users to write journal entries after completing immersive nature sessions (forest, rain, cafe ambience). The system stores the entries, analyzes emotions using an LLM, and provides insights about the user's mental state over time.

---

## Features

### 1. Journal Entry API
Users can submit journal entries after a session.

POST /api/journal

Example request:

{
"userId": "123",
"ambience": "forest",
"text": "I felt calm today after listening to the rain."
}

The system stores the entry in the database and performs AI analysis.

---

### 2. Get User Entries

GET /api/journal/:userId

Returns all journal entries for the user.

---

### 3. Emotion Analysis (LLM)

POST /api/journal/analyze

Example request:

{
"text": "I felt calm today after listening to the rain"
}

Example response:

{
"emotion": "calm",
"keywords": ["rain","nature","peace"],
"summary": "User experienced relaxation during the forest session"
}

The project uses Google's Gemini API for emotion analysis.

---

### 4. Insights API

GET /api/journal/insights/:userId

Example response:

{
"totalEntries": 8,
"topEmotion": "calm",
"mostUsedAmbience": "forest",
"recentKeywords": ["focus","nature","rain"]
}

The frontend visualizes insights using charts.

---

## Tech Stack

Backend:
- Node.js
- Express

Frontend:
- React

Database:
- SQLite

LLM:
- Google Gemini API

Charts:
- Chart.js

---

## Installation

### Clone the repository

git clone https://github.com/yourusername/ai-journal-system.git

### Backend setup

cd backend

npm install

npm start

Server runs on:

http://localhost:5000

---

### Frontend setup

cd frontend

npm install

npm start

Frontend runs on:

http://localhost:3000

---

## Project Structure

backend/
routes/
services/
database/

frontend/
src/
components/
pages/

README.md
ARCHITECTURE.md

---

## Screenshots

Dashboard showing emotion insights and ambience usage charts.

Journal entry page with ambience selection.

---

## Future Improvements

- Mood timeline chart
- AI suggestions for mental wellbeing
- Authentication system
- Cloud deployment