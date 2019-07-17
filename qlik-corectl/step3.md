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
script: testscript.qvs # Path to a script that should be set in the app
connections: # Connections that should be created in the app
  testdata: # Name of the connection
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

![Analysis](assets/analys.png)

<br>
`corectl fields`{{execute}} - To see what fields is in the app
<br>

`corectl tables`{{execute}} - To see the tables
<br>

We see that the app contains a field called Movie. By using `corectl values`{{execute}} we can se whats inside he fields.
<br>

`corectl values Movie`{{execute}} - Will display the values in the Movie field.<br>


>>There are more two more fields in our data tables can you see how many of the movies where made in 2009?<<
[ ] One
[*] Two
[ ] Three


#### 4. Catwalk
Catwalk is a tool linked. When running corectl locally on your machine you can use `corectl catwalk`{{}} to run catwalk in a browser. 
<br>
Since this enviroment has no browser you can display use a [catwalk websocket Url](https://catwalk.core.qlik.com/?engine_url=wss://[[HOST_SUBDOMAIN]]-19076-[[KATACODA_HOST]].environments.katacoda.com/home/engine/Qlik/Sense/Apps/myapp.qvf).


If you are curious about catwalk you can look at [catwalk weather data example](https://catwalk.core.qlik.com/?engine_url=wss://apps.core.qlik.com/app/doc/01775889-c700-413f-9b0e-6ba1837c52b0/) which displays an app much more complexe data structure.

**Next step**
<br> In next step we will use an object to structure the data.