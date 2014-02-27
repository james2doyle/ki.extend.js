ki.extend.js
============

Extend [ki.js](https://github.com/dciccale/ki.js) with some fancy prototypes. Ironically built with [youmightnotneedjquery](http://youmightnotneedjquery.com/).

### Included Prototypes

* addClass
* removeClass
* toggleClass
* hasClass
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

*$.map*

Map function for arrays.

*$.trim*

Trim whitespace in string.

*$.param*

Serialize an object to be used in a *POST* request.

*$.ajax*

The beast. Easy ajax functions.

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

### Building

You can choose to build a custom version of the extend lib. Just open the `gruntfile` and remove items from the concat task.

Here is the default list:

```
'build/parts/header.js',
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
'build/parts/map.js',
'build/parts/stop.js',
'build/parts/ajax.js',
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
first-last-get-parent-remove
```
