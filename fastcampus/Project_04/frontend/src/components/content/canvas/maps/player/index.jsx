import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Player() {
  const ref = useRef(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return (
    <Box ref={ref} position-y={0.5}>
      <meshBasicMaterial color={0xffff00} />
    </Box>
  );
}
