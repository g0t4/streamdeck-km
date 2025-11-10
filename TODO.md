
## Trigger timing

Investigate if using keyboardmaestro CLI is faster to trigger a macro...

```sh
/Applications/Keyboard\ Maestro.app/Contents/MacOS/keyboardmaestro --help
```

vs AppleScript, etc


## Nice to Haves

- Set `Category` in manifest.json
  - MUST SET `CategoryIcon` too to use this
  - FYI `CUSTOM` category is FINE FOR NOW!
  - Results in button type showing in its own Group on right side of Elgato button editor
  - Probably I would only need this if I create my own aggregate plugin that has lots of button types (not just kmtrigger)  
