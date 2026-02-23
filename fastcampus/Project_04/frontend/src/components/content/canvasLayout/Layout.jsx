import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerAtom,
  IsLoadCompletedAtom,
  MeAtom,
} from '../../../store/PlayersAtom';
import { SideBar } from './canvasUserInterfaces/common/SideBar';

export const CanvasLayout = ({ children }) => {
  const [isLoadCompleted] = useRecoilState(IsLoadCompletedAtom);
  return (
    <Wrapper>
      {children} {isLoadCompleted && <SideBar />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;
