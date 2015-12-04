# cookies.js
This script is a simple JavaScript operations on cookies, you can remove, add, and find item from cookie. This script can be used as Javascript API or as Jquery plugin (if jquery exists in your project)
 
### Setup cookies.js on your project
#### The Easiest way
You can use the cookies.js/cookies.min.js from cdn, all what you want to do is calling the cookies.js/cookies.min.js by adding the following code in <head> element:

**The compressed js**
```html
<script src="//cdn.rawgit.com/amughrabi/cookies.js/master/cookies.min.js" async defer></script>
```

**The original js**
```html
<script src="//cdn.rawgit.com/amughrabi/cookies.js/master/cookies.js" async defer></script>
```
#### The Easy way
Just download the cookies.js and install it to your project, and add call the cookies.js by adding the following code in <head> element:
 ```html
 <script src="path/to/your/script/cookies.js" async defer></script>
 ```
 
### How to use?
- List all cookie items:
```javascript
// JQuery
var list = $.cookies();
// JavaScript
var list = cookies.list();
```
- Retrieve a specific item value from cookie:
```javascript
// JQuery
var value = $.cookies(name);  // name = 'user'
// Javascript
var value = cookies.getItem(name); 
```
- Adding items into cookies (key : values : options):
 
   The value that added in this way will be removed after removing session
   ```javascript
   // JQuery: $.cookies(name, value)
   $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe');
   // Javascript: cookies.addItem(name, value)
   cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe');
   ```
   The value that added in this way will be removed after 7 days, or after a specific date:
   ```javascript
    // JQuery: $.cookies(name, value, {expires : 7})
    $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : 7});
    $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : new Date('10 10 2020')});
    $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : 'Fri, 09 Oct 2020 21:00:00 GMT'});
    // Javascript: cookies.addItem(name, value, {expires : 7})
    cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : 7});
    cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : new Date('10 10 2020')});
    cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : 'Fri, 09 Oct 2020 21:00:00 GMT'});
   ```
   The value will be added to cookie with associated domain.
   ```javascript
    // JQuery: $.cookies(name, value, {domain : 'example.com'})
    $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe', {domain : 'example.com'});
    // Javascript: cookies.addItem(name, value, {domain : 'example.com'})
    cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe', {domain : 'example.com'});
   ```
   The value will be added to cookie under input path.
   ```javascript
   // JQurey: $.cookies(name, value, {path : '/example'})
   $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe', {path : '/example'});
   // Javascript: cookies.addItem(name, value, {path : '/example'})
   cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe', {path : '/example'});
   ```
   To prevent cookies from being observed by unauthorized parties due to the transmission
   ```javascript
   // JQuery: $.cookies(name, value, {secure : true}) 
   $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe', {secure : true});
   // Javascript: cookies.addItem(name, value, {secure : true})
   cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe', {secure : true})
   ```
   You can mixing between options to fit your project requirements.
   ```javascript
   // JQuery: : $.cookies(name, value, {expires : 7, domain : 'example.com', path : '/example', secure : true})
   $.cookies('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : 7, domain : 'example.com', path : '/example', secure : true})
   // Javascript: cookies.addItem(name, value, {expires : 7, domain : 'example.com', path : '/example', secure : true})
   cookies.addItem('userId', 'OP8vK-14eEl6YKguOcktEnSe', {expires : 7, domain : 'example.com', path : '/example', secure : true});
   ```
- Remove (key): Remove the item that have the same name from cookie.
```javascript
// JQuery: $.removeCookie(name)
$.removeCookie('userId');
//Javascript: cookies.removeItem(name)
cookies.removeItem('userId');
```
- Check Item (key) : Check if the cookie have the required item:
```javascript
// JQuery: $.checkCookie(name)
var hasUserId = cookies.hasItem('userId');
//Javascript: cookies.hasItem(name)
var hasUserId = cookies.hasItem('userId');
```
- Erase all cookie items:
```javascript
//JQuery: $.clearCookies()
$.clearCookies();
// Javascript: cookies.removeAll()
cookies.removeAll();
```


#### Functional Demo:
<p data-height="268" data-theme-id="0" data-slug-hash="jWOavb" data-default-tab="js" data-user="amughrabi" class='codepen'>See the Pen <a href='http://codepen.io/amughrabi/pen/jWOavb/'>Cookies.js</a> by Ahmad AlMughrabi (<a href='http://codepen.io/amughrabi'>@amughrabi</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
