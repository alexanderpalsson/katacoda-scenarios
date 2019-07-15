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

<pre class="file" data-filename="app.js" data-target="append">
// Setting up a session against localhost:19076
(async () => {
  try {
    console.log('Creating and opening session.');
    const session = enigma.create({
      schema,
      url: 'ws://localhost:19076/app',
      createSocket: url => new WebSocket(url),
    });
</pre>

To open the session we simply use the method 
```javascript
 open()
 ```

<pre class="file" data-filename="app.js" data-target="append">console.log("Finishing...")
    const global = await session.open();
</pre>


With a session intance 
```javascript
    global
 ```
 We can now communicate with our enigne.

<pre class="file" data-filename="app.js" data-target="append"> 
const version = await global.engineVersion();
    console.log(`Engine version retrieved: ${version.qComponentVersion}`);
</pre>

To close the session when we are done we simply:
<pre class="file" data-filename="app.js" data-target="append"> 
 await session.close();
    console.log('Session closed.');
  } catch (err) {
    console.log('Whoops! An error occurred.', err);
    process.exit(1);
  }
})();
</pre>


To run the code we can either use the npm script:
`npm run start`{{execute}}

Or run the .js file with

`node app.js`{{execute}}
