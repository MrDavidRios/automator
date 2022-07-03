import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Action } from './Action';
import { EventType, OperationType } from './ActionTypes';
import ActionsDisplay from './components/ActionsDisplay';
import { StartupToggle } from './components/StartupToggle';
import { triggerOperations } from './performOperations';
import { loadActions, saveActions } from './saveData';

export function App() {
  const loadedActions = loadActions();

  const processNames: string[] = loadedActions.map(a => a.eventAppProcessName ?? '').filter(a => a !== '');

  window.Main.initShell(handleOutput, processNames, 1000);

  const [actions, setActions] = useState(loadedActions);
  const [autoStartup, setAutoStartup] = useState(window.Main.autoStartupStatus());

  function modifyAction(action: Action, idx: number) {
    const newArr = [...actions];
    newArr[idx] = action;
    setActions(newArr);
  }

  function addAction() {
    setActions([...actions, new Action(EventType.OnAppOpen, OperationType.GoToLink)]);
  }

  function deleteAction(actionIdx: number) {
    setActions(actions.filter((_action, idx) => idx !== actionIdx));
  }

  useEffect(() => {
    saveActions(actions);
  });

  let storedProcesses: string[];
  function handleOutput(output: any) {
    if (storedProcesses !== undefined) {
      console.log(output);

      const closedProcesses = _.difference(storedProcesses, output);

      for (let i = 0; i < closedProcesses.length; i++) {
        const relevantActions = actions.filter(action => action.eventAppProcessName === closedProcesses[i]);

        triggerOperations(relevantActions, EventType.OnAppClose);
      }

      const openedProcesses = _.difference(output, storedProcesses);

      for (let i = 0; i < openedProcesses.length; i++) {
        const relevantActions = actions.filter(action => action.eventAppProcessName === openedProcesses[i]);

        triggerOperations(relevantActions, EventType.OnAppOpen);
      }
    }

    storedProcesses = [...output];
  }

  return (
    <div id="mainWrapper">
      <header>
        <div>
          <i className="bi bi-gear"></i>
          <h1>Automator</h1>
        </div>
        <StartupToggle enabled={autoStartup} callback={setAutoStartup} />
      </header>

      <ActionsDisplay actions={actions} addAction={addAction} deleteAction={deleteAction} modifyAction={modifyAction} />
    </div>
  );
}

/**
 * Colors:
 * - background: #fcfcfc
 * - slighly darker grey: #efefef
 * - accent: #a898d7
 */
