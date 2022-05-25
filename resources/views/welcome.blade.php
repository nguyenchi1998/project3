<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

</head>

<body>
    <noscript>Enable script to run page</noscript>
    <div id="root"></div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>
