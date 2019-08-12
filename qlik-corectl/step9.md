
In this step we won't cover as much details since corectl doesn't provide any visualization tools.
<br>

However we will provide an example how you could use corectl to load data and a object then use a simple bar-chart with picasso.js. 
<br>

[Picasso.js](https://picassojs.com/) is a visualization javascript library to create visualization. It comes with a q-plugging which provides a lot of help when extracting data from a QIX-app
<br>

If you want to see more visualizations check out [picasso.js examples](https://picassojs.com/examples.html).


We will need two more files working with picasso.js:


* `touch index.html`{{execute}} - A html file containing a simple container to render our chart in. 

* `touch chartSetting.js`{{execute}} - The settings from [picasso.js examples](https://picassojs.com/examples.html) bar-chart example.
<br>



To create this visualization we will use `picasso.chart()` to render a bar-chart. This method have three parameters:
* The data that will be displayed in the chart
* The chart-settings/chart-layout
* A html-element to render the chart in.  

So lets fix some data, a chart-layour and a html-container:

## Load the data

To use the bar chart we need values for the y-axis and for the t-axis. We can try for example to do a bar-chart that displays the amount of movies made every year. Which means we need the Years on the t-axit and the amount of movies each year on the y-axis. The data we need to do this can be found in `data/movies.csv`{{open}}.
<br>

This can be done by loading the the field Year and a measurment called Count(Year) into our `corectl-object.json`{{open}}. This means we only need to use the field `Year` and this is a field we have already loaded into our app. We can double check what by using:
<br>
`corectl values Year`{{execute}}

<br>

We need to change the object so we get Year as a def and count(year) as a measurement. This is done by: 

<pre class="file" data-filename="corectl-object.json" data-target="replace">
{
  "qInfo": {
    "qType": "measure",
    "qId": "Barchart"
  },
  "qHyperCubeDef": {
    "qDimensions": [{
      "labels": true,
      "qDef": {
        "qFieldDefs": [
          "Year"
        ],
        "qSortCriterias": [{
          "qSortByAscii": 1
        }]
      }
    }],
    "qMeasures": [{
        "labels": true,
        "qDef": {
          "qLabel": "Count(Year)",
          "qDef": "Count(Year)",
          "autoSort": true
        }
      },

      {
        "labels": true,
        "qDef": {
          "qLabel": "Nominal Costs",
          "qDef": "Nominal Costs",
          "autoSort": true
        }
      }

    ],


    "qInitialDataFetch": [{
      "qHeight": 50,
      "qWidth": 10
    }]
  }
}

</pre>

<br>

To update corectl use `corectl`{{build}}.

## Setting up picasso.js

We create the chart settings for our bar-chart from the [picasso bar-chart example](https://observablehq.com/@miralemd/picasso-js-bar-chart). We do some smaller modifications so it fits our data. 
<br>

`bar-chart.js`{{open}}

<pre class="file" data-filename="bar-chart.js" data-target="replace">
export const chartSettings = {
    scales: {
        labels: 'true',
        y: {
            data: {
                field: 'Count(Year)'
            },
            invert: true,
            include: [0]
        },
        c: {
            data: {
                field: 'Count(Year)'
            },
            type: 'color'
        },

        t: {
            data: {
                extract: {
                    field: 'Year'
                }
            },
            padding: 0.3
        },
    },
    components: [{
            type: 'axis',
            dock: 'left',
            scale: 'y'
        }, {
            type: 'axis',
            dock: 'bottom',
            scale: 't'
        }, {
            key: 'bars',
            type: 'box',
            data: {
                extract: {
                    field: 'Year',
                    props: {
                        start: 0,
                        end: {
                            field: 'Count(Year)'
                        }
                    }
                }
            },
            settings: {
                major: {
                    scale: 't'
                },
                minor: {
                    scale: 'y'
                },
                box: {
                    fill: {
                        scale: 'c',
                        ref: 'end'
                    }
                }
            }
        },
        {
            type: 'text',
            text: 'Year',
            layout: {
                dock: 'bottom'
            }
        },
        {
            type: 'text',
            text: 'Number of Movies',
            layout: {
                dock: 'left'
            }
        }
    ]
}
</pre>

<br>

Then we create a simple `<div>` called container in the `index.html`{{open}}:


<pre class="file" data-filename="index.html" data-target="replace">

<!DOCTYPE html>
<html>
  <head>
    <title>My picasso.js page</title>
 
    <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    #container {
      height: 100%;
      position: relative;
    }
    </style>
  </head>
  <body>
    <div id="container">
    </div>
    <script src="app.js">
    </script>
  </body>
</html>
</pre>

<br>

## Put everything together

We put this toghter in the `app.js`{{open}} first we connect to QIX and load the the as in previous examples. Then we us `picasso.chart()` to render our bar-chart we created in `bar-chart.js`{{open}}.



<pre class="file" data-filename="app.js" data-target="replace">
const enigma = require('enigma.js');
import picasso from 'picasso.js';
import 'babel-polyfill';
import picassoQ from 'picasso-plugin-q';
const schema = require('enigma.js/schemas/3.2.json');
import {
    chartSettings
} from './bar-chart.js';

(async () => {
    try {

        console.log('Creating session app on engine.');
        const session = enigma.create({
            schema,
            url: 'ws://localhost:19076/app/',
            createSocket: url => new WebSocket(url),
        });
        const qix = await session.open();
        const app = await qix.openDoc('myapp');
        const object = await app.getObject('Barchart');
        const layout = await object.getLayout();

        await picassoPaint(chartSettings, layout)

    } catch (err) {
        console.log('Whoops! An error occurred.', err);
        process.exit(1);
    }
})();



function picassoPaint(settings, layout) {

    picasso.use(picassoQ);

    picasso.chart({
        element: document.querySelector('#container'), // This is the element to render the chart in
        data: [{
            type: 'q',
            key: 'qHyperCube',
            data: layout.qHyperCube,
        }],
        settings,
    });

}
</pre>

<br>

Use `npm run bar-chart` to create the exampled and follow the [link](https://[[HOST_SUBDOMAIN]]-8080-[[KATACODA_HOST]].environments.katacoda.com/) to view the bar chart.

<br>

**Note** We used the npm web-pack plugin to bundle the project you can view it here `cat ./../webpack.config.js`

