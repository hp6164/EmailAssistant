import requests
import json

# Set the API URL
url = "https://llm.kindo.ai/v1/chat/completions"

# Set your API key and model
api_key = "22c4e203-2032-43c9-9b0e-dfc88270b924-2e7e85682c16884d"  # Replace with your actual KINDO API key
model = "claude-3-5-sonnet-20240620"  # Replace with the model name

# Prepare the data to send in the POST request
data = {
    'model': model,
    'messages': [
        {
            'role': 'user',
            'content': 'hello! please just say hello back. thats it'
        }
    ]
}

# Set the headers
headers = {
    'content-type': 'application/json',
    'api-key': api_key
}

# Make the POST request
response = requests.post(url, json=data, headers=headers)

# Check for errors
if response.status_code == 200:
    response_data = response.json()
    
    # Check if the response contains the expected data
    if 'choices' in response_data and isinstance(response_data['choices'], list) and response_data['choices']:
        ai_response = response_data['choices'][0]['message']['content']
        print('AI Response:', ai_response)
    else:
        print('Unexpected response format or empty response.')
else:
    print('Error:', response.status_code, response.text)
