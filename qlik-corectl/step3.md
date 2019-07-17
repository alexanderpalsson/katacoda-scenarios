In this step we will load data into the app.<br> 
Again we will edit the `corectl.yml`{{open}} file but we also need a **load script**: <br>
* `testscript.qvs`{{open}} - A load script that will be used in *Step 3* to load data. 
<br> and **some data**: <br>
* `data/movie.cvs `{{open}} - The data that will be loaded, contains information about 10 movies. 
**OBS** This data is loaded into a volume in a docker container, the internal docker cointaner is /data. If you are curios about the docker file check it out here `../docker-compose.yml`{{open}} 
#### 1. Edit the corectl.yml to load data
In the `corectl.yml`{{open}} you want to define your load script then expose a connection from the engine container to the load script. You can read about 

1. Add the script.
<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-target="clipboard">
engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: /myapp.qvf   # App name that the tool should open a session against.
script: /testscript.qvs # Path to a script that should be set in the app
</pre>
</p>
</details>  

2. Expose connections in the app
<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-target="clipboard">
engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: /myapp.qvf   # App name that the tool should open a session against.
script: /testscript.qvs # Path to a script that should be set in the app
connections: # Connections that should be created in the app
  testdata: # Name of the exposed connection
      connectionstring: /data # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
      type: folder # Type of connection
</pre>
</p>
</details>  

The load script can only load data from the exposed connections specified in the `corectl.yml`{{open}}. 
```yml
connections: # Connections that should be created in the app
  testdata: # Name of the exposed connection
      connectionstring: /data # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
      type: folder # Type of connection
```
In this example the exposed connections will be `testdata`. 
<br>

Another **example**. 
```yml
connections: # Connections that should be created in the app
 testdata: #Name of firsrt the connection
      connectionstring: /data # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
      type: folder # Type of connection
  webdata: # Name of the second connection
    connectionstring: "https://gist.githubusercontent.com/carlioth/b86ede12e75b5756c9f34c0d65a22bb3/raw/e733b74c7c1c5494669b36893a31de5427b7b4fc/MovieInfo.csv" # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
    type: internet # Type of connection
 
```
This would expose two connection:<br>
The first connection is the same as in the other example. <br> The second one is a webdata connection to a gist on github.

#### 2. The load script
First take a look at `testscript.qvs`{{open}}. If you are familliar with SQL you will see some simliarities this is beacuase when the load scripts once were made they were inpired by SQL. 
<br>


`
Movies:  
LOAD *
FROM [lib://testdata/movies.csv]
(txt, utf8, embedded labels, delimiter is ',');
`

This script will load everything from `movies.cvs` at the exposed connection lib://testdata/. <br>
lib is a specification when the data is from a local source in this case the engine container.
<br>Depending on what data source, the load scripts will be diffrent. 
<br>

**Load diffrent kinds of file types**<br>
Read about [core data loading](https://github.com/qlik-oss/core-data-loading) to learn how to load diffrent file types. 



#### 3. Look at the data

We have now loaded `data/movie.cvs `{{open}} into our myapp.qvf app. There are a bunch of analytics tool we can use to look at the data just loaded.
<br>
To see the tools: `corectl`{{execute}} and under `App Analysis Commands` you will find useful tools.
<br>

![Analysis](hello-engine/assets/analys.png)