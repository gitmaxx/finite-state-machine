class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.currentState = config.initial;
        this.initial=config.initial;
        this.matrix=config.states;
        this.previousState=null;
        this.redoState=null;
    }
      
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        
        if (!(state in this.matrix)) {
            throw new Error(':(');
        }
        this.previousState=this.currentState;
        this.currentState = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
       
        
        
        let targetState=this.matrix[this.currentState].transitions[event];

        if (targetState === undefined) {
            throw new Error(':(');
        }
        this.previousState=this.currentState;
        this.currentState=targetState;

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState=this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        for (let key in this.matrix) {
            if ((event in this.matrix[key].transitions) || (event === undefined)) {
                result.push(key);
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousState != null) {
            this.redoState = this.currentState;
            this.currentState=this.previousState;
            this.previousState=null;
            return true;
        } else {
            return false;
        }

        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoState != null) {
            this.previousState = this.currentState;
            this.currentState=this.redoState;
            this.redoState=null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.previousState=null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
