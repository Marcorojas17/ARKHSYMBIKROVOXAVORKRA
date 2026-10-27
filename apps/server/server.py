#!/usr/bin/env python3
"""Servidor base para el Portal ARKH."""
import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = "apps/portal"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"◯_● Servidor ARKH en http://localhost:{PORT}")
    httpd.serve_forever()
