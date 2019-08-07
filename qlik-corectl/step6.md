This step is about loading data from a webpage instead of a local file. Skip to the step 9 if you had enough of connections and loadscripts.


# Load data from a html-page(webpage)

We need to adjust 2 things when we are chaning the data typ:

1. The corectl.yml file so that the connection point att the URL where our data is.
we will use the info about the movies  from this [url](https://gist.githubusercontent.com/carlioth/b86ede12e75b5756c9f34c0d65a22bb3/raw/e733b74c7c1c5494669b36893a31de5427b7b4fc/MovieInfo.csv).

2. Change the loadscript so it loads html instead of text.(We always need to change the loadscript when loading different files)

We replace the code in the corectl.yml file with:

<pre class="file" data-filename="corectl.yml" data-target="replace">
engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: myapp   # App name that the tool should open a session against.
script: webload.qvs # Path to a script that should be set in the app
connections: # Connections that should be created in the app
  webdata: # Name of the connection
    connectionstring: 'https://raw.githubusercontent.com/qlik-oss/core-data-loading/master/data/airports.csv' # Connectionstring (qConnectionString) of the connection. For a folder connector this is an absolute or relative path inside of the engine docker container.
    type: internet # Type of connection
</pre>

<br>

We ca see that the connectionstring is the data-URL and that the connection typ is internet instead of a folder.

Now we make another load script to load from the webdata connection.

First make an empty .qvs file with: `touch webload.qvs`{{execute}}

Then add the code:
<pre class="file" data-filename="webload.qvs" data-target="replace">
MovieInfo:
LOAD *
FROM [lib://webdata]
(html, utf8, delimiter is ';');

</pre>
<br>

We notice that the last config line is change from reading text to html!

Now we can rebuild the app with `corectl build`.

Analyze the data with the commands we used in step5:


`corectl fields`{{execute}} - Displays the fields in the app

<br>

`corectl tables`{{execute}} - Displays tables in the app

<br>

`corectl values <field name>` - Displays the values in the specific field

<br>


