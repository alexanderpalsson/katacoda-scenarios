**Note:** coreCtl is installed in this katacoda enviroment if you want to run coreCtl locally on you machine see the (coreCtl documentation)[https://github.com/qlik-oss/corectl]

Objectvies:
* Create a coreCtl config file
* Use basic coreCtl commands
* Create a simple Qlik app
* Load data into the app
* Use object to structure data

There are 4 prepared files:
* `corectl.yml`{{open}} - This is the config file that you will creat
* `testscript.qvs`{{open}} - A load script that will be used in *Step 3* to load data. 
* `data/movie.cvs `{{open}} - The data that will be loaded. Contains information about 10 movies.
* `corectl-object.json `{{open}} - This file contains the Object that contains properties how the data will be visulazied. If you are new to Qlik you might want to learn more about [objects](http://help.qlik.com/en-US/sense-developer/June2019/SubSystems/Platform/Content/Sense_PlatformOverview/Concepts/GenericObject.htm).

#### 1. CoreCtl build
When you run the command: <br> `corectl build`{{execute}} <br>
CoreCtl will look for file with the name corectl.yml in the current folder. The corectl.yml file is the configuration file of how corectl will run. You can leave it empty and then configure corectl using flags instead or run the file with configurations and then override them with flags. 
<br>`corectl build -e localhost:19076 -app "my app"`{{execute}} <br>
Will run an corectl instance that looks for an engine on localhost:19076 and runs the against the app "my app"
<br>
Look a the specification of how to create the [**corectl config**](https://github.com/qlik-oss/corectl/blob/master/docs/corectl_config.md), here you will find the answers to this tutorial. 

## 2. Connect corectl to engine

Edit the `corectl.yml`{{open}} so that is connects to engine.

<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-target="clipboard">engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
</pre>
</p>
</details>  
<br>

 Use `corectl build`{{open}} to rebuild the application 
 <br>
 Use `corectl build`{{open}} to rebuild the application 
 That will return `ERROR no app specified`.
 <br>
 Create your own app to run against.

 <details> <summary>Show solution</summary>
 <p> 
<pre class="file" data-target="clipboard">engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: /testapp.qvf   # App name that the tool should open a session against.
</pre>
</p>
This can also be done using a flag:
<br>

`corectl build -a "my app"`{{execute}}
</details>  


Now you should

In this tutorial we will use [enigma.js](https://github.com/qlik-oss/enigma.js) which is a library that helps you communicate with Qlik QIX Engine. You can use enigma.js to build your own browser-based analytics tools, back-end services, or command-line scripts.

To find all solutions in this tutorial look at the [enigma.js API documentation](https://github.com/qlik-oss/enigma.js/blob/master/docs/api.md#api-documentation).

#### 1. Configure enigma.create()
To create a session you will have to use `enigma.create()`.<br> 
Enigma create uses a configuration object, create a configuration object with the: <br>**websocket URL**: `'ws://localhost:9076/app/engineData'` and the: <br> **schema**: `enigma.js/schemas/3.2.json` (Look at the  `const schema`).

<details> <summary>enigma.create() solution</summary>
<p> 
<pre class="file" data-target="clipboard"> enigma.create({ 
      schema,
      url: 'ws://localhost:19076/app',
      createSocket: url => new WebSocket(url)
  });
</pre>
</p>
</details>  
<br>


#### 2. Open a session

After you have created a session object, open the session! 
<details>
<summary>Show solution</summary>
<p>
<pre class="file" data-target="clipboard">
const global = await session.open();
</pre>
</p>
</details>  
<br>

#### 3. Retrieve the session version

With an open session we can retieve the version of the session!

 <details>
<summary>Show solution</summary>
<p>
<pre class="file" data-target="clipboard">
 const version = await global.engineVersion();
</pre>
</p>
</details>  
<br>


#### 4. Close the session

When were are done communicating with engine close the session!

 <details>
<summary>Show sultion</summary>
<pre class="file" data-target="clipboard">await session.close();</pre>
</details>  
<br>


#### 5. Run the app

 We now have an application the will:
 1. Create and open session against engine
 2. Retrive the version of the engine
 3. Write the engines version in the console window
 4. Close the session



   
Run the code: <br>
`npm run start`{{execute}}


