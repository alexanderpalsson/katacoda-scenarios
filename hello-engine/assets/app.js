/* eslint no-console:0 */
const WebSocket = require('ws');
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/3.2.json');

(async () => {
  try {
    console.log('Creating and opening session.');
    const session = enigma.create({ 
        // TODO: Create an enigma session
     
    });
    const temp = await // TODO open the session

    const version = await // Todo retrieve engine version
    console.log(`Engine version retrieved: ${version.qComponentVersion}`);

    // TODO: Close the session
    console.log('Session closed.');
  } catch (err) {
    console.log('Whoops! An error occurred.', err);
    process.exit(1);
  }
})();
