import { Action } from './Action';

function getSaveFilePath(filename: string): string {
  const globals = global.location.search;
  return `${globals.substring(globals.indexOf('C'))}\\${filename}`;
}

export function saveActions(actions: Action[]) {
  const path = getSaveFilePath('actions.json');

  try {
    window.Main.writeFile(path, JSON.stringify(actions));
  } catch (err) {
    console.error(err);
  }
}

export function loadActions(): Action[] {
  const path = getSaveFilePath('actions.json');

  try {
    console.log('Path:', path);

    const output = window.Main.readFile(path);

    console.log('Output:', output);

    return JSON.parse(JSON.parse(output));
  } catch (err) {
    return [];
  }
}
