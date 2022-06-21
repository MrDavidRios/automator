import { ActionElement } from './components/Action';

import './styles/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  window.Main.initShell(handleOutput, 10000);

  function handleOutput(output: any) {}

  return (
    <div id="mainWrapper">
      <ActionElement />
    </div>
  );
}

/**
 * Colors:
 * - background: #fcfcfc
 * - slighly darker grey: #efefef
 * - accent: #a898d7
 */
