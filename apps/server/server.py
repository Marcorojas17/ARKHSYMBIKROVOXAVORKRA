# ARKH Python Server
import http.server
import socketserver

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"◯_● Servidor ARKH en puerto {PORT}")
    httpd.serve_forever()
