// Open a session
 const session = enigma.create({
    schema,
    url: 'ws://localhost:19076/app/testscript',
    createSocket: url => new WebSocket(url),
 });
 const qix = await session.open();
   
