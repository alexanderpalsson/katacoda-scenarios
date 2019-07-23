First you need to start an local QIX engine that we will use in this tutorial

## Start the engine 
In order to use QIX engine you have to accept EULA. By clicking on this command you accept EULA: `ACCEPT_EULA=yes docker-compose up -d`{{execute}}


## Prepared files
Also, there are 4 prepared files in this repository the we will use. You can check them out know or wait until they appears in the tutorial:
* `corectl.yml`{{open}} - This is the configuration file that you will edit
* `testscript.qvs`{{open}} - A load script that will be used in *Step 3* to load data. 
* `data/movie.cvs `{{open}} - The data that will be loaded. (**Note** in this example the data is actually mounted into the docker container.)
* `corectl-object.json `{{open}} - The object that will be loaded in *Step 4*.