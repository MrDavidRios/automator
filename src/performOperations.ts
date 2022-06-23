import { Action } from './Action';
import { EventType, OperationType } from './ActionTypes';

export function performOperation(action: Action) {
  console.log(action);

  switch (action.operation) {
    case OperationType.GoToLink:
      if (action.operationLink !== undefined) {
        const containsHttp = action.operationLink.includes('http://');

        window.Main.openLink(containsHttp ? action.operationLink : 'http://' + action.operationLink);
      }
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
