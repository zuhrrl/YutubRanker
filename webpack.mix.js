let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */



mix.js('resource/assets/js/app.js', 'assets/js/app.js')
mix.sass('resource/assets/css/style.scss', 'assets/css/style.css')
mix.autoload({ 'jquery': ['window.$', 'window.jQuery'] })
mix.options({
    postCss: [
        require("postcss-import"),
        require('postcss-nested'),
        require('autoprefixer'),
        require('tailwindcss'),
    ]
})



/*
 |--------------------------------------------------------------------------
 | DO NOT EDIT BELOW
 |--------------------------------------------------------------------------
 */
mix.setResourceRoot('./');
