<?php
require_once 'vendor/autoload.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($uri == '/hello') {
    // php_sapi_name
    // echo php_sapi_name();
    require 'hello.php';
} elseif ($uri == 'goodbye') {
    require 'goodbye.php';
} else {
    header('HTTP/1.1 404 Not Found');
    echo 'Page not found';
}