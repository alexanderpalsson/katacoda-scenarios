
## Objectives of this tutorial
In this tutorial we will go over the basics about coreCtl the goal with the tutorial is: <br>
* Create a coreCtl configuration file
* Run coreCtl
* Load data with coreCtl
* Use the coreClt cli to analyze the data
* Load objects

## Prepared files
There are 4 prepared files in this repository:
* `corectl.yml`{{open}} - This is the configuration file that you will edit
* `testscript.qvs`{{open}} - A load script that will be used in *Step 3* to load data. 
* `data/movie.cvs `{{open}} - The data that will be loaded. (**Note** this data is actually mounted into the docker container.)
* `corectl-object.json `{{open}} - The object that will be loaded in *Step 4*
Run corectl to se the different commands: 
`corectl`{{execute}}

## Before you can start
In order to use QIX engine you have to accept EULA. By clicking on this command you accept EULA: `ACCEPT_EULA=yes docker-compose up -d`{{execute}}
