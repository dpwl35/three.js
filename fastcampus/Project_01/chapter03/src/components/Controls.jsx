import { OrbitControls } from "@react-three/drei";
{
  /* Drei로 컴포넌트화 된 OrbitControls */
  // PointerLockControls : fps 게임같은 카메라
  // FlyControls
  // 댐핑옵션 : 회전살짝 유지됨
  // enableDamping
  //     dampingFactor={0.03}
  //     autoRotate
  //     maxPolarAngle={Math.PI / 2}
}
export const Controls = () => {
  return <OrbitControls />;
};
