Let's make the  app!

First we need an empty javascript file:
`touch app.js`{{execute}}


Open the file. `app.js`{{open}}

First we need to set up some node imports to define what attributes our session will use. 

*psst*  If you wan't to know more check out [Node.js](https://www.npmjs.com/get-npm)



<pre class="file" data-filename="app.js" data-target="prepend">
// Node imports
const WebSocket = require('ws');
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/3.2.json');
</pre>

This example uses Enigma.js which is a javascript library to easier communicate with enige. Read the [Enigma API documentaion](https://github.com/qlik-oss/enigma.js/blob/master/docs/api.md#enigmacreateconfig). 

In the session we define which schema and websocker URL we want to use.


 <details>
<summary>I could use some help...</summary>
<pre class="file" data-target="clipboard">
<p>

```javascript
      schema,
      url: 'ws://localhost:19076/app',
      createSocket: url => new WebSocket(url),
```
</p>
</pre>
</details>  


 <details>
<summary>I could use some help...</summary>
<p>

```javascript
      session.open();
```
</p>
</details>  


 <details>
<summary>I could use some help...</summary>
<p>

```javascript
      global.engineVersion();
```
</p>
</details>  

 <details>
<summary>I could use some help...</summary>
<p>

```javascript
      session.close();
```
</p>
</details>  
 

 We can now communicate with our enigne.




To run the code we can use the npm script:
`npm run start`{{execute}}


