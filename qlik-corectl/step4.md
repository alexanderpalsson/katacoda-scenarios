In this step we will load data into the app.<br> 

Again [corectl config](https://github.com/qlik-oss/corectl/blob/master/docs/corectl_config.md) will be very usefull
<br>

In this step we will continue edit the `corectl.yml`{{open}} file but we also need:  
<br>
**A load script**:   `testscript.qvs`{{open}}
<br> **Some data**: `data/movie.cvs `{{open}} 
<br>

**Note** This data is loaded into a docker container, the internal docker container path is /data. If you are curios about the docker file check it out here `cat ../docker-compose.yml`{{execute}} 

## Setup a connection to the data

To be able to load data into your newly created app you will have to:
1. Define what load script you want to use. 
2. Then you will need to expose a connection from the engine container to the load script.

**Exercise: Add the script**

Add a script path in `corectl.yml`{{open}} pointing at  `testscript.qvs`.

<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-target="clipboard">
engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: /myapp   # App name that the tool should open a session against.
script: testscript.qvs # Path to a script that should be set in the app
</pre>
</p>
</details>  

**Exercise: Expose the connection**  
  Edit the `corectl.yml`{{open}} so that it opens a connection called `testdata` to the folder `/data`.

<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-target="clipboard">
engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: /myapp   # App name that the tool should open a session against.
script: testscript.qvs # Path to a script that should be set in the app
connections: # Connections that should be created in the app
  testdata: # Name of the connection
      connectionstring: /data # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
      type: folder # Type of connection

</pre>
</p>
</details>  
<br>

Run `corectl build`{{execute}} to rebuild.
<br>
<br>
<details> <summary>Some extra connection setup examples</summary>
<p> 

The load script can only load data from the exposed connections specified in the `corectl.yml`{{open}}. 
<pre class="file">
connections: # Connections that should be created in the app
  testdata: # Name of the exposed connection
      connectionstring: /data # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
      type: folder # Type of connection
```
In this example the exposed connections will be `testdata`. 
</pre>
<br>

Another **example**.
<pre class="file"> 
connections: # Connections that should be created in the app
 testdata: #Name of firsrt the connection
      connectionstring: /data # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
      type: folder # Type of connection
  webdata: # Name of the second connection
    connectionstring: "https://gist.githubusercontent.com/carlioth/b86ede12e75b5756c9f34c0d65a22bb3/raw/e733b74c7c1c5494669b36893a31de5427b7b4fc/MovieInfo.csv" # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
    type: internet # Type of connection
</pre>
This would expose two connection:<br>
The first connection is the same as in the firste example. <br> The second one is a webdata connection to a gist on github.

</p>
</details> 
<br>

## The load script
First take a look at `testscript.qvs`{{open}}. If you are familiar with SQL you will see some similarities.
<br>


`
Movies:  
LOAD *
FROM [lib://testdata/movies.csv]
(txt, utf8, embedded labels, delimiter is ',');
`

This script will load * (everything) from `movies.csv` at the exposed connection lib://testdata/. 
<br>

`lib` is a local data path specification (its `web` for webdata, etc).
<br> 
<br>

**Load different kinds of file types**<br>
The last line in the load script is the config. This will also depend on what data source that is used.
Read more about [core data loading](https://github.com/qlik-oss/core-data-loading) to learn about loading different file types. 



## Use corectl analyzing tools 

We have now loaded data into `myapp`. A copy of the data can be seen in `data/movie.cvs `{{open}}. Corectl comes with a bunch of inbuilt analytics tool we can use on the loaded data.
<br>
If you run `corectl`{{execute}} you will see some helpful analytic tool under the heading `App Analysis Commands` 
<br>

![Analysis](assets/analys.png)

**For example:**
<br>

`corectl fields`{{execute}} - Displays the fields in the app
<br>

`corectl tables`{{execute}} - Displays tables in the app
<br>

`corectl values <field name>` - Displays the values in the specific field
<br>

From `corectl fields`{{execute}} we see that the app contains a field called Movie. <br>
Using `corectl values Movie`{{execute}} will display all the top values of the Movies field.
<br>

**Exercise** <br>
As you can see there are more two more fields in our data tables, can you use `corectl values` to figure out:
 >>How many of the movies that were made in 2009?<<
[ ] One
[*] Two
[ ] Three


## Catwalk
After you have created the initial load script, chances are that you experience data modeling problems. In such cases, you may need help finding out how the data is associated and how interactions with the data impacts the model.

Catwalk provides you with a view of all your tables, fields, their associations as well as information about the data within.

When running corectl locally on your machine you can use `corectl catwalk`{{execute}} to run catwalk in a browser. 
<br>

Since this katacoda environment has no inbuilt browser you will have to manually enter the app [websocket url](https://catwalk.core.qlik.com/?engine_url=). If you are running a engine container on your local machine the websocket will be `ws://localhost:19076` depending on what port you use.

We have configure the websocket URL for this example:<br>
 https://catwalk.core.qlik.com/?engine_url=wss://[[HOST_SUBDOMAIN]]-19076-[[KATACODA_HOST]].environments.katacoda.com/home/engine/Qlik/Sense/Apps/myapp
<br>

However since we have load just a small .cvs file into our app the catwalk display much. But when the data structures getting bigger and more complex catwalk can be a really useful tool.<br>
If you are curious about how catwalk can be utilize with a more complex data take a look at the [catwalk weather data example](https://catwalk.core.qlik.com/?engine_url=wss://apps.core.qlik.com/app/doc/01775889-c700-413f-9b0e-6ba1837c52b0/).

**Next step**
<br> In next step we will use an object to structure the data.