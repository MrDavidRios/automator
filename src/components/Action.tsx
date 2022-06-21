import Dropdown from './Dropdown';
import { RightArrow } from './rightArrow';

const events = ['On Startup', 'On App Open', 'On App Close', 'On App Focus'];
const actions = ['Open App', 'Open File', 'Go to Link'];

export const ActionElement = () => {
  return (
    <div className="action">
      <p>On</p>
      <Dropdown options={actions} />
      <RightArrow size={32} />
      <Dropdown options={events} />
    </div>
  );
};

export class Action {
  event: string;
  operation: string;

  constructor(event: string, operation: string) {
    this.event = event;
    this.operation = operation;
  }
}
