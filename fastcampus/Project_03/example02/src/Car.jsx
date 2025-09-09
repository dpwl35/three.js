import { useControls } from "leva";
import DummyCarBody from "./dummy/DummyCarBody";
import { useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import { useRef } from "react";
import useWheels from "./utils/useWheels";
import DummyWheel from "./dummy/DummyWheel";
import { useVehicleControls } from "./utils/useVehicleControls";

const Car = () => {
  const chassisBodyValue = useControls("chassisBody", {
    width: { value: 0.16, min: 0, max: 1 },
    height: { value: 0.12, min: 0, max: 1 },
    front: { value: 0.17 * 2, min: 0, max: 1 },
  });

  const position = [0, 0.5, 0];

  let width, height, front, mass, wheelRadius;

  width = 0.16;
  height = 0.12;
  front = 0.17;
  mass = 150;
  wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [chassisBody, chassisApi] = useCompoundBody(
    () => ({
      // leva 움직였을 때 args크기가 변하지 않음 useBox로 만든 충돌체 범위는 leva로 실시간 조절 X 따로 변수만들어서씀
      //args: chassisBodyArgs,
      position,
      mass,
      rotation: [0, Math.PI, 0],
      shapes: [
        { args: chassisBodyArgs, position: [0, 0, 0], type: "Box" },
        { args: [width, height, front], position: [0, height, 0], type: "Box" },
      ],
    }),
    useRef(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    //합체
    chassisBody,
    wheelInfos,
    wheels,
  }));

  useVehicleControls(vehicleApi, chassisApi);

  return (
    <group ref={vehicle}>
      {/* 차체 */}
      <group ref={chassisBody}>
        {/* 차체 바디 */}
        <DummyCarBody
          width={chassisBodyValue.width}
          height={chassisBodyValue.height}
          front={chassisBodyValue.front}
        />
      </group>
      {/* 바퀴 */}
      <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
      <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

export default Car;
