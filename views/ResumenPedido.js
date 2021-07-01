import React, {  useContext, useState } from 'react';
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

const ResumenPedido = () => {

    const navigation = useNavigation()
    const { pedido, setCancelarPedido, setOrden } = useContext(PedidoContext)

    const handleCancelar = () => {
        setCancelarPedido()
        navigation.navigate('Menu')
    }

    const handleSetOrdren = () => {
        suma += suma * .16
        pedido.map(p => p.total = suma)
        setOrden(pedido)
        navigation.navigate('Payments')
    }
    let suma = 0

    return ( 
        <Container>
            <Content>
                <List>
                    {pedido.map((data, index) => {

                    const {_id, nombre, descripcion, imagen, precio} = data
                    suma += data.subTotal

                    return (
                    <ListItem key={index}>
                        <Thumbnail large square source={{uri: imagen}}/>
                        <Body>
                            <Text>{nombre}</Text>
                            <Text note numberOfLines={3}>
                                {descripcion}
                            </Text>
                            <Text>Precio: ${precio.$numberDecimal}</Text>
                        </Body>       
                    </ListItem>
                    )})}
                </List>
            </Content>
                <H2 style={{marginLeft:'25%',width:'50%',marginTop:'5%', marginBottom: '5%'}}>Total: ${suma}</H2>
                <H3 style={{marginLeft:'25%',width:'50%',marginTop:'5%', marginBottom: '5%'}}>IVA: ${(suma * .16).toFixed(2)}</H3>
                <Footer>
                    <FooterTab>
                        <Button danger onPress={handleCancelar}>
                            <Text style={{fontSize:15, fontWeight:'bold', color:'#fff'}}>Cancelr</Text>
                        </Button>
                        <Button success onPress={() => handleSetOrdren()}>
                            <Text style={{fontSize:15, fontWeight:'bold', color:'#fff'}}>Pagar</Text>
                        </Button>
                    </FooterTab>
                </Footer>
        </Container>
     );
}
 
export default ResumenPedido;