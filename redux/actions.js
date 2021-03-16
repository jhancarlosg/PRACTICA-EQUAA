const { SET_ALERT, ADD_LAST_LOCAL_REGISTRO, SET_LOCAL_REGISTRO } = require("./types")

export const setAlert = ({msg, variant="info"}={}) => {
    return {type: SET_ALERT, msg, variant}
}

export const addLastRegistro = (registro) => {
    return {type: ADD_LAST_LOCAL_REGISTRO, registro}
}

export const setLastRegistro = (registros) => {
    return {type: SET_LOCAL_REGISTRO, registros}
}