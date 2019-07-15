This is your first step.

## Task

g
This is an _example_ of wutsta a scenario and running a **command**

![Katacoda Logo](hello-engine/assets/Qlik.png)

`ACCEPT_EULA=yes docker-compose up -d`{{execute}}

Lets Start: First make a project folder!

`mkdir hello-engine; cd hello-eninge`{{execute}}

Lets make a javascript file that will run the connection set up

`touch app.js`{{execute}}

`app.js`{{open}}


<pre class="file" data-filename="app.js" data-target="prepend">const WebSocket = require('ws');
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/3.2.json');

</pre>

<pre class="file" data-filename="app.js" data-target="append">(async () => {
  try {
    console.log('Creating and opening session.');
    const session = enigma.create({
      schema,
      url: 'ws://localhost:19076/app',
      createSocket: url => new WebSocket(url),
    });
</pre>

<pre class="file" data-filename="app.js" data-target="append">console.log("Finishing...")
    const global = await session.open();
</pre>

<pre class="file" data-filename="app.js" data-target="append"> 
const version = await global.engineVersion();
    console.log(`Engine version retrieved: ${version.qComponentVersion}`);
</pre>
<pre class="file" data-filename="app.js" data-target="append"> 
 await session.close();
    console.log('Session closed.');
  } catch (err) {
    console.log('Whoops! An error occurred.', err);
    process.exit(1);
  }
})();
</pre>


`npm run start`{{execute}}