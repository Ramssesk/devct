import {  StyleSheet, Image } from 'react-native';
import React, {Fragment, useEffect, useContext } from 'react'
import {
    Container,
    Content,
    Separator,
    Text,
    Button,
    List,
    ListItem,
    Left,
    Footer,
    FooterTab,
    Body,
    Thumbnail
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'
import PedidoContext from '../context/pedidos/pedidosContext'

const Menu = () => {

    const {obtProductos, productos} = useContext(PedidoContext)
    const navigation = useNavigation();
    
    useEffect(() => {
        obtProductos()
    }, [])

    const handleSeparator = (categoria, index) => {
        const separator = (<Separator style={styles.separador}><Text style={styles.separadorTexto}>{categoria}</Text></Separator>)
        if(index > 0) {
            const catAnterior = productos[index -1].categoria
            if(catAnterior !== categoria){
                 return separator
            }
        }
        else {
            return separator
        }

    }

    return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <List>
                    {productos.map((producto, index) => {

                    const {_id, nombre, categoria, descripcion, mobile, imagen, precio} = producto

                    return (<Fragment key={_id}>
                    {handleSeparator(categoria, index)}
                    <ListItem onPress={() => navigation.navigate('NuevaOrden', {producto})}>
                        <Image source={{uri: imagen}}  style={{width:50, height:50}}/>
                        <Thumbnail large square source={{uri: imagen}}/>
                        <Body>
                            <Text>{nombre}</Text>
                            <Text note numberOfLines={3}>
                                {descripcion}
                            </Text>
                            <Text>Precio: ${precio.$numberDecimal}</Text>
                        </Body>       
                    </ListItem>
                    </Fragment>)})}
                </List>
            </Content>
        </Container>
     );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor:'#000'
    },
    separadorTexto: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 12
    },
    buttonFooter: {
        paddingTop: 30, 
        paddingBottom:30, 
        backgroundColor:'#e84347',
        fontWeight: 'bold',
        color: '#fff'
    },
    textFooter: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 15
    }
})

export default Menu;