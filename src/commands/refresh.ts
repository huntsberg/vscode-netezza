import BaseCommand from "../common/baseCommand";
import * as vscode from 'vscode';
import { NetezzaTreeDataProvider } from "../tree/treeProvider";
import { INode } from "../tree/INode";

export class refreshCommand extends BaseCommand {
  async run(treeNode: INode) {
    const tree = NetezzaTreeDataProvider.getInstance();
    tree.refresh(treeNode);
  }
}