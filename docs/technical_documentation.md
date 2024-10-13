# Technical Documentation

## Overview
Penpal is an AI system that processes unread emails, providing quick summaries and categorizing them based on content. It uses NLP (natural language processing) models to extract important information and sorts emails into predefined and user-customized categories.

## Technology Stack
- Frontend: ReactJS
- Backend: Python, Flask
- AI Models: GPT-based summarization, BERT-based classification
- Database: PostgreSQL for storing user preferences and email metadata
- Email APIs: Gmail API, Microsoft Graph API

## Setup Guide
1. Clone the repository.
2. Install dependencies: `pip install -r requirements.txt`
3. Set up API keys for email services.
4. Run the backend server: `python app.py`
5. Frontend: Navigate to the `/frontend` folder and run `npm install && npm start`.

## How it Works
- **Email Import**: Penpal connects to the user’s email account via OAuth2 and fetches unread emails.
- **Summarization**: The AI model generates a 2-3 sentence summary of each email.
- **Categorization**: Emails are classified into predefined categories based on context (urgent, follow-up, etc.).