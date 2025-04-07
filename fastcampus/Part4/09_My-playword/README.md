## cannon-es 물리엔진 사용하기

```javascript
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
```

SAP = Sweep And Prune  
CANNON.SAPBroadphase  가장 보편적으로 사용되는 충돌을 감지하는 알고리즘  

CANNON에서 제공하는 Material은 THREE.js와 조금 차이가 있다. CANNON에서는 물체의 마찰력과, 탄성의 정도를 설정할 수 있다. 

```javascript
/* 바닥 */
const createFloor = () => {
      const floorMaterial = new CANNON.Material({ friction: 0.1, restitution: 0.1 })

};

/* 공 */
const createSphere = () => {
    const sphereMaterial = new CANNON.Material({ friction: 0.1, restitution: 0.9 });
}
```
friction : 마찰력 / restitution : 탄성  
공의 탄성이 높다고 해도 바닥이 모래바닥이라면 공이 잘 튀지 않는다. 위처럼 두 물체간의 마찰력과 탄성을 개별적으로 설정하면 마찰력과 반발력을 계산할 때 정확하지 않은 값이 나올 수 있다. 

```javascript
const floorMaterial = new CANNON.Material('floor');
const sphereMaterial = new CANNON.Material('sphere');
const contactMaterial = new CANNON.ContactMaterial(floorMaterial, sphereMaterial, {
friction: 0.1,
restitution: 0.5
});
world.addContactMaterial(contactMaterial);
```

CANNON에서 제공하는 기능으로 결합 가능  


## cannon-es 공 이동시키기 
applyForce : 물체에 외부 힘(force)를 가하는 함수
applyImpulse : 순간적인 충격(Impulse)”을 주는 함수
```javascript
body.applyForce(force, worldPoint);
```
force : CANNON.Vec3	적용할 힘의 크기와 방향 (벡터)
worldPoint : CANNON.Vec3	힘을 가할 지점 (월드 좌표 기준)
