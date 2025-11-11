import streamDeck, { LogLevel } from "@elgato/streamdeck";
import { TriggerMacro } from "./actions/trigger-macro";

streamDeck.logger.setLevel(LogLevel.TRACE);
streamDeck.actions.registerAction(new TriggerMacro());
streamDeck.connect();

import { startExternalServer as startExternalWebSocketServer } from './webby';

streamDeck.system.onDidReceiveDeepLink((ev) => {
    console.log('deeplink', ev);

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
