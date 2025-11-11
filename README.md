# streamdeck-wes

A Stream Deck plugin to unify all my mods to StreamDeck.
Code is for reference/example, not intended for you to install and forget about.
Know what you are doing!

### Commands

Guides: https://docs.elgato.com/streamdeck/sdk/introduction/your-first-changes

```bash
npm install

npm run build

# install streamdeck CLI
npm install -g @elgato/cli@latest
# provides streamdeck command:
streamdeck --help

# * link to use in StreamDeck
npm run link # uses streamdeck link under the hood
streamdeck list # confirm linked
# or check plugins dir:
ls ~/Library/Application\ Support/com.elgato.StreamDeck/Plugins

# * restart sandboxed plugin process
streamdeck dev # make sure in dev mode, I think this is on by default? I am unsure though, logs will show cannot restart a plugin if not in dev mode
streamdeck dev --disable # disable dev mode
npm run restart # (re)start plugin
# https://github.com/elgatosf/cli/blob/main/src/commands/restart.ts (source for restart command), uses:
open streamdeck://plugins/restart/com.wes.streamdeck # alternative

npm run validate # check if any issues w/ streamdeck validate CLI

npm run watch # auto build on changes

# see package.json for more actions, many link to streamdeck CLI
```
### Security

```sh
# edit manifest.json
#   disable node debugging
#     set Debug="Disabled"
#     and/or change the port for debugging
#   TODO! does `streamdeck pack` disable this?
```

## Property Inspectors

- `*.html` - Click a button to reload its inspector page (don't even need to change buttons)
    - Like refreshing a browser tab 

## License

MIT
