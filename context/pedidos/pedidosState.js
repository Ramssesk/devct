import React, { useReducer } from 'react';
import _ from 'lodash'

import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';

import {
    WS_EXISTENCIA,
    WS_ADD_PRODUCTO,
    WS_GET_PRODUCTO,
    GET_PRODUCTOS,
    SET_PEDIDO,
    SET_CANCELAR_PEDIDO,
    SET_ORDEN
} from '../../types'

import cx from '../../config/axios';
import ws from '../../config/websocket';

const PedidoState = props => {

    const initialState = {
        productos: [],
        pedido: [],
        ordenes: [],
    }

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);
    
    ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
        ws.send(JSON.stringify('holo'))
    };
    
    ws.onmessage = (e) => {
        const res = JSON.parse(e.data) 
        console.log(res)
        switch (res.action) {

            case 'getNewProducto':
                let productos = state.productos
                productos.push(e.data)
                productos = _.sortBy(productos, 'categoria')
                dispatch({
                    type: WS_GET_PRODUCTO,
                    payload: productos
                })
                break;
            
            case 'existenciaProducto':
                dispatch({
                    type: WS_EXISTENCIA,
                    payload: res.id
                })
                console.log(productos)
                break;

            case 'addProducto':
                dispatch({
                    type: WS_ADD_PRODUCTO,
                    payload: res.producto[0]
                })
                break;
            case 'setOrden':
                dispatch({
                    type: SET_ORDEN,
                    payload: res.producto[0]
                })
                break;
            default:
                break;
        }
    };

    const obtProductos = async () => {
        try {
            const res = await cx.get('/api/mobile')

            let productos = res.data
            productos = _.sortBy(productos, 'categoria')
            dispatch({
                type: GET_PRODUCTOS,
                payload: productos
            })

        } catch (error) {
            console.log(error)
        }
    }

    const setPedido = subPedido =>{
        dispatch({
            type: SET_PEDIDO,
            payload: subPedido
        })
    }

    const setCancelarPedido = () => {
        dispatch({
            type: SET_CANCELAR_PEDIDO,
        })        
    }
    
    const setOrden = (pedido) => {
        console.log(pedido)
        try {
            const req = {
                type: 'setOrdenPrincipal',
                data: {
                    orden: pedido
                }
            }
            ws.send(JSON.stringify(req))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                productos: state.productos,
                obtProductos,
                setPedido,
                setCancelarPedido,
                setOrden
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidoState;