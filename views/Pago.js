import React from 'react';
import React, {  useContext, useEffect } from 'react';
import {  Alert } from 'react-native';
import {
    Container,
    Content,  
    Text,
    List,
    ListItem,
    Body,
    Button,
    H2,H3,
    Footer, 
    FooterTab,
    Thumbnail
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import PedidoContext from '../context/pedidos/pedidosContext'

const Pago = () => {
    return ( 
        <H2>Pago</H2>
     );
}
 
export default Pago;