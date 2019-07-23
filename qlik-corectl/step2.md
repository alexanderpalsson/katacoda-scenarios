**Tip:** You can always run `corectl` in the terminal window to see corectls CLI commands: 
`corectl`{{execute}}

## 1. CoreCtl build
In order to use corectl tools you will have to build/load an app. The cli command that builds(or rebuild) apps is `corectl build`. <br>


There are two ways to use `corectl build`:
<br>

**1. Configurations file**
<br>The simplest way and the way we use in this tutorial is to use a configuration file. <br>
When you run the command: `corectl build` CoreCtl will automatically look for file with the name ***corectl.yml*** in the current working folder. In this corectl.yml file is it possible to setup basic configuration for corectl such as: engine connection details, app and objects. <br>

For this tutorial we have provide an empty configuration file `corectl.yml`{{open}}. But you can a the specification of  [**corectl configuration file**](https://github.com/qlik-oss/corectl/blob/master/docs/corectl_config.md) to see example and how to create config files. The  [**corectl configuration file**](https://github.com/qlik-oss/corectl/blob/master/docs/corectl_config.md) is probably were you will find almost all **solutions** to the exercises provided in this tutorial. 
<br>


**2. Flags**
<br>The second way you can build corectl is with providing flags to the `corectl build` command. You can display the flag options with `corectl build -h`{{execute}}   
<br>



## 2. Setting up the cofigurationfile 

**Exercise:** Connect to engine
<br>

Edit the `corectl.yml`{{open}} so that is connects to engine at localhost:19076. 

<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-filename="corectl.yml" data-target="replace">engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
</pre>
</p>
</details>  
<br>

 Use `corectl build`{{execute}} to build the application 
 <br>

 That will return `ERROR no app specified`. This is because we are currently running a corectl session against an engine without an app.
 <br>
However you can check our current connection with `corectl status`{{execute}} 

**Exercise:** Create an app

Running a session with corectl without an app would be meaningless, since the app manges data handling.  <br>

Lets include the application. Edit the `corectl.yml`{{open}} and specify an app you want to use.

 <details> <summary>Show solution</summary>
 <p> 
<pre class="file" data-target="clipboard">engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
app: /myapp.qvf   # App name that the tool should open a session against.
</pre>
</p>
</details>

Run `corectl build`{{execute}} again!

Now you should have an app setup with a connection running against an engine!!
 <br>

You can check your apps with: <br> <br>
`corectl app ls`{{execute}}
<br>
<br>
Or display meta of your data: <br> <br>
`corectl meta`{{execute}}

As can be seen this is an empty app, in next step we will learn how to load data to the app.

## 4. Create an app using flags (optional just for the curios) 

To use the same setup as in the config file we have to use the flags:
* `-e`{{execute}} which specifies URL to QIX engine and *-a* which 
* `-a`{{execute}} which specifies the app name of the app
<br>

Something like this: <br>
`corectl build -e "localhost:19076" -a "myapp.qvf"`{{execute}}