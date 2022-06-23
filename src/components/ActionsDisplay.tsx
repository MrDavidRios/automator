import { Action } from '../Action';
import { ActionElement } from './ActionElement';

const ActionsDisplay = ({ actions, addAction, deleteAction, modifyAction }: { actions: Action[]; addAction: Function; deleteAction: Function; modifyAction: Function }) => {
  return (
    <div id="actionsDisplay" draggable="false" className="shadow">
      <div>
        {actions.length > 0 ? (
          actions.map((action, idx) => <ActionElement key={idx} idx={idx} action={action} deleteAction={deleteAction} modifyAction={modifyAction} />)
        ) : (
          <p id="noActionsText">No actions added. Press the plus button to add one!</p>
        )}
      </div>
      <div>
        <div id="addActionBtn" className="shadow-lg" onClick={() => addAction()}>
          <i className="bi bi-plus"></i>
        </div>
      </div>
    </div>
  );
};

export default ActionsDisplay;
