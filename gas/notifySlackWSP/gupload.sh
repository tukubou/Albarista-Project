srcES6Main=srcES6/main.js
srcMain=src/main.js
browserify -t babelify -p gasify $srcES6Main -o $srcMain
