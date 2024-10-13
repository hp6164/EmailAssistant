from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import os
import requests

app = Flask(__name__)
CORS(app)

url = "https://llm.kindo.ai/v1/chat/completions"
api_key = "22c4e203-2032-43c9-9b0e-dfc88270b924-2e7e85682c16884d"  
model = "claude-3-5-sonnet-20240620"  

@app.route('/')
def hello():
    return jsonify({"message": "Hello World!"}), 200

@app.route('/name', methods=['GET'])
def Inbox():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    email_json_path = os.path.join(current_dir, '..', 'email.json')

    # try:
    #     with open(email_json_path, 'r') as file:
    #         email_json_content = file.read()
    # except FileNotFoundError:
    #     return jsonify({"error": "email.json file not found"}), 404
    # except IOError:
    #     return jsonify({"error": "Error reading email.json file"}), 500
    
    try:
        with open(email_json_path, 'r') as file:
            email_json_content = json.load(file)
    except FileNotFoundError:
        return jsonify({"error": "email.json file not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON in email.json file"}), 500
    except IOError:
        return jsonify({"error": "Error reading email.json file"}), 500


    data = {
        'model': model,
        'messages': [
            {
            'role': 'user',
            'content': f'{email_json_content} \n This is a list of json email objects.\n For each object, write a new object that: \n has the same id. write a very concise 1-2 sentence summary. assign the object to a category based on all the other emails. determine if the email object is urgent.'
        }
        ]
    }

    headers = {
        'content-type': 'application/json',
        'api-key': api_key
    }

    # Make the POST request
    response = requests.post(url, json=data, headers=headers)
    response_data = response.json()

    summarized_content = response_data['choices'][0]['message']['content']
    start_index = summarized_content.index('[')
    summarized_content = summarized_content[start_index:]
    try:
        summarized_emails = json.loads(summarized_content)
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        print(f"Problematic content: {summarized_content}")
        # You might want to return an error response here
        return jsonify({"error": "Failed to parse email summaries"}), 400
    

    summarized_dict = {email['id']: email for email in summarized_emails}
    
    combined_emails = []
    for original_email in email_json_content:
        email_id = original_email['id']
        if email_id in summarized_dict:
            combined_email = original_email.copy()
            combined_email.update(summarized_dict[email_id])
            combined_emails.append(combined_email)        

    print(combined_emails)
    return jsonify(combined_emails), 200
  
   

    
if __name__ == '__main__':
    print("Starting Flask server...")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Server file location: {__file__}")
    try:
        app.run(debug=True)
    except Exception as e:
        print(f"An error occurred while starting the server: {str(e)}")
