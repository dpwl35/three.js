import styled from "styled-components";
import { MainCanvas } from "./components/MainCanvas";
import { RecoilRoot } from "recoil";
import { FixedDOM } from "./components/dom/FixedDOM";

// RecoilRoot  = Recoil 상태(atoms/selectors)를 앱 전체에서 사용할 수 있도록 전역 상태 컨텍스트를 제공해주는 컴포넌트

function App() {
  return (
    <RecoilRoot>
      <Wrapper>
        <MainCanvas />
        <FixedDOM />
      </Wrapper>
    </RecoilRoot>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
