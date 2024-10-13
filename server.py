from http.server import HTTPServer, SimpleHTTPRequestHandler
import socket

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

# Set host and port
HOST = get_local_ip()
PORT = 3000

# Create handler and server
handler = SimpleHTTPRequestHandler
server = HTTPServer((HOST, PORT), handler)

print(f"Server running on http://{HOST}:{PORT}")

# Start the server
server.serve_forever()