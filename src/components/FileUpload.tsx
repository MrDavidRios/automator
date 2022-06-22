import { Action } from '../Action';
import { OperationType } from '../ActionTypes';
import { getFileExtension, getFilename } from '../utils/fileops';
import { Modal } from 'bootstrap';

const FileUpload = ({ action, type, idx, updateAction, modifyAction }: { action: Action; type: string; idx: number; updateAction: Function; modifyAction: Function }) => {
  let filename = type === 'operation' ? getFilename(action.operationFilePath) : action.eventAppProcessName;
  let fileExtension = getFileExtension(filename);

  const requiresExe = type === 'event' || action.operation === OperationType.OpenApp;

  return (
    <div className="file-upload">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={e => {
          ((e.target as HTMLElement).nextElementSibling as HTMLElement).click();
        }}
      >
        {`Select ${requiresExe ? 'App' : 'File'}`}
      </button>
      <input
        type="file"
        className="visually-hidden"
        accept={requiresExe ? '.exe, .js' : '*'}
        onChange={el => {
          try {
            filename = getFilename(el.target.files![0].path);
            fileExtension = getFileExtension(el.target.files![0].path);
          } catch {}

          if (requiresExe && fileExtension !== 'exe') {
            const rejectedExtensionModal = new Modal(document.getElementById('rejectedExtensionModal') as Element);
            rejectedExtensionModal.toggle();
          } else {
            const updatedAction = {
              ...action,
              eventAppProcessName: type === 'event' ? filename : action.eventAppProcessName,
              operationFilePath: type === 'operation' ? el.target.files![0].path : action.operationFilePath,
            };

            updateAction(updatedAction);
            modifyAction(updatedAction, idx);
          }
        }}
      />
      <p title={filename}>{filename ?? `No ${requiresExe ? 'app' : 'file'} chosen`}</p>

      {/* Modal Window */}
      <div className="modal fade" id="rejectedExtensionModal" tabIndex={-1} role="dialog" aria-labelledby="rejectedExtensionModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="rejectedExtensionModalLabel">
                Error - Invalid File Type
              </h3>
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
