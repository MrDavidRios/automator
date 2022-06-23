import _ from 'lodash';

const { exec } = require('child_process');

const DEFAULT_INTERVAL = 10000;

// eslint-disable-next-line no-undef
let processListUpdateInterval: NodeJS.Timer;
export function initShellOnTimer(callback: Function, processes: string[], interval = DEFAULT_INTERVAL): void {
  if (processListUpdateInterval !== undefined) clearInterval(processListUpdateInterval);

  processListUpdateInterval = setInterval(() => initShell(callback, processes), interval);
}

/**
 * Changes the time interval between the updating of the process list.
 * @param callback
 * @param newInterval - milliseconds
 */
export function changeTimerInterval(callback: Function, processes: string[], newInterval: number) {
  clearInterval(processListUpdateInterval);

  processListUpdateInterval = setInterval(() => initShell(callback, processes), newInterval);
}

async function initShell(callback: Function, processes: string[]) {
  let data = await runExec();

  data = data.split('\n').filter((e: string) => e.includes('.'));

  const processNames = _.uniqWith(
    data.map((e: string) => e.split(' ')[0]),
    _.isEqual
  ).filter((e: string) => processes.includes(e));

  callback(processNames);
}

function runExec(): Promise<any> {
  return new Promise((resolve, reject) => {
    exec('wmic process get ProcessId,Caption', (error: any, stdout: any, stderr: any) => {
      if (error) reject(error);

      resolve(stdout || stderr);
    });
  });
}
