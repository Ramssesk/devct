import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import AlertaContext from './alertaContext';

import { MOSTRAR_ALERTA, BORRAR_ALERTA} from '../../types';

const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    // Funciones
    const setAlerta = (msg, categoria) => {
        dispatch({
            type:  MOSTRAR_ALERTA,
            payload: {
                msg, 
                categoria
            }
        })
    }

    const unSetAlerta = () => {
        dispatch({
            type: BORRAR_ALERTA
        })
    }

    return (
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                setAlerta
            }}
        > 
            {props.children}
        </AlertaContext.Provider>
    )
}

export default AlertaState;