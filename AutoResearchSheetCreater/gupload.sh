


exec_browserify () {
    browserify -t babelify -p gasify srcES6/$1 -o src/$1
}
# 関数の呼び出し
exec_browserify main.js
exec_browserify observer.js
exec_browserify sort-by-keyword-num.js
exec_browserify sort-by-ranking.js
exec_browserify sort-by-review-num.js
exec_browserify aggregate-data.js
exec_browserify get-num-of-sold.js
