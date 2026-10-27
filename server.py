import http.server, socketserver, pathlib, os, socket
ROOT = pathlib.Path(__file__).parent
# Busca puerto libre automáticamente
for PORT in [3000, 3001, 3002, 8080, 8000]:
    try:
        s=socket.socket(); s.bind(('', PORT)); s.close()
        break
    except: continue

os.chdir(ROOT)
print(f"✅ Sirviendo {ROOT} en http://localhost:{PORT}")
print(f"🎙️ Portal voz: http://localhost:{PORT}/apps/portal/voz-original.html")
print(f"🌐 Luego haz: cloudflared tunnel --url http://localhost:{PORT}")
class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Opener-Policy','same-origin')
        self.send_header('Cross-Origin-Embedder-Policy','require-corp')
        super().end_headers()
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
