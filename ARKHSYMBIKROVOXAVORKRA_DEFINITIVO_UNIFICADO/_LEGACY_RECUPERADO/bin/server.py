import http.server, socketserver, pathlib, sys, socket
PORT_START = 3000
PORT_END = 3010
ROOT = pathlib.Path(__file__).parent.parent / "dist"
ROOT.mkdir(exist_ok=True)
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self,*a,**k):
        super().__init__(*a,directory=str(ROOT),**k)
    def end_headers(self):
        self.send_header("Cache-Control","no-store")
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True

def run():
    for port in range(PORT_START, PORT_END+1):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                print(f"ARKHÉ ZERO LIVE en http://localhost:{port} | {ROOT}")
                print(f"Bus Toluca -> CDMX | manifest e8d9eac8 | 1330 files")
                httpd.serve_forever()
        except OSError as e:
            if e.errno == 98:
                print(f"Puerto {port} ocupado, probando {port+1}...")
                continue
            raise
    print("Todos los puertos 3000-3010 ocupados")

if __name__ == "__main__":
    run()
