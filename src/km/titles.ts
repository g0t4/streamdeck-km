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
    const fn = Function("config", `with(config){ return ${title_path}; }`);
    try {
        const resolved = fn(config);
        action.setTitle(resolved ?? '');
    } catch (error) {
        logger.error(`💩 Holy crap, something went wrong: ${error}`);
        throw error;
    }
}
