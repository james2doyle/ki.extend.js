ki.extend.js
============

Extend [ki.js](https://github.com/dciccale/ki.js) with some fancy prototypes. Ironically built with [youmightnotneedjquery](http://youmightnotneedjquery.com/).

### Included Prototypes

* addClass
* removeClass
* toggleClass
* hasClass
* show
* hide
* css
* attr
* removeAttr
* hasAttr
* first
* last
* get
* before
* after
* text
* html
* append
* prepend
* remove
* parent
* trigger
* is

### Included "utilities"

*$.stop*

Stop events in ie8 and up.

```javascript
$('.btn').on('click', function(e){
  $.stop(e);
  console.log(this.href);
  return false;
});
```

*$.each*

ForEach function for arrays.

*$.map*

Map function for arrays. Returns an array, not $.

*$.filter*

Filter function for arrays. Returns an array, not $.

*$.trim*

Trim whitespace in string.

*$.param*

Serialize an object to be used in a *POST* request.

*$.Deferred*

Yep. `$.Deferred` just like jQuery.

```
function late(n) {
  var p = new $.Deferred();
  setTimeout(function() {
    p.resolve(n);
  }, n);
  return p.promise();
}
```

*$.when*

Run an array of `$.Deferred` functions in series. The functions must be promises. Calling `.then` on `$.when` will have the resolved values as the arguments.

```
$.when(late(1000), late(1200)).then(function(resolvedValue1, resolvedValue2) {
  console.log(resolvedValue1, resolvedValue2); // 1000, 1200
}, function() {
  console.log('error');
});
```

*$.ajax*

The beast. Easy ajax functions.

**Note:** by default, deferred Ajax is included in the build. If you **are not using Deferred** then just uncomment the normal ajax lib and comment off Deferred and Ajax-Deferred.

Simple `POST`. Data is automagically `$.param'd` and sent with a request header of `('Content-type', 'application/x-www-form-urlencoded')`.

```javascript
$.ajax('form.php', { id: 123 }, function(res){
  console.log(res);
});
```

Simple `GET`. If you do not pass an object, than the request is treated as a `GET` request.

```javascript
$.ajax('json.js', function(res) {
  console.log(res);
});
```

Simple error handling. The second argument in the callback is an error boolean.

```javascript
$.ajax('http://example.com/save', { id: 456 }, function(res, err) {
  if(err) {
    alert('Got an error, bro.');
  } else {
    console.log(res);
  }
});
```

---

Deferred Examples

```javascript
$.ajax('form.php', { id: 123 }).done(function(res){
  console.log(res);
});
```

Simple `GET`. If you do not pass an object, than the request is treated as a `GET` request.

```javascript
$.ajax('json.js').done(function(res) {
  console.log(res);
});
```

Simple error handling. The second argument in the callback is an error callback.

```javascript
$.ajax('http://example.com/save', { id: 456 }).then(function(res) {
  alert('I am ok!');
},
function(res) {
  alert('Got an error, bro.');
});
```

Using `$.when`:

```javascript
$.when($.ajax('text.txt'), $.ajax('json.js')).then(function(res1, res2){
  console.log(res1, res2);
}, function(res){
  console.log(res);
});
```

### Building

You can choose to build a custom version of the extend lib. Just open the `gruntfile` and remove items from the concat task.

Here is the default list:

```
'build/parts/header.js',
'build/parts/each.js',
'build/parts/classes.js',
'build/parts/append-prepend.js',
'build/parts/attr.js',
'build/parts/before-after.js',
'build/parts/css.js',
'build/parts/first-last-get.js',
'build/parts/html-text.js',
'build/parts/parent.js',
'build/parts/remove.js',
'build/parts/trim.js',
'build/parts/trigger.js',
'build/parts/is.js',
'build/parts/arrays.js',
'build/parts/stop.js',
'build/parts/ajax-deferred.js',
// 'build/parts/ajax.js',
'build/ki-deferred-js/deferred.js',
'build/parts/footer.js'
```

The `header.js` and `footer.js` must be set. They are used to open and close the **main function**. Everything else can be toggled and removed as needed.

### Test

There isn't any *real* javascript testing. I just wrote some small HTML pages that you can open in your favourite browser to test in. You can also use them as examples on how to use the different prototypes.

Here is the small list of test so far:

```
ajax
attrs
classes
css
deferred
each-arrays
first-last-get-parent-remove
hide-show
```
