
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

<pre class="file" data-filename="webload.qvs" data-target="append">
Movies:
LOAD *
FROM [lib://testdata/movies.csv]
(txt, utf8, embedded labels, delimiter is ',');
</pre>

`corectl build`{{execute}}

Now we have two tables in our app: `corectl tables`{{execute}} or in [catwalk](https://catwalk.core.qlik.com/?engine_url=wss://2886795276-19076-ollie02.environments.katacoda.com/home/engine/Qlik/Sense/Apps/myapp ).

**Note** You see