browserify washi.js | uglifyjs -cm  > __file.js && gzip -9 __file.js && cat __file.js.gz | wc && rm __file.js.gz
