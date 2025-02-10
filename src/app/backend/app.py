from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
from textblob import TextBlob
import re

app = Flask(__name__)
CORS(app)  # ✅ Allow CORS for all routes

# Function to extract urgency, intent, and sentiment
from textblob import TextBlob
import re

def extract_features(email_text):
    email_text = email_text.lower()

    urgency_keywords = ['asap', 'urgent', 'immediately', 'right away', 'emergency', 'critical', 'rush', 'priority', 'time-sensitive', 'soon']
    urgency_score = sum([1 for word in urgency_keywords if word in email_text]) * 20  # Reduced weight for balance

    intent_keywords = ['pricing', 'quote', 'demo', 'interested', 'buy', 'purchase', 'sign up', 'register', 'subscribe', 'learn more', 'trial', 'consultation']
    intent_score = sum([1 for word in intent_keywords if word in email_text]) * 15

    budget_keywords = ['budget', 'afford', 'cost', 'discount', 'best price', 'cheap', 'affordable', 'negotiation', 'estimate']
    budget_score = sum([1 for word in budget_keywords if word in email_text]) * 10  # Lower weight, but still relevant

    follow_up_keywords = ['follow-up', 'call back', 'next steps', 'schedule', 'meeting', 'appointment', 'contact', 'discussion']
    follow_up_score = sum([1 for word in follow_up_keywords if word in email_text]) * 20  # Indicates strong lead

    company_size_keywords = ['team', 'enterprise', 'company-wide', 'department', 'organization', 'business solution', 'scalability']
    company_size_score = sum([1 for word in company_size_keywords if word in email_text]) * 10

    sentiment_score = TextBlob(email_text).sentiment.polarity * 30  # Adjusted weight for balance
    
    total_score = urgency_score + intent_score + budget_score + follow_up_score + company_size_score + sentiment_score

    # Normalize score to 100
    lead_score = min(100, max(0, total_score))

    return round(lead_score, 2)

# Define the API endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email_text = data.get('message', '')

    # Compute lead score
    lead_score = extract_features(email_text)

    return jsonify({'lead_score': lead_score})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
