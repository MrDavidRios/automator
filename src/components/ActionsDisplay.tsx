import { Action } from '../Action';
import { ActionElement } from './ActionElement';

const ActionsDisplay = ({
  actions,
  addAction,
  deleteAction,
  modifyAction,
}: {
  actions: Action[];
  addAction: Function;
  deleteAction: Function;
  modifyAction: Function;
}) => {
  console.log(actions);

  return (
    <div id="actionsDisplay" draggable="false" className="shadow">
      <div>
        {actions.map((action, idx) => (
          <ActionElement
            key={idx}
            idx={idx}
            action={action}
            deleteAction={deleteAction}
            modifyAction={modifyAction}
          />
        ))}
      </div>
      <div>
        <div
          id="addActionBtn"
          className="shadow-lg"
          onClick={() => addAction()}
        >
          <i className="bi bi-plus"></i>
        </div>
      </div>
    </div>
  );
};

export default ActionsDisplay;
