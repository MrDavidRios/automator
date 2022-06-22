import { Action } from './Action';

function getSaveFilePath(filename: string): string {
  const globals = global.location.search;
  return `${globals.substring(globals.indexOf('=') + 1)}\\${filename}`;
}

export function saveActions(actions: Action[]) {
  const path = getSaveFilePath('actions.json');

  try {
    console.log('Saving: ', JSON.parse(JSON.stringify(actions)));
    window.Main.writeFile(path, JSON.stringify(actions));
  } catch (err) {
    console.error(err);
  }
}

export function loadActions(): Action[] {
  const path = getSaveFilePath('actions.json');

  try {
    const output = window.Main.readFile(path);

    return JSON.parse(JSON.parse(output));
  } catch (err) {
    return [];
  }
}
