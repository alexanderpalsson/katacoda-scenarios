Corectl is a command line tool to perform reloads, fetch metadata and evaluate expressions in Qlik Core apps. <br>

To simplify usage of corectl, basic configurations such as: engine connection details, app and objects, can be described in a configuration file. You can look at the [example configuration file](https://github.com/qlik-oss/corectl/blob/master/examples/corectl.yml) to get a sense how it works.<br>

corectl will automatically check for a corectl.yml | corectl.yaml file in your current directory, removing the need to pass the config file using flags for each command.


## Running coreCtl on you local machine
If you want to run coreCtl locally on you machine see the [coreCtl documentation](https://github.com/qlik-oss/corectl) to install corectl.

To run corectl you will need a engine running in a docker conatiner. If you are unfamilliar with docker you can read more about [docker containers](https://www.docker.com/resources/what-container) after the tutorial. If you are curious about what docker-compose file we use in this example you can `../docker-compose.yml`{{open}}

However in this turorail you don't have to worry about docker or installing corectl **everything is preinstalled in the enviroment. 



