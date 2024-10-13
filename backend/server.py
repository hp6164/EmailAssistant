from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import os
from anthropic import Anthropic

app = Flask(__name__)
CORS(app)

anthropic = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

@app.route('/')
def hello():
    return jsonify({"message": "Hello World!"}), 200

@app.route('/name', methods=['GET'])
def Inbox():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    email_json_path = os.path.join(current_dir, '..', 'email.json')

    try:
        with open(email_json_path, 'r') as file:
            email_json_content = file.read()
    except FileNotFoundError:
        return jsonify({"error": "email.json file not found"}), 404
    except IOError:
        return jsonify({"error": "Error reading email.json file"}), 500

   
   
    try:
        # Send request to Claude API
        response = anthropic.completions.create(
            model="claude-3-sonnet-20240229",
            max_tokens_to_sample=300,
            temperature=0.7,
            prompt=f"Human: print hi to test this api\n\nAssistant: "
        )
        
        ai_response = response.completion
        print(ai_response)

    except Exception as e:
        return jsonify({"error": f"Error calling Claude API: {str(e)}"}), 500

    return jsonify({
        "email_content": email_json_content,
        "ai_analysis": ai_response
    }), 200


if __name__ == '__main__':
    print("Starting Flask server...")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Server file location: {__file__}")
    try:
        app.run(debug=True)
    except Exception as e:
        print(f"An error occurred while starting the server: {str(e)}")


