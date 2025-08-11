# r3f 최적화 알아보기

## instancing

Mesh를 화면에 표현할 때 WebGL은 GPU로 **각 Mesh마다 한 번씩 드로우 콜(draw call)**을 보낸다.
instancing 방식을 사용하면 수많은 mesh 수에 상관없이 한번에 드로우 콜로 해당 작업을 수행해 성능이 좋아진다.
