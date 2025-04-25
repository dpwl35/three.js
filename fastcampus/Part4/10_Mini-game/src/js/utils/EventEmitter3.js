import EventEmitter from "eventemitter3";

export class Eventermitter {
    eventEmitter = new EventEmitter();

    resize() {
        this.eventEmitter.emit('resize')
    }

    onResize(callbackFn) {
        this.eventEmitter.on('resize', callbackFn)
    }

    lose() {
        this.eventEmitter.emit('lose');
    }

    onLose(callbackFn) {
        this.eventEmitter.on('lose', callbackFn);
    }
}

export const SEventEmitter = new Eventermitter()