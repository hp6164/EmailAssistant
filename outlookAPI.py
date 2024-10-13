import requests

# tenant = '87b04d11-3e69-407f-949c-96ff7de6f036'
tenant = 'common'
client_id = '56cf533e-417a-456a-9d46-a4e893bd642d'
redirect_uri = 'http://localhost:8000'

url = 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize'
params = {
    'client_id': client_id,
    'response_type': 'code',
    'redicect_uri': redirect_uri,
    'response_mode': 'query',
    'scope': 'offline_access User.Read Mail.Read',
    'state': '12345'
}  # Optional query parameters

response = requests.get(url, params=params)

with open('index.html', 'w', encoding='utf-8') as f: 
    f.write(response.text)


print(response)