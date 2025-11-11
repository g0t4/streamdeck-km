import streamDeck, { LogLevel } from "@elgato/streamdeck";
import { TriggerMacro } from "./actions/trigger-macro";

streamDeck.logger.setLevel(LogLevel.TRACE);
streamDeck.actions.registerAction(new TriggerMacro());
streamDeck.connect();

import { startExternalServer as startExternalWebSocketServer } from './webby';

streamDeck.system.onDidReceiveDeepLink((ev) => {
    // TODO! use passive links to send messages instead of using a websocket server?
    // sounds good to me! if it works ok and doesn't open the streamdeck app
    // not clunky slow too, right?

    console.log('deeplink', ev);

    // TODO! switch to using logger in SDeck
    //  any limitations?
    streamDeck.logger.info('deeper', ev); // shows up in com.wes.kmtrigger.sdPlugin/logs/*

    // https://docs.elgato.com/streamdeck/sdk/guides/deep-linking
    //
    // active:
    //   streamdeck://plugins/message/com.wes.kmtrigger/hello?name=Elgato#waving
    //
    // passive:
    //   streamdeck://plugins/message/com.wes.kmtrigger/hello?streamdeck=hidden
    //    v7 has passive deep link (streamdeck=hidden) but it's not working for me
    //    these won't open streamdeck app (like active links)
    //
    //  ev: {
    //     "type": "didReceiveDeepLink",
    //     "url": {
    //         "fragment": "waving",
    //         "href": "/hello?name=Elgato#waving",
    //         "path": "/hello",
    //         "query": "name=Elgato",
    //         "queryParameters": {}
    //     }
    // }  
    //

});

startExternalWebSocketServer();
