# Stream Deck Keyboard Maestro Plugin

A Stream Deck plugin to trigger Keyboard Maestro macros with a button press.

## Features

- Execute Keyboard Maestro macros directly from Stream Deck buttons
- Browse and select macros organized by groups
- View last modified macro at the top for quick access
- Pass optional parameters to macros
- Refresh macro list with a button click

## Requirements

- macOS 10.11 or later
- Stream Deck 4.1 or later
- Keyboard Maestro 8 or later
- Node.js 20 or later (bundled with Stream Deck)

## Installation

### Option 1: Install from file

1. Build the plugin (see Development section below)
2. Double-click `com.wes.kmtrigger.sdPlugin` to install

### Option 2: Development installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the plugin: `npm run build`
4. Create a symlink to the plugin folder: `npm run devlink`
5. Restart Stream Deck software

## Usage

1. Drag the "Trigger KM Macro" action onto a Stream Deck button
2. In the property inspector:
   - Select a macro from the dropdown (organized by groups)
   - Optionally add a parameter to pass to the macro
   - Click the refresh button to reload the macro list
3. Press the button to execute the selected macro

## Development

### Project Structure

```
.
├── src/
│   ├── plugin.ts          # Main plugin code
│   └── km-helper.ts       # Keyboard Maestro integration
├── com.wes.kmtrigger.sdPlugin/
│   ├── manifest.json      # Plugin manifest
│   ├── pi.html           # Property Inspector UI
│   ├── bin/              # Compiled JavaScript
│   └── *.png, *.svg, *.css  # Assets
├── package.json
└── tsconfig.json
```

### Building

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Link plugin to Stream Deck (for development)
npm run devlink

# Watch mode (auto-rebuild on changes)
npm run watch
```

### How it Works

1. **Plugin Backend** (`src/plugin.ts`):
   - Connects to Stream Deck via WebSocket
   - Handles button press events
   - Queries Keyboard Maestro for macro lists
   - Executes macros via AppleScript

2. **Keyboard Maestro Integration** (`src/km-helper.ts`):
   - Uses JXA (JavaScript for Automation) to query KM for available macros
   - Falls back to traditional AppleScript if JXA fails
   - Executes macros using AppleScript: `tell application "Keyboard Maestro Engine" to do script "<uid>"`

3. **Property Inspector** (`pi.html`):
   - Provides UI for selecting macros and entering parameters
   - Communicates with plugin backend via WebSocket
   - Organizes macros by groups with last-modified macro at the top

## Troubleshooting

### Plugin doesn't appear in Stream Deck

- Make sure Node.js 20+ is available
- Check Stream Deck logs: `~/Library/Logs/StreamDeck/`
- Restart Stream Deck software

### Macros don't execute

- Ensure Keyboard Maestro Engine is running
- Check that the macro is enabled in Keyboard Maestro
- Verify the macro has "Execute" permissions

### Macro list doesn't load

- Make sure Keyboard Maestro is installed and running
- Try clicking the refresh button in the property inspector
- Check that Keyboard Maestro has necessary permissions in System Preferences

## Credits

UI design inspired by [KMlink](https://github.com/Corcules/KMlink) by Corcules.

## License

MIT
