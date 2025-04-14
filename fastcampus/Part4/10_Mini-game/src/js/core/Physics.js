import * as CANNON from "cannon-es";

export class Physics extends CANNON.World {
    constructor() {
        super();  

        this.gravity = new CANNON.Vec3(0, -9.82, 0);  //중력
        this.broadphase = new CANNON.SAPBroadphase(this); //충돌
        this.allowSleep = true;  //정지된 물체는 충돌검사 x 물리 시물레이션 제외
    }

    add(...bodies) { //모든 body world 추가 
        bodies.forEach((body) => this.addBody(body));
    }

    update(...models) {
        this.step(1 / 60); //60 프레임

        models.forEach((model) => {
            if(model.body) {
                model.position.copy(model.body.position);
                model.quaternion.copy(model.body.quaternion);
            }
        })
    }
}

export const SPhasics = new Physics();