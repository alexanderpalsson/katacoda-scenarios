
`touch app.js`{{execute}}
`touch chartSetting.js`{{execute}}
`touch webpack.config.js`{{execute}}


<pre class="file" data-filename="app.js" data-target="replace">
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
                }
            }
        },
        {
            type: 'text',
            text: 'Rating Score',
            layout: {
                dock: 'bottom'
            }
        },
        {
            type: 'text',
            text: 'Number of Votes',
            layout: {
                dock: 'left'
            }
        }
    ]
}
</pre>

<pre class="file" data-filename="chartSetting.js" data-target="replace">
const enigma = require('enigma.js');
import picasso from 'picasso.js';
import 'babel-polyfill';
import picassoQ from 'picasso-plugin-q';
const schema = require('enigma.js/schemas/3.2.json');
import {
    chartSettings
} from './chartSetting.js';

(async () => {
    try {

        picasso.use(picassoQ);

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


<pre class="file" data-filename="corectl-object.js" data-target="replace">
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


<pre class="file" data-filename="webpack.config.js" data-target="replace">
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: { app: './app.js' },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: { host: '0.0.0.0', port: '8080', disableHostCheck: true },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [path.resolve(__dirname, 'node_modules')],
        query: { presets: ['@babel/preset-env'] },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'index.html' },
    ]),
  ],
};
</pre>

