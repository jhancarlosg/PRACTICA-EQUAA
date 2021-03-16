const { SET_ALERT, ADD_LAST_LOCAL_REGISTRO, SET_LOCAL_REGISTRO } = require("./types")

const initialState = {config: {
        lastRegistros: 5
    }, last_registros: []
}

const appReducers = (state = initialState, action) => {
    const extras = {};
    switch(action.type) {
        case SET_ALERT:
            extras.alert = !action.msg ? null : {msg: action.msg, variant: action.variant};
            return {...state, alert: extras.alert}
        case ADD_LAST_LOCAL_REGISTRO:
            //last_registros = [...last_registros];
            if (state.last_registros.length>=state.config.lastRegistros) {
                state.last_registros.splice(-1, 1, action.registro);
            } else {
                state.last_registros.unshift(action.registro);
            }
            state.last_registros.sort((a, b)=>{
                if (a.id<b.id) return 1;
                if (a.id>b.id) return -1;
                return 0
            })
            return {...state, last_registros: [...state.last_registros]}

        case SET_LOCAL_REGISTRO:
            return {...state, last_registros: action.registros||[]}
        default: 
            return state;
    }
}

export default appReducers