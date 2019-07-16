
We have prepared a file for you open the file `app.js`{{open}} to check it out.

### Require
At the top file we see three require, theese includes nodejs modules into our project from remote files. If you are curious read more about [require].(https://nodejs.org/en/knowledge/getting-started/what-is-require/)
![import](hello-engine/assets/imports.png) 
### Async/Await
In our case `async` might be unessecary since we will be running the engine on a localhost. But if you are running a engine against a remote host `async/await` will be necessary.  

## Enigma.js
In this tutorial we will use enigma.js to cummunicate with engine. 

To find the solutions look at the [enigma.js API documentation](https://github.com/qlik-oss/enigma.js/blob/master/docs/api.md#api-documentation).

To create a session you will have to use `enigma.create()`. Enigma create uses a configuration object. We to create a session against the QIX Engine at websocket URL `'ws://localhost:9076/app/engineData'` using the `enigma.js/schemas/3.2.json` schema(Look at the `const schema`).

<details> <summary>enigma.create() solution</summary>
<p> 
<pre class="file" data-target="clipboard"> enigma.create({ 
      schema,
      url: 'ws://localhost:19076/app',
      createSocket: url => new WebSocket(url)cd,
  });
</pre>
</p>
</details>  


<details>
<summary>Show solution</summary>
<p>
<pre class="file" data-target="clipboard">
session.open();
</pre>
</p>
</details>  


 <details>
<summary>I could use some help...</summary>
<p>
<pre class="file" data-target="clipboard">
global.engineVersion();
</pre>
</p>
</details>  

 <details>
<summary>I could use some help...</summary>
<pre class="file" data-target="clipboard">session.close();</pre>
</details>  


 We can now communicate with our enigne.




To run the code we can use the npm script:
`npm run start`{{execute}}


