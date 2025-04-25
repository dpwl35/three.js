import * as THREE from "three";
import * as CANNON from "cannon-es";
import { SPhasics } from '../../../core/Physics.js'

export class Player extends THREE.Mesh {
    name = 'player';
    body_ = null;

    get body() { return this.body_ };
    set body(body) {this.body_ = body };

    constructor(radius, position) {
        const geometry = new THREE.SphereGeometry(radius, 30, 30);
        const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });

        super(geometry, material);
        this.body = new PhysicsPlayer(radius, position);
        this.castShadow = true;
        this.receiveShadow = false;
    }
}

//포지션에 관련된 데이터
class PhysicsPlayer extends CANNON.Body {
    name = 'player';
    isReset = false;

    constructor(radius, position) {
        const shape = new CANNON.Sphere(radius);
        const material = new CANNON.Material({ friction: 0.1, restitution: 0.5 });

        super({ shape, material, mass: 10, position });
        this.physics = SPhasics;

        this.addKeydownEvent();
    }

    addKeydownEvent() {
        let isArrowUpPressed = false;
        let isArrowDownPressed = false;
        let isArrowLeftPressed = false;
        let isArrowRightPressed = false;
        let isSpacePressed = false;
        let isLanded = false;

        window.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowUp') isArrowUpPressed = true;
            if (event.code === 'ArrowDown') isArrowDownPressed = true;
            if (event.code === 'ArrowLeft') isArrowLeftPressed = true;
            if (event.code === 'ArrowRight') isArrowRightPressed = true;
            if (event.code === 'Space' && isLanded ) isSpacePressed = true;
        })

        window.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowUp') isArrowUpPressed = false;
            if (event.code === 'ArrowDown') isArrowDownPressed = false;
            if (event.code === 'ArrowLeft') isArrowLeftPressed = false;
            if (event.code === 'ArrowRight') isArrowRightPressed = false;
            if (event.code === 'Space') isSpacePressed = false;
        })

        this.physics.addEventListener('postStep', () => {
            if(this.isReset) return; 

            const x = isArrowLeftPressed ? -1 : isArrowRightPressed ? 1 : 0;
            const y = isSpacePressed ? 5 : 0; //질량 상관있음 
            const z = isArrowUpPressed ? -1 : isArrowDownPressed ? 1 : 0;

            if (isSpacePressed) isLanded = false;

            this.applyImpulse(new CANNON.Vec3(x, y, z));

            // if (isArrowUpPressed) {
            //     this.applyImpulse(new CANNON.Vec3(0, 0, -1));
            // } else if (isArrowDownPressed) {
            //     this.applyImpulse(new CANNON.Vec3(0, 0, 1));
            // } else if (isArrowLeftPressed) {
            //     this.applyImpulse(new CANNON.Vec3(-1, 0, 0));
            // } else if (isArrowRightPressed) {
            //     this.applyImpulse(new CANNON.Vec3(1, 0, 0));
            // } 
       
            //충돌됐을 때 호출되는 이벤트
            this.addEventListener('collide', (event) => {
                console.log(event);

                if(event.body.name === 'floor') {
                    isLanded = true;
                }
            })
        })
    }

    reset() {
        this.position.copy(this.initPosition);
        this.mass = 0;
        this.velocity.set(0, 0, 0);
        this.isReset = true;
    }
}