import {
    WS_ADD_PRODUCTO,
    WS_EXISTENCIA,
    GET_PRODUCTOS,
    WS_GET_PRODUCTO,
    NUEVA_ORDEN,
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO,
    SET_PEDIDO,
    SET_CANCELAR_PEDIDO
} from '../../types'

export default (state,action) => {
    switch (action.type) {
        case WS_ADD_PRODUCTO:
            return {
                ...state,
                productos: [...state.productos, action.payload]
            }
        case WS_EXISTENCIA:
            return {
                ...state,
                productos: state.productos.filter( producto => producto._id !== action.payload )
            }
        case WS_GET_PRODUCTO:
            return {
                ...state,
                productos: action.payload
            }
        case GET_PRODUCTOS:
            return {
                ...state,
                productos: action.payload
            }
        case SET_PEDIDO:
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        case SET_CANCELAR_PEDIDO:
            return {
                ...state,
                pedido: []
            }
        // case CONFIRMAR_ORDENAR_PLATILLO:
        //     return {
        //         ...state,
        //         pedido: [...state.pedido, action.payload]
        //     }
        // case MOSTRAR_RESUMEN:
        //     return {
        //         ...state,
        //         total: action.payload
        //     }
        // case ELIMINAR_PRODUCTO:
        //     return {
        //         ...state,
        //         pedido: state.pedido.filter( articulo => articulo.id !== action.payload )
        //     }
        // case PEDIDO_ORDENADO:
        //     return {
        //         ...state,
        //         pedido: [],
        //         total: 0,
        //         idpedido: action.payload
        //     }
        default:
            return state;
    }
}