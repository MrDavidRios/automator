import { useEffect, useState } from 'react';
import { Action } from '../Action';
import ContextMenuDropdown from './ContextMenuDropdown';
import Dropdown from './Dropdown';

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

  return (
    <div className="action shadow-sm">
      <p>On</p>
      <Dropdown
        options={events}
        selected={stateFinished ? _action.event : action.event}
        type="event"
        callback={dropdownChanged}
      />
      <i className="bi bi-arrow-right" style={{ fontSize: 24 }}></i>
      <Dropdown
        options={actions}
        selected={stateFinished ? _action.operation : action.operation}
        type="operation"
        callback={dropdownChanged}
      />
      <div></div>
      <ContextMenuDropdown idx={idx} callback={deleteAction} />
    </div>
  );
};
