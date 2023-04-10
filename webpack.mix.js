const mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const fs = require("fs");
const path = require('path');

const moduleFolder = './Modules';

const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.resolve(p,f)).isDirectory());

// Get the available modules return as array
let modules = dirs(moduleFolder);

modules.forEach(function(mod) {
    mix.js(__dirname  + "/Modules/" + mod + "/Resources/assets/js/app.js", 'public/modules/js/' + mod.toLowerCase() + '.js')
    mix.js('resources/js/vue-assets.js', 'public/modules/js/' + mod.toLowerCase() + '.js');
    mix.sass(__dirname  + "/Modules/" + mod + "/Resources/assets/sass/app.scss", 'public/modules/css/' + mod.toLowerCase() + '.css');

});

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css');
