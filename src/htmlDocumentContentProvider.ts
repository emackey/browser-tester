'use strict';
import { readFileSync } from 'fs';
import { ExtensionContext, TextDocumentContentProvider, EventEmitter, Event, Uri } from 'vscode';

export class HtmlDocumentContentProvider implements TextDocumentContentProvider {
    private _onDidChange = new EventEmitter<Uri>();
    private _mainHtml: string;

    constructor(context: ExtensionContext) {
        this._mainHtml = readFileSync(context.asAbsolutePath('pages/sample.html'), 'UTF-8');
    }

    // Instructions to open Chrome DevTools on the HTML preview window:
    //
    // 1. With the HTML preview window open, click Help->Toggle Developer Tools.
    //    Note that this DevTools is docked and is only for VSCode itself.
    //
    // 2. In the Console tab, paste this line:
    //    document.body.querySelector('webview').getWebContents().openDevTools();
    //
    // 3. You now have a second DevTools, the new one is un-docked.  Close the
    //    old docked one.
    //
    // 4. In the top of the Console tab of the remaining un-docked DevTools,
    //    click the pull-down and change "top" to "_target (webview.html)".
    //    Now you can debug the HTML preview in the sandboxed iframe.

    public provideTextDocumentContent(uri: Uri): string {
        return this._mainHtml;
    }

    get onDidChange(): Event<Uri> {
        return this._onDidChange.event;
    }

    public update(uri: Uri) {
        this._onDidChange.fire(uri);
    }
}
