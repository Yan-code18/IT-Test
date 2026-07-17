<?php
header('Content-Type: application/json; charset=utf-8');

echo json_encode([
	'status' => 'ok',
	'service' => 'GreenShield Pest Control',
	'message' => 'Landing page is ready.',
	'timestamp' => date(DATE_ATOM),
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
