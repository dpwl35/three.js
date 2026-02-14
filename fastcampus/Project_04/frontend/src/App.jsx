import { ClientSocketControls } from './components/utilComponents/ClientSocketControls';
import { RecoilRoot } from 'recoil';
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
