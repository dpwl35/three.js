import { RecoilRoot } from 'recoil';
import { MainCanvas } from './components/content/canvas/MainCanvas';
import { ClientSocketControls } from './components/utilComponents/ClientSocketControls';
import { socket } from './sockets/clientSocket';
import { Content } from './components/content/Content';

function App() {
  return (
    <RecoilRoot>
      <Content />
      <ClientSocketControls />
    </RecoilRoot>
  );
}

export default App;
