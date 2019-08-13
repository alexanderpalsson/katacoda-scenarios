 Before we can begin this turotial you need to have an instance of Qlik's Associative Engine(QIX) running in the Katacoda environment. Throughout this tutorial you will learn how to communicate with QIX using corectl. 

## Start the engine 
In order to use QIX you have to accept the EULA. By clicking on this command you accept EULA: `ACCEPT_EULA=yes docker-compose up -d`{{execute}}


## Prepared files
Also, there are 4 prepared files in this repository that we will use. You can check them out now or wait until they appear in the tutorial:
* `corectl.yml`{{open}} - This is the configuration file, the one that you will be editing
* `testscript.qvs`{{open}} - A load script that will be used in to load data. 
* `data/movies.csv `{{open}} - The data that will be loaded. (**Note** in this example the data is actually mounted into the docker container.)
* `corectl-object.json `{{open}} - The object that will be loaded.