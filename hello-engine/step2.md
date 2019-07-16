## Let's make the  app!

Open the file. `app.js`{{open}}

First we need to set up some node imports to define what attributes our session will use. 

*psst*  If you wan't to know more check out [Node.js](https://www.npmjs.com/get-npm)


This example uses Enigma.js which is a javascript library to easier communicate with enige. Read the [Enigma API documentaion](https://github.com/qlik-oss/enigma.js/blob/master/docs/api.md#enigmacreateconfig). 

In the session we define which schema and websocker URL we want to use.

 <details> <summary>I could use some help...</summary>
  <p>
   <pre class="file" data-target="clipboard"> 
      schema,
      url: 'ws://localhost:19076/app',
      createSocket: url => new WebSocket(url),
    </pre>
</p>
</details>  


 <details>
<summary>I could use some help...</summary>
 <p>

`session.open();`{{copy}}
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


