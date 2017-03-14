# gulp-searchy
> A string search plugin for gulp 3. Based on https://www.npmjs.com/package/gulp-search

## Usage

First, install `gulp-searchy` as a development dependency:

```shell
npm install --save-dev gulp-searchy
```

Then, add it to your `gulpfile.js`:

### Regex search
```javascript
var search = require('gulp-searchy');

gulp.task('templates', function(){
  gulp.src([...])
    .pipe(search(/foo(.{3})/g, function(item) {return item;}, {
    	path: '',
    	filename: 'a.json'
    }))
    .pipe(gulp.dest('...'));
});
```


## API

gulp-searchy can be called with a regex.

### search(regex, formatFn[, options])

#### regex
Type: `RegExp`

The regex pattern to search for. See the [MDN documentation for RegExp] for details.

#### formatFn
Type:  `Function`

The formatFn function. Tell the plugin how to return the key and value for JSON file.

### gulp-searchy options

An optional third argument, `options`, can be passed.

#### options
Type: `Object`

##### options.path
Type: `string`  
Default: `''`

##### options.filename
Type: `string`  
Default: `'gulp-search-manifest.json'`

##### options.group
If you want a specific regex group to be captured  
Type: `integer`



[MDN documentation for RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
