#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const km_helper_1 = require("./km-helper");
class KeyboardMaestroPlugin {
    constructor() {
        this.ws = null;
        this.port = 0;
        this.pluginUUID = '';
        this.registerEvent = '';
        this.init();
    }
    init() {
        // Stream Deck passes connection info via command line args
        const args = process.argv.slice(2);
        if (args.length >= 4) {
            this.port = parseInt(args[0]);
            this.pluginUUID = args[1];
            this.registerEvent = args[2];
            // args[3] is info JSON
            // args[4] is additional info
        }
        this.connect();
    }
    connect() {
        const ws = new ws_1.default(`ws://localhost:${this.port}`);
        this.ws = ws;
        ws.on('open', () => {
            console.log('Connected to Stream Deck');
            this.register();
        });
        ws.on('message', (data) => {
            const event = JSON.parse(data.toString());
            this.handleEvent(event);
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
        ws.on('close', () => {
            console.log('Disconnected from Stream Deck');
        });
    }
    register() {
        if (this.ws) {
            const json = {
                event: this.registerEvent,
                uuid: this.pluginUUID
            };
            this.ws.send(JSON.stringify(json));
        }
    }
    async handleEvent(event) {
        console.log('Event:', event.event);
        switch (event.event) {
            case 'keyDown':
                await this.handleKeyDown(event);
                break;
            case 'willAppear':
                await this.handleWillAppear(event);
                break;
            case 'sendToPlugin':
                await this.handleSendToPlugin(event);
                break;
        }
    }
    async handleKeyDown(event) {
        const settings = event.payload?.settings;
        if (settings?.uid) {
            console.log(`Executing macro: ${settings.label || settings.uid}`);
            await this.executeMacro(settings.uid, settings.param);
        }
        else {
            console.log('No macro configured for this button');
            this.showAlert(event.context);
        }
    }
    async handleWillAppear(event) {
        // Optionally refresh macro list when button appears
        console.log('Button appeared:', event.context);
    }
    async handleSendToPlugin(event) {
        const payload = event.payload;
        if (payload?.msg === 'refreshmacrolist') {
            console.log('Refreshing macro list...');
            const groups = await this.getMacroList();
            this.sendToPropertyInspector(event.context, { groups });
        }
    }
    async executeMacro(uid, param) {
        try {
            await km_helper_1.KeyboardMaestroHelper.executeMacro(uid, param);
            console.log('Macro executed successfully');
        }
        catch (error) {
            console.error('Failed to execute macro:', error);
        }
    }
    async getMacroList() {
        try {
            const groups = await km_helper_1.KeyboardMaestroHelper.getMacroList();
            return groups;
        }
        catch (error) {
            console.error('Failed to get macro list:', error);
            return [];
        }
    }
    sendToPropertyInspector(context, payload) {
        if (this.ws) {
            const json = {
                event: 'sendToPropertyInspector',
                context: context,
                payload: payload
            };
            this.ws.send(JSON.stringify(json));
        }
    }
    showAlert(context) {
        if (this.ws) {
            const json = {
                event: 'showAlert',
                context: context
            };
            this.ws.send(JSON.stringify(json));
        }
    }
}
// Start the plugin
new KeyboardMaestroPlugin();
