**Note:** coreCtl is installed in this katacoda enviroment if you want to run coreCtl locally on you machine see the [coreCtl documentation](https://github.com/qlik-oss/corectl)

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
* `corectl-object.json `{{open}} - This file contains a object, if you are new to Qlik you might want to learn more about [objects](http://help.qlik.com/en-US/sense-developer/June2019/SubSystems/Platform/Content/Sense_PlatformOverview/Concepts/GenericObject.htm).

#### 1. CoreCtl build
When you run the command: <br> `corectl build`{{execute}} <br> <br>

CoreCtl will look for file with the name ***corectl.yml*** in the current folder. The corectl.yml file is the configuration file of how corectl will run. <br> You can leave the file empty and then configure corectl using flags instead or run the file with configurations and then override them with flags. 
<br>`corectl build -e localhost:19076 -a "my app"`{{execute}} <br>
Will run an corectl instance that looks for an engine on localhost:19076 and runs the against the app "my app"
<br>
Look a the specification of how to create the [**corectl config**](https://github.com/qlik-oss/corectl/blob/master/docs/corectl_config.md), here you will find the answers to this tutorial. 

#### 2. Connect corectl to engine

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


Now you should have an up and running against an engine. <br>
You can check your apps with: <br> <br>
`corectl app ls`{{execute}}
<br>
<br>
However this app is empty, in next step we will load data to the app.
