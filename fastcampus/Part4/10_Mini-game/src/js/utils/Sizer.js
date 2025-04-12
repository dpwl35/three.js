import { SEventEmitter } from './EventEmitter3.js'

export class Sizer {
    width_ = 0;
    height_ = 0;
  
    get width() {
      return this.width_;
    }
  
    get height() {
      return this.height_;
    }
  
    constructor() {
      this.width_ = window.innerWidth;
      this.height_ = window.innerHeight;
      this.eventEmitter = SEventEmitter;
  
      window.addEventListener("resize", () => this.resize());
    }
  
    resize() {
      this.width_ = window.innerWidth;
      this.height_ = window.innerHeight;
      this.eventEmitter.resize();
    }
  }
  