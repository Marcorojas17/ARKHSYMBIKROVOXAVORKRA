#!/data/data/com.termux/files/usr/bin/python
# BINARIO SERVIDOR - ARKHSYMBIKROVOXAVORKRA
import http.server, socketserver, os, sys
os.chdir(os.path.join(os.path.dirname(__file__), '..', 'dist'))
PORT = 3000
print(f"Sirviendo ARKHSYMBIKROVOXAVORKRA en puerto {PORT} - 51% Humano 49% IA")
print(f"URL: http://localhost:{PORT}")
try:
    with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nDetenido.")
