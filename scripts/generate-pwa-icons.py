"""Render the simple Shared Moment app icon as standard-install PNG assets."""

import math
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CORAL = (244, 116, 96, 255)
CREAM = (255, 250, 243, 255)
LILAC = (168, 135, 207, 255)


def chunk(kind: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)


def render(size: int) -> bytes:
    rows = [bytearray(CORAL * size) for _ in range(size)]
    points = []
    scale = size * 0.0225
    center_x, center_y = size * 0.5, size * 0.49
    for index in range(160):
        t = index * math.tau / 160
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        points.append((center_x + x * scale, center_y - y * scale))

    for y in range(size):
        scan = y + 0.5
        crossings = []
        for i, (x1, y1) in enumerate(points):
            x2, y2 = points[(i + 1) % len(points)]
            if (y1 > scan) != (y2 > scan):
                crossings.append(x1 + (scan - y1) * (x2 - x1) / (y2 - y1))
        crossings.sort()
        for left, right in zip(crossings[::2], crossings[1::2]):
            start, end = max(0, math.ceil(left)), min(size, math.floor(right) + 1)
            for x in range(start, end):
                offset = 4 * x
                rows[y][offset:offset + 4] = bytes(CREAM)

    dot_x, dot_y, radius = size * 0.5, size * 0.49, size * 0.055
    for y in range(max(0, int(dot_y - radius)), min(size, int(dot_y + radius) + 1)):
        for x in range(max(0, int(dot_x - radius)), min(size, int(dot_x + radius) + 1)):
            if (x + 0.5 - dot_x) ** 2 + (y + 0.5 - dot_y) ** 2 <= radius**2:
                offset = 4 * x
                rows[y][offset:offset + 4] = bytes(LILAC)

    image = b"".join(b"\x00" + row for row in rows)
    header = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) + chunk(b"IDAT", zlib.compress(image, 9)) + chunk(b"IEND", b"")


for size in (180, 192, 512):
    (ROOT / "public" / f"icon-{size}.png").write_bytes(render(size))
