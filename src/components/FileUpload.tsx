import { Action } from '../Action';
import { OperationType } from '../ActionTypes';
import { getFileExtension, getFilename } from '../utils/fileops';
import { Modal } from 'bootstrap';

const FileUpload = ({ action, type, idx, updateAction, modifyAction }: { action: Action; type: string; idx: number; updateAction: Function; modifyAction: Function }) => {
  const filename = type === 'operation' ? getFilename(action.operationFilePath) : action.eventAppProcessName;
  const fileExtension = getFileExtension(filename);

  const requiresExe = type === 'event' || action.operation === OperationType.OpenApp;

  return (
    <div className="file-upload">
      <input
        type="file"
        accept={requiresExe ? '.exe, .js' : '*'}
        onChange={el => {
          if (requiresExe && fileExtension !== 'exe') {
            console.log(el.target.files![0].path);

            const rejectedExtensionModal = new Modal(document.getElementById('rejectedExtensionModal') as Element);
            rejectedExtensionModal.toggle();
          } else {
            const updatedAction = {
              ...action,
              eventAppProcessName: type === 'event' ? getFilename(el.target.files![0].path) : action.eventAppProcessName,
              operationFilePath: type === 'operation' ? el.target.files![0].path : action.operationFilePath,
            };

            updateAction(updatedAction);
            modifyAction(updatedAction, idx);
          }
        }}
      />
      <p title={filename}>{filename}</p>

      <div className="modal fade" id="rejectedExtensionModal" tabIndex={-1} role="dialog" aria-labelledby="rejectedExtensionModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="rejectedExtensionModalLabel">
                Error - Invalid File Type
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  Modal.getInstance(document.getElementById('rejectedExtensionModal') as Element)!.hide();
                }}
              ></button>
            </div>
            <div className="modal-body">Only .exe files are allowed for applications.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  Modal.getInstance(document.getElementById('rejectedExtensionModal') as Element)!.hide();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
