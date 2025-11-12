import { Action } from "@elgato/streamdeck";
import { streamDeck } from "@elgato/streamdeck";
const logger = streamDeck.logger.createScope("titles");

export const config = {};

export function update_title(action: Action, settings: "TriggerMacroSettings") {
    // FYI can have titles with:
    //   ask.fim.model + " foo the bar";
    const title_path = settings.dynamic_title;
    if (!title_path) {
        return;
    }
    // FYI I can optimize this in the future when I have tons of buttons subscribed to updates
    //  for example, cache the fn until dynamic_title changes (i.e. global cache)
    //  scope to what changed (i.e. only things with "\bask\." ) 
    const fn = Function("config", `with(config){ return ${title_path}; }`);
    try {
        const resolved = fn(config);
        action.setTitle(resolved ?? '');
    } catch (error) {
        logger.error(`💩 Holy crap, something went wrong: ${error}`);
        throw error;
    }
}
