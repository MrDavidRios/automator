import { contextBridge, ipcRenderer } from 'electron';
import { changeTimerInterval, initShellOnTimer } from '../src/childProcess';

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },

  initShell: (callback: Function, interval?: number) => {
    initShellOnTimer(callback, interval);
  },

  changeInterval: (callback: Function, interval: number) => {
    changeTimerInterval(callback, interval);
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
