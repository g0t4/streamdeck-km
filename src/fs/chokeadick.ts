import chokidar, { FSWatcher } from "chokidar";
import fs from "node:fs";
import path from "node:path";
import { homedir } from "os";
import { streamDeck } from "@elgato/streamdeck";

const logger = streamDeck.logger.createScope("fs.chokeadick");

// * PATHS
const my_dir = path.join(homedir(), ".local/share/streamdeck-wes/");
// I already save to this file whenever I change ask settings! let's just reuse it too!
const ask_config = path.join(homedir(), ".local/share/nvim/ask-openai/config.json");

function muhk_dir_pee(dir: string) {
    if (fs.existsSync(dir))
        return;

    try {
        fs.mkdirSync(dir, { recursive: true });
        logger.info("🎉 💪 I muhked the dir: " + dir);
    } catch (error) {
        logger.error("well 💩... I couldn’t muhk the dir: ", error);
    }
}

export function chokit() {

    const watchPaths = [my_dir, ask_config];
    muhk_dir_pee(my_dir);

    const watcher = chokidar.watch(watchPaths, {
        persistent: true,
        ignoreInitial: false, // this is initial sync (triggers for each existing file, unless disabled)
        useFsEvents: true,  // native macOS watcher
        awaitWriteFinish: { stabilityThreshold: 75, pollInterval: 10 },
        depth: 1,
    });

    watcher.on("ready", function () {
        logger.info("ready");
    });

    watcher.on("add", function (filePath: string, stats?: fs.Stats) {
        logger.info("add", filePath);
        readFile(filePath, stats);
    });

    watcher.on("change", function (filePath: string, stats?: fs.Stats) {
        logger.info("change", filePath);
        readFile(filePath, stats);
    });

    // unlike == remove
    // watcher.on("unlink", function (filePath: string, stats?: fs.Stats) {
    //     logger.info("unlink", filePath);
    // });
    function readFile(filePath: string, stats?: fs.Stats) {
        try {
            const contents = fs.readFileSync(filePath, "utf8");
            logger.trace("contents", contents);
            const parsed = JSON.parse(contents);
            logger.trace('parsed:', parsed);
            // handleUpdate(path.basename(relativePath), data);
        } catch (err) {

            // avoid spamming errors if file mid-write (wait and see how often this happens):
            //    if (!/Unexpected end/.test(err.message)) {

            logger.error(err);
        }
    }
}


