const { exec } = require('child_process');

const DEFAULT_INTERVAL = 10000;

// eslint-disable-next-line no-undef
let processListUpdateInterval: NodeJS.Timer;
export function initShellOnTimer(
  callback: Function,
  interval = DEFAULT_INTERVAL
): void {
  processListUpdateInterval = setInterval(
    () => initShell(callback),
    DEFAULT_INTERVAL
  );
}

/**
 * Changes the time interval between the updating of the process list.
 * @param callback
 * @param newInterval - milliseconds
 */
export function changeTimerInterval(callback: Function, newInterval: number) {
  clearInterval(processListUpdateInterval);

  processListUpdateInterval = setInterval(
    () => initShell(callback),
    newInterval
  );
}

function initShell(callback: Function) {
  const myShellScript = exec('wmic process get ProcessId,Caption');
  myShellScript.stdout.on('data', (data: any) => {
    data = data.split('\n');

    data = data.filter((e: string) => e.includes('.'));

    const processNames = data.map((e: string) => e.split(' ')[0]);

    callback(processNames);
  });

  myShellScript.stderr.on('data', (data: any) => {
    callback(data);
  });
}
