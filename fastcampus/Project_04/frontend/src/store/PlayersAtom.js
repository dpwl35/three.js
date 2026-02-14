import { get } from 'lodash-es';
import { atom, selector } from 'recoil';

// 모든 플레이어들
export const PlayersAtom = atom({
  key: 'PlayersAtom',
  default: [],
});

// 내 socket 정보
export const MeAtom = atom({
  key: 'MeAtom',
  default: undefined,
});

// 캐릭터 선택이 완료되었는지,
export const CharacterSelectFinishedAtom = atom({
  key: 'CharacterSelectFinishedAtom',
  default: false,
});

// 현재 선택된 캐릭터 종류
export const SelectedCharacterGlbNameIndexAtom = atom({
  key: 'SelectedCharacterGlbNameIndexAtom',
  default: 0,
});

// 현재 완료된 퀘스트 목록
export const PlayerCompletedQuestsAtom = atom({
  key: 'PlayerQuestsAtom',
  default: [],
});

// 현재 플레이어의 인벤토리
export const PlayerInventoryAtom = atom({
  key: 'PlayerInventoryAtom',
  default: [],
});

// 운동장에 배치된 오브젝트들의 경계선 정보
export const PlayGroundStructuresBoundingBoxAtom = atom({
  key: 'PlayGroundStructuresBoundingBoxAtom',
  default: [],
});

// 운동장에 배치된 오브젝트들의 경계선 꼭짓점 정보
export const PlayerGroundStructuresFloorPlaneCornersSelector = selector({
  key: 'PlayerGroundStructuresFloorPlaneCornersSelector',
  get: ({ get }) => {
    const pb = get(PlayGroundStructuresBoundingBoxAtom);
    return pb.map((item) => {
      return {
        name: item.name,
        position: item.position,
        corners: [
          {
            x: item.box.max.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
          {
            x: item.box.max.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
        ],
      };
    });
  },
});

// 초기 모델링 로드가 완료되었는가 여부
export const IsLoadCompletedAtom = atom({
  key: 'IsLoadCompletedAtom',
  default: false,
});

// 현재 있는 맵 정보
export const CurrentMapAtom = atom({
  key: 'CurrentMapAtom',
  default: 'GROUND',
});

// 현재 들어가있는 마이룸의 주인 유저 정보
export const CurrentMyRoomPlayerAtom = atom({
  key: 'CurrentMyRoomPlayerAtom',
  default: undefined,
});

// 모든 채팅 정보
export const ChatsAtom = atom({
  key: 'ChatsAtom',
  default: [],
});

// 최근 채팅 정보
export const RecentChatsAtom = atom({
  key: 'RecentChatsSelector',
  default: [],
});

// 이미 표시된 최근 채팅 정보
export const AlreadyDisplayedRecentChatsAtom = atom({
  key: 'AlreadyDisplayedRecentChatsAtom',
  default: [],
});

// 입장 공지 정보
export const EnteredPlayerNoticeAtom = atom({
  key: 'EnteredPlayerNoticeAtom',
  default: undefined,
});

// 퇴장 공지 정보
export const ExitedPlayerNoticeAtom = atom({
  key: 'ExitedPlayerNoticeAtom',
  default: undefined,
});

//  현재 배치중인 기술스택박스 이름
export const CurrentPlacingMyRoomSkillAtom = atom({
  key: 'CurrentPlacingMyRoomSkillAtom',
  default: undefined,
});

// 현재 배치중인 가구 이름
export const CurrentPlacingMyRoomFurnitureAtom = atom({
  key: 'CurrentPlacingMyRoomFurnitureAtom',
  default: undefined,
});

// 현재 배치중인 메모 정보
export const CurrentPlacingMyRoomMemoAtom = atom({
  key: 'CurrentPlacingMyRoomMemoAtom',
  default: undefined,
});

// 현재 팝업에 띄워진 메모 정보
export const CurrentSelectedMemoAtom = atom({
  key: 'CurrentSelectedMemoAtom',
  default: undefined,
});

// 현재 선택된 마이룸 내 배치된 오브젝트 정보
export const CurrentSelectedMyRoomObjectAtom = atom({
  key: 'CurrentSelectedMyRoomObjectAtom',
  default: undefined,
});

//  현재 회전중인 가구
export const CurrentRotationingMyRoomObjectAtom = atom({
  key: 'CurrentRotationingMyRoomObjectAtom',
  default: undefined,
});

// 현재 회전된 각
export const CurrentRotationAtom = atom({
  key: 'CurrentRotationAtom',
  default: undefined,
});

// 미니게임(사격게임) 관련
export const IsMiniGameStartedAtom = atom({
  key: 'IsMiniGameStartedAtom',
  default: false,
});

// 현재 미니게임이 끝났는지 여부
export const IsMiniGameClearedAtom = atom({
  key: ' IsMiniGameClearedAtom',
  default: false,
});

// 현재 맞춘 표적 수
export const HitCountAtom = atom({
  key: 'HitCountAtom',
  default: 0,
});

// 현재 남은 총알 개수
export const BulletCountAtom = atom({
  key: 'BulletCountAtom',
  default: 15,
});

// 현재 발사된 총의 남은 쿨타임
export const CoolTimeAtom = atom({
  key: 'CoolTimeAtom',
  default: undefined,
});
