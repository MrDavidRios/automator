import { OperationType, EventType } from './ActionTypes';

export class Action {
  event: EventType;
  operation: OperationType;

  operationFilePath?: string;
  operationLink?: string;
  eventAppProcessName?: string;

  constructor(
    event: EventType,
    operation: OperationType,
    operationFilePath?: string,
    operationLink?: string,
    eventAppProcessName?: string
  ) {
    this.event = event;
    this.operation = operation;
    this.operationFilePath = operationFilePath;
    this.operationLink = operationLink;
    this.eventAppProcessName = eventAppProcessName;
  }
}
