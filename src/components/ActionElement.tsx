import { useEffect, useState } from 'react';
import { Action } from '../Action';
import ContextMenuDropdown from './ContextMenuDropdown';
import Dropdown from './Dropdown';
import { EventType, OperationType } from '../ActionTypes';
import FileUpload from './FileUpload';

const events = ['Startup', 'App Open', 'App Close', 'App Focus'];
const actions = ['Open App', 'Open File', 'Go to Link'];

export const ActionElement = ({
  idx,
  action,
  deleteAction,
  modifyAction,
}: {
  idx: number;
  action: Action;
  deleteAction: Function;
  modifyAction: Function;
}) => {
  const [_action, updateAction] = useState(action);

  let stateFinished = false;

  useEffect(() => {
    stateFinished = true;
  });

  function dropdownChanged(type: string, val: number) {
    if (type === 'operation') {
      _action.operation = val;
    } else if (type === 'event') {
      _action.event = val;
    }

    updateAction(_action);
    modifyAction(_action, idx);
  }

  const correctedAction = stateFinished ? _action : action;

  console.log();

  return (
    <div className="action shadow-sm">
      <p>On</p>
      <Dropdown options={events} selected={correctedAction.event} type="event" callback={dropdownChanged} />
      {correctedAction.event === EventType.OnAppOpen ||
      correctedAction.event === EventType.OnAppClose ||
      correctedAction.event === EventType.OnAppFocus ? (
        <FileUpload action={correctedAction} type="event" idx={idx} updateAction={updateAction} modifyAction={modifyAction} />
      ) : null}

      <i className="bi bi-arrow-right" style={{ fontSize: 24 }}></i>
      <Dropdown options={actions} selected={correctedAction.operation} type="operation" callback={dropdownChanged} />
      {correctedAction.operation === OperationType.OpenFile || correctedAction.operation === OperationType.OpenApp ? (
        <FileUpload action={correctedAction} type="operation" idx={idx} updateAction={updateAction} modifyAction={modifyAction} />
      ) : null}
      <ContextMenuDropdown idx={idx} callback={deleteAction} />
    </div>
  );
};
