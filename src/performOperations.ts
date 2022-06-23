import { Action } from './Action';
import { EventType, OperationType } from './ActionTypes';

export function performOperation(action: Action) {
  switch (action.operation) {
    case OperationType.GoToLink:
      if (action.operationLink !== undefined) window.Main.openLink(action.operationLink);
      break;
    case OperationType.OpenApp:
      if (action.operationFilePath !== undefined) window.Main.openLink(action.operationFilePath);
      break;
    case OperationType.OpenFile:
      if (action.operationFilePath !== undefined) window.Main.openLink(action.operationFilePath);
      break;
  }
}

export function triggerOperations(actions: Action[], eventType: EventType) {
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].event === eventType) performOperation(actions[i]);
  }
}
