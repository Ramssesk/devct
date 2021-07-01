import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
            AsyncStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case LOGIN_EXITOSO:
            AsyncStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO: 
            return {
                ...state,
                autenticado: true,
                usuario: action.payload, 
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            AsyncStorage.removeItem('token');
            return {
                ...state,
                mensaje: action.payload, 
            }        
        default:
            return state;
    }
}