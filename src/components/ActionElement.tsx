import { useEffect, useState } from 'react';
import { Action } from '../Action';
import ContextMenuDropdown from './ContextMenuDropdown';
import Dropdown from './Dropdown';
import { EventType, OperationType } from '../ActionTypes';
import FileUpload from './FileUpload';

const events = [
  { text: 'Startup', enabled: false },
  { text: 'App Open', enabled: true },
  { text: 'App Close', enabled: true },
];
const actions = [
  { text: 'Open App', enabled: true },
  { text: 'Open File', enabled: true },
  { text: 'Go to Link', enabled: true },
];

export const ActionElement = ({ idx, action, deleteAction, modifyAction }: { idx: number; action: Action; deleteAction: Function; modifyAction: Function }) => {
  const [_action, updateAction] = useState(action);

  let stateFinished = false;

  useEffect(() => {
    stateFinished = true;
  });

  function dropdownChanged(type: string, val: number) {
    if (type === 'operation') {
      _action.operation = val;

      _action.operationFilePath = undefined;
    } else if (type === 'event') {
      if (!(appRelatedEvent(_action.event) && appRelatedEvent(val))) _action.eventAppProcessName = undefined;

      _action.event = val;
    }

    updateAction(_action);
    modifyAction(_action, idx);
  }

  const correctedAction = stateFinished ? _action : action;

  return (
    <div className="action shadow-sm">
      <p>On</p>
      <Dropdown options={JSON.stringify(events)} selected={correctedAction.event} type="event" callback={dropdownChanged} />
      {correctedAction.event === EventType.OnAppOpen || correctedAction.event === EventType.OnAppClose ? (
        <FileUpload action={correctedAction} type="event" idx={idx} updateAction={updateAction} modifyAction={modifyAction} />
      ) : null}

      <i className="bi bi-arrow-right" style={{ fontSize: 24 }}></i>
      <Dropdown options={JSON.stringify(actions)} selected={correctedAction.operation} type="operation" callback={dropdownChanged} />
      {correctedAction.operation === OperationType.OpenFile || correctedAction.operation === OperationType.OpenApp ? (
        <FileUpload action={correctedAction} type="operation" idx={idx} updateAction={updateAction} modifyAction={modifyAction} />
      ) : null}
      {correctedAction.operation === OperationType.GoToLink ? (
        <div>
          <input
            className="form-control"
            id="urlInput"
            aria-describedby="emailHelp"
            placeholder="http://website.com"
            value={correctedAction.operationLink}
            onChange={e => {
              const modifiedAction: Action = { ...action, operationLink: e.target.value };

              updateAction(modifiedAction);
              modifyAction(modifiedAction, idx);
            }}
          />
        </div>
      ) : null}
      <ContextMenuDropdown idx={idx} callback={deleteAction} />
    </div>
  );
};

function appRelatedEvent(event: EventType): boolean {
  return event === EventType.OnAppClose || event === EventType.OnAppOpen;
}
