//공백 검사
export const isValidText = (text) => {
  return Boolean(text && text.trim() !== '');
};

//미니캡 위치
export const calculateMinimapPosition = (originalPosition) => {
  return {
    x: 4 * originalPosition.x - 5,
    y: 4 * originalPosition.z - 5,
  };
};

//마우스 클릭 위치 → Three.js 좌표 변환
export const calculateThreePosition = ({ clientX, clientY }) => {
  return {
    x: (clientX / window.innerWidth) * 2 - 1,
    y: -(clientY / window.innerHeight) * 2 + 1,
  };
};

export const getClientPosition = ({ position, camera }) => {
  position.project(camera);

  const widthHalf = window.innerWidth / 2;
  const heightHalf = window.innerHeight / 2;
  const x = position.x * widthHalf + widthHalf;
  const y = -(position.y * heightHalf) + heightHalf;

  return { x, y };
};

export const getMyRoomObjects = (scene, currentObjectName) => {
  const myRoomObjects = [];
  scene.children.forEach((child) =>
    child.traverse((obj) => {
      if (obj.name.includes('my-room')) {
        const myRoomObject = {
          name: obj.name,
          position: [obj.position.x, obj.position.y, obj.position.z],
          rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
          authorNickname: obj.userData.authorNickname,
          text: obj.userData.text,
          timestamp: obj.userData.timestamp,
        };
        myRoomObjects.push(myRoomObject);
      }
    }),
  );
  return myRoomObjects.filter((obj) => obj.name !== currentObjectName);
};
