/**
 * Defines the abstract client
 */
import EventEmitter from 'eventemitter3';

class EE {
    eventEmitter: any;

    /**
     * Initiate the event emitter
     */
    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    /**
     * Adds the @listener function to the end of the listeners array
     * for the event named @eventName
     * Will ensure that only one time the listener added for the event
     *
     * @param {string} eventName
     * @param {function} listener
     */
    on(eventName: string, listener: any) {
        this.eventEmitter.on(eventName, listener);
    }

    /**
     * Will temove the specified @listener from @eventname list
     *
     * @param {string} eventName
     * @param {function} listener
     */
    removeEventListener(eventName: string, listener: any) {
        this.eventEmitter.removeListener(eventName, listener);
    }

    /**
     * Will emit the event on the event name with the @payload
     * and if its an error set the @error value
     *
     * @param {string} event
     * @param {object} payload
     * @param {boolean} error
     */
    emit(event: string, payload: object, error: boolean = false) {
        this.eventEmitter.emit(event, payload, error);
    }


    /**
     * Returns the event emitter
     * Used for testing purpose and avoid using this during development
     */
    getEventEmitter(): object {
        return this.eventEmitter;
    }
}

export default new EE();