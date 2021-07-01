import React,{useContext, useEffect} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PedidoContext from '../context/pedidos/pedidosContext'


const DisplayAnImageWithStyle = () => {
  const {obtProductos, productos} = useContext(PedidoContext)

    obtProductos()

  console.log(productos[0].mobile)

    return (
        <View style={styles.container}>
      <Image
          source={{uri:productos[0].imagen}}
        style={{
          height: 100,
          width: 200
        }}
        /> 
    </View>
  );
}

const styles = StyleSheet.create({

      container: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        textAlign: "center"
    },
    stretch: {
      width: 50,
      height: 200,
      resizeMode: 'stretch',
    },
});

export default DisplayAnImageWithStyle;