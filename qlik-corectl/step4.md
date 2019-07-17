This step will handle loading objects into to you app. Objects is the core of Qlik data visualization and if you are unfamiliar with objects, we recomend you to read about [qlik-objects](http://help.qlik.com/en-US/sense-developer/June2019/SubSystems/Platform/Content/Sense_PlatformOverview/Concepts/GenericObject.htm).

### Objects

`corectl-object.json`{{open}} is a very stripped object that will load year and movie from the first five movies.

Change the `corectl.yml` so it loads the `corectl-object.json` 

<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-target="clipboard">
engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: /testscript.qvf   # App name that the tool should open a session against.
script: testscript.qvs # Path to a script that should be set in the app
connections: # Connections that should be created in the app
  testdata: # Name of the connection
      connectionstring: /data # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
      type: folder # Type of connection
objects:
  - ./hello-corectl.json # Path to objects that should be created from a json file. Accepts wildcards.
</pre>
</p>
</details>  


We have  now loaded the data into a hypercube.
