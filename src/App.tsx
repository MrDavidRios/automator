import { useEffect, useState } from 'react';
import { Action } from './Action';
import { EventType, OperationType } from './ActionTypes';
import ActionsDisplay from './components/ActionsDisplay';
import { StartupToggle } from './components/StartupToggle';
import { triggerOperations } from './performOperations';
import { loadActions, saveActions } from './saveData';

export function App() {
  const loadedActions = loadActions();

  window.Main.initShell(handleOutput, 10000);

  // triggerOperations(loadedActions, EventType.OnStartup);

  function handleOutput(output: any) {}

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

  return (
    <div id="mainWrapper">
      <header>
        <h1>Automator</h1>
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
