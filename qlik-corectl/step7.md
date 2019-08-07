To load two more files we will need to do two things. First we need to setup a connection to each file and then we need to change the load script so it loads both files.
<br>
We use the connections from step 4 and 6. The url to the moviesinfo and the folder connection to the data folder.


<pre class="file" data-filename="corectl.yml" data-target="replace">
engine: localhost:19076 
app: myapp  
script: webload.qvs 
connections: 
  webdata: 
    connectionstring: 'https://gist.githubusercontent.com/carlioth/b86ede12e75b5756c9f34c0d65a22bb3/raw/e733b74c7c1c5494669b36893a31de5427b7b4fc/MovieInfo.csv'
    type: internet 
 testdata: 
      connectionstring: /data 
      type: folder 
</pre>

We already have load scripts for both this files ready so we just add both of them to the script(.qvs file) we want to use. Lets append the Movies loadscript to the webscript.qvs:

<pre class="file" data-filename="webload.qvs" data-target="append">
Movies:
LOAD *
FROM [lib://testdata/movies.csv]
(txt, utf8, embedded labels, delimiter is ',');
</pre>


First we need to rebuild the app `corectl build`{{execute}}.

Run: `corectl tables`{{execute}}!!

As you can see we now have both tables in our app!
<br>

**But wait there is more:**
<br>
Checkout: [catwalk](https://catwalk.core.qlik.com/?engine_url=wss://2886795276-19076-ollie02.environments.katacoda.com/home/engine/Qlik/Sense/Apps/myapp ).
<br>
As you can see we now have relation in within our tables. Catwalk will automatically relate fields with the same name which is very powerful when adding a lot of table and when the data system are more complex.