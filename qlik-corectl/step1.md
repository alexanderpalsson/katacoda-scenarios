## What is corectl?
Corectl is a command line tool to perform reloads, fetch metadata and evaluate expressions in Qlik Core apps. <br>

To simplify usage of corectl, basic configurations such as: engine connection details, app and objects, can be described in a configuration file. You can look at the [example configuration file](https://github.com/qlik-oss/corectl/blob/master/examples/corectl.yml) to get a sense how it works.<br>
corectl will automatically check for a corectl.yml | corectl.yaml file in your current directory, removing the need to pass the config file using flags for each command.


## Running coreCtl on you local machine
If you want to run coreCtl locally on you machine see the [coreCtl documentation](https://github.com/qlik-oss/corectl) to install corectl.

To run corectl you will need a engine running in a docker conatiner. If you are unfamilliar with docker you can read more about [docker containers](https://www.docker.com/resources/what-container) after the tutorial. If you are curious about what docker-compose file we use in this example you can `../docker-compose.yml`

However in this turorail you don't have to worry about docker or installing corectl **everything is preinstalled in the enviroment. 


## Before we get started

In order to use Qlik engine you have to accept EULA by cliking on this command you accept EULA: <br>
ACCEPT_EULA=yes docker-compose up -d{{execute}}

## Objectives in this tutorial

* Create a coreCtl configuration file
* Run coreCtl
* Load data with coreCtl
* Use the coreClt cli to anlyze the data
* Load objectst

## Prepared files
There are 4 prepared files in this repo:
* `corectl.yml`{{open}} - This is the configuration file that you will edit
* `testscript.qvs`{{open}} - A load script that will be used in *Step 3* to load data. 
* `data/movie.cvs `{{open}} - The data that will be loaded. (**Note** this data is actually mounted into the docker container.)
* `corectl-object.json `{{open}} - The object that will be loaded in *Step 4*
Run corectl to se the different commands: 
`corectl`{{execute}}

