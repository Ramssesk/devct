import {  StyleSheet, Alert } from 'react-native';
import React, {useState, useContext} from 'react'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, H1, H2, H3, H4, Left, Body, Input, Right, Grid, Col} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'
import PedidoContext from '../context/pedidos/pedidosContext'


const NuevaOrden = ({ route, navigation }) => {

  const producto  = route.params.producto 
  const {_id, nombre, categoria, descripcion, mobile, imagen, precio} = producto 
  const { setPedido } = useContext(PedidoContext)
 
  let [cantidad, setCantidad] = useState(1)
  let [subTotal, setSubTotal] = useState( parseFloat(cantidad) *  parseFloat(precio.$numberDecimal) )
  const handleCantidad = typeAction => {
    if(typeAction === "mas"){
      cantidad = cantidad + 1
      setCantidad(cantidad)
    }
    else{
      cantidad = cantidad - 1
      cantidad < 0 ? cantidad = 0 : null
      setCantidad(cantidad)
    }
    setSubTotal( parseFloat(cantidad) *  parseFloat(precio.$numberDecimal) )
  }
  
  const handleConfirmar = () => {
    Alert.alert(
      'Desea agregar el pedido a la orden?',
      'Podras modificar el pedido si lo desea', 
      [
        {
          text: 'Confirmar',
          onPress: () => {
            const subPedido = { cantidad, subTotal, nombre, imagen, descripcion, precio, _id }
            setPedido(subPedido)
            navigation.navigate('Menu')
          },
        },
        {
          text: 'Cancelar'
        }
      ]
    )
  }
  return ( 
        <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: imagen}} />
                <Body>
                  <H2>{nombre}</H2>
                  <Text>Precio: ${precio.$numberDecimal}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Thumbnail source={{uri: mobile}} style={{height: 200, width: '90%', flex: 1}}/>
            </CardItem>
            <CardItem>
                <Text>{categoria}</Text>
            </CardItem>
            <CardItem>
              <Text>{descripcion}</Text>
            </CardItem>
            <CardItem>
              <Grid style={{marginTop: '5%', marginBottom: '5%', marginLeft: '20%', width:'25%'}}>
                <Col style={ styles.colCenter}>
                  <Button large bordered success onPress={() => handleCantidad('menos')}><Text>-</Text></Button>
                </Col>
                <Col style={ styles.colCenter}>
                  <Input style={{ textAlign: 'center', fontSize: 20, marginRight: 40 }}
                                value={cantidad.toString() }
                                keyboardType="numeric"/>
                </Col>
              <Col style={ styles.colCenter}>
                <Button large bordered success onPress={() => handleCantidad('mas')}><Text>+</Text></Button>
              </Col>
              </Grid>
            </CardItem>
          </Card>
        </Content>
        
          <H2 style={{marginTop:'5%', marginBottom: '5%'}}>Subtotal: ${subTotal}</H2>
          <Button 
            success 
            style={{width:'75%',marginLeft:'12.5%', marginTop:'5%', marginBottom: '5%', justifyContent: 'center'}}
            onPress={handleConfirmar}  
          >
            <Text style={{fontSize:15, fontWeight:'bold', color:'#fff'}}>Ordenar Producto </Text>
          </Button>
        
      </Container>
     );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnConfirmar: {
    position: 'relative',
    marginLeft: '25%',
    marginTop: '20px'
  },
  colCenter: {
    justifyContent: "center",
    alignItems: "center",
    width:'30%',
  }

});
 
export default NuevaOrden;