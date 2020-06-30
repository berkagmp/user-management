<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>User Management</title>

        <style>
            .hidden { display: none;}
            .nav {margin: 30px 0 30px 0;}
            .container {margin-top:30px;}
        </style>
    </head>
    <body>
        <div id="root"></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>