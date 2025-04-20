## 프로젝트 구조 만들기  

✔️ 오브젝트는 클래스 구조로 반복 생성  
✔️ 각자 .body를 갖고 Cannon Body와 연결  
✔️ Physics 클래스에서 add()와 update()로 중앙관리  

```javascript
[ Game.js ]
this.scene = new THREE.Scene();           // 씬 생성
this.world.currentScene = this.scene;     // 씬을 World에 등록

[ World.js ]
this.currentScene_ = this.scene;          // 씬 저장

[ Renderer.js ]
this.render(this.currentScene, this.camera); // 씬 + 카메라로 그리기
```

📁src  
├── 📁core  
│   └── World.js             // World 클래스: 카메라, 렌더러, 씬 관리 및업데이트  
│  
├── 📁scenes  
│   └── 📁game  
│       ├── Game.js          // Game 클래스: 씬 생성, 모델 추가, 루프 실행  
│       ├── 📁models  
│       │   └── Floor.js     // 바닥 모델 생성 클래스  
│       └── 📁tools  
│           └── Light.js     // 조명(light) 설정 클래스  
│  
├── 📁utils  
│   ├── Camera.js            // PerspectiveCamera 확장 클래스 (컨트롤 포함)  
│   ├── EventEmitter3.js     // resize 이벤트 감지 및 분배용 커스텀 이벤트 시스템  
│   ├── Renderer.js          // WebGLRenderer 확장 클래스 (씬/카메라 렌더링)  
│   └── Sizer.js             // 창 크기 저장 및 resize 이벤트 발생  
│  
└── app.js                   // 프로젝트 진입점: Game 인스턴스 생성 및 실행  

