#!/data/data/com.termux/files/usr/bin/python
# server.py — Servidor Python con TLS opcional y security headers
# Uso:
#   python bin/server.py              -> HTTP puerto 3000
#   python bin/server.py --tls        -> HTTPS puerto 3443 (cert self-signed)
import http.server, socketserver, ssl, os, sys, json
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).parent.parent
DIST = ROOT / 'dist'
LOGS = ROOT / '.arkh' / 'logs'
LOGS.mkdir(parents=True, exist_ok=True)

PORT = 3443 if '--tls' in sys.argv else 3000
HONEYPOT = ['/wp-admin', '/.env', '/phpmyadmin', '/admin', '/config.php']

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(DIST), **kw)

    def log_message(self, fmt, *args):
        entry = {
            'ts': datetime.utcnow().isoformat() + 'Z',
            'ip': self.client_address[0],
            'path': self.path,
            'ua': self.headers.get('User-Agent', ''),
        }
        f = LOGS / (datetime.utcnow().strftime('%Y-%m-%d') + '.jsonl')
        with open(f, 'a') as fp:
            fp.write(json.dumps(entry) + '\n')

    def send_head(self):
        if any(self.path.startswith(h) for h in HONEYPOT):
            self.log_message('HONEYPOT %s', self.path)
            self.send_error(404)
            return None
        return super().send_head()

    def end_headers(self):
        # Security headers
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
        self.send_header('Content-Security-Policy',
            "default-src 'self'; script-src 'self' https://cdn.tailwindcss.com; "
            "style-src 'self' 'unsafe-inline'; img-src 'self' data: https://img.shields.io; "
            "connect-src 'self'; object-src 'none'")
        super().end_headers()


def run(use_tls):
    protocol = 'https' if use_tls else 'http'
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        if use_tls:
            cert_file = ROOT / '.arkh' / 'tls' / 'cert.pem'
            key_file = ROOT / '.arkh' / 'tls' / 'key.pem'
            if not cert_file.exists():
                print('ERROR: No hay certificado.')
                print('Generar con:')
                print('  mkdir -p .arkh/tls')
                print('  openssl req -x509 -newkey rsa:2048 -keyout .arkh/tls/key.pem \\')
                print('    -out .arkh/tls/cert.pem -days 365 -nodes -subj "/CN=localhost"')
                sys.exit(1)
            ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            ctx.minimum_version = ssl.TLSVersion.TLSv1_3
            ctx.load_cert_chain(cert_file, key_file)
            httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)
        print(f'=== ARKH PYTHON SERVER ===')
        print(f'Protocol: {protocol.upper()}')
        print(f'Port: {PORT}')
        print(f'TLS 1.3: {"ON" if use_tls else "OFF"}')
        print(f'URL: {protocol}://localhost:{PORT}')
        print(f'Logs: {LOGS}')
        print('Ctrl+C para detener')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nDetenido.')


if __name__ == '__main__':
    if not DIST.exists():
        print('ERROR: dist/ no existe. Ejecuta: node scripts/build.js')
        sys.exit(1)
    run('--tls' in sys.argv)
