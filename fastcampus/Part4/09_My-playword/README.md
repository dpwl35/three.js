## cannon-es 물리엔진 사용하기

```javascript
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
```

SAP = Sweep And Prune  
CANNON.SAPBroadphase  가장 보편적으로 사용되는 충돌을 감지하는 알고리즘  

CANNON에서 제공하는 Material은 THREE.js와 조금 차이가 있다. CANNON에서는 물체의 마찰력과, 탄성의 정도를 설정할 수 있다. 