#!/usr/bin/env python3
# test-server.py — Prueba el servidor Python
import urllib.request, sys

BASE = 'http://localhost:3000'

def get(path, ua='test-agent'):
    try:
        req = urllib.request.Request(BASE + path, headers={'User-Agent': ua})
        with urllib.request.urlopen(req) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:
        return 0

print('=== TEST SERVER PYTHON ===')
print('[1] /index.html :', get('/index.html'), '->', 'PASS' if get('/index.html') == 200 else 'FAIL')
print('[2] /wp-admin   :', get('/wp-admin'), '->', 'PASS' if get('/wp-admin') == 404 else 'FAIL')
print('[3] /nada       :', get('/nada'), '->', 'PASS' if get('/nada') == 404 else 'FAIL')
print('')
print('Revisa logs en .arkh/logs/')
