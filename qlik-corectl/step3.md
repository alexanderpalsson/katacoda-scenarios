
**Tip:** You can always run `corectl`{{execute}} in the terminal window to see corectls CLI commands. 


## 1. CoreCtl build
In order to use corectl tools you will have to build/load an app. The cli command that builds(or rebuild) apps is `corectl build`. <br>


There are two ways to use `corectl build`:
<br>

**1. A configuration file**
<br>The simplest way and the approach that we will use in this tutorial is to use a configuration file. <br>
When you run the command: `corectl build` CoreCtl will automatically look for file with the name ***corectl.yml*** in the current working folder. In this corectl.yml file is it possible to setup basic configuration for corectl such as: engine connection details, app and objects. <br>

We have provide an empty configuration file `corectl.yml`{{open}} for you to edit. Look at the specification of  [**corectl configuration file**](https://github.com/qlik-oss/corectl/blob/master/docs/corectl_config.md) to see example and how to create config files. Here is were you will find almost all **solutions** to the exercises provided in this tutorial. 
<br>


**2. Flags**
<br>The second way you can build corectl is with providing flags to the `corectl build` command. You can display the flag options with `corectl build -h`{{execute}}   
<br>



## 2. Create the cofigurationfile 

**Exercise:** Connect to engine
<br>

Edit the `corectl.yml`{{open}} so that is connects to engine running at localhost:19076. 

<details> <summary>Show solution</summary>
<p> 
<pre class="file" data-filename="corectl.yml" data-target="replace">engine: localhost:19076 # URL and port to running Qlik Associative Engine instance
</pre>
</p>
</details>  

 We can now build corectl wiht `corectl build`{{execute}}, but corectl will return `ERROR no app specified`. This is because we are currently running a corectl session against an engine without an app. Running a session with corectl without an app would be meaningless, since the app manges all data handling.  <br>

However to make sure we are connected  QIX we can run `corectl status`{{execute}} 
<br>
<br>

**Exercise:** Create an app

As mentioned running a session with corectl without an app would be meaningless, since the app manges data handling.  <br>

So, lets create an application. Edit the `corectl.yml`{{open}} and specify an app-name you want to use.

 <details> <summary>Show solution</summary>
 <p>
<pre class="file" data-filename="corectl.yml" data-target="append">app: myapp  # App name that the tool should open a session against.
</pre>

</p>
</details>

<br>

To update the corectl after editing the corectl.yml file, you need to either reload or re-build corectl with: `corectl build`{{execute}} or `corectl reload`{{execute}}

Now you should have an app called my-app with a connection running against an engine!!
<br>

You can check your apps with: <br>
`corectl app ls`{{execute}}
<br>
<br>
Or display meta of your data: <br>
`corectl meta`{{execute}}

This will display and empty app without any data so in next step we will learn how to load data to the app.

## 3. (Optional) Create an app using flags 

To use the same setup as in the config file we have to use the flags:
* `-e` which specifies URL to QIX engine and *-a* which 
* `-a` which specifies the app name of the app
<br>

Something like this: <br>
`corectl build -e "localhost:19076" -a "myapp"`{{execute}}