'use strict';
import * as vscode from 'vscode';
import { HtmlDocumentContentProvider } from './htmlDocumentContentProvider';

export function activate(context: vscode.ExtensionContext) {

    const htmlProvider = new HtmlDocumentContentProvider(context);
    const htmlRegistration = vscode.workspace.registerTextDocumentContentProvider('html-test', htmlProvider);
    context.subscriptions.push(htmlRegistration);

    context.subscriptions.push(vscode.commands.registerCommand('extension.sayHello', () => {

        const uri = vscode.Uri.parse('html-test://');

        vscode.commands.executeCommand('vscode.previewHtml', uri, vscode.ViewColumn.Two, `HTML test`)
            .then((success) => {}, (reason) => { vscode.window.showErrorMessage(reason); });

        htmlProvider.update(uri);
    }));

}

export function deactivate() {
}
