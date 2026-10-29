import http.server, socketserver, os

PORT = 7777
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')

class SafeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

os.chdir(PUBLIC_DIR)
print(f"✅ SERVIDOR PÚBLICO en http://localhost:{PORT}")
print(f"📁 Sirviendo SOLO la carpeta: {PUBLIC_DIR}")

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), SafeHandler) as httpd:
    httpd.serve_forever()
