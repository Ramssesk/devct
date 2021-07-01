import React, { useState, useContext, useEffect } from 'react'
import { View } from 'react-native'
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import globalStylesTwo from '../styles/globalTwo';

import AlertaContext from '../context/alertas/alertaContext';
import AuthContext from '../context/auth/authContext';

const Login = () => {

    const alertasContext = useContext(AlertaContext);
    const { alerta, setAlerta } = alertasContext;
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    const navigation = useNavigation()

    useEffect(() => {
        if(autenticado) {
            navigation.navigate('NuevaOrden')
        }

        if(mensaje) {
            setAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado]);

    
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    

    // Cuando el usuario quiere iniciar sesión
    const handleSubmit = () => {
        console.log(email,pwd)
        iniciarSesion({ 'correo':email, 'contra': pwd })
        if(alerta){
            console.log(alerta)
            // alerta.msg.errores.reverse()
            // alerta.msg.errores.map(error => {
            //     // console.log(error.msg)
            //     Toast.show({
            //         text: error.msg,
            //         buttonText: 'Okay',
            //         // type: "danger",
            //         textStyle: { color: "yellow"},
            //         duration: 3000,
            //         position: "bottom"
            //     })
            // })
        }
    }

    return ( 
        <Container style={ [ globalStylesTwo.contenedor,  { backgroundColor: '#e84347' }]}>
            <View style={globalStylesTwo.contenido}>
                <H1 style={globalStylesTwo.titulo}>UpTask</H1>

                <Form>
                    <Item inlineLabel last style={globalStylesTwo.input} >
                        <Input 
                            autoCompleteType="email"
                            placeholder="Email"
                            onChangeText={txt => setEmail(txt.toLowerCase())}
                            name="email"
                        />
                    </Item>
                    <Item inlineLabel last style={globalStylesTwo.input} >
                        <Input 
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={txt => setPwd(txt)}
                            name="pwd"
                        />
                    </Item>
                </Form>

                <Button
                    square
                    block
                    style={globalStylesTwo.boton}
                    onPress={() => handleSubmit() }
                >
                    <Text
                        style={globalStylesTwo.botonTexto}
                    >Iniciar Sesión</Text>
                </Button>

                {/* <Text 
                    onPress={ () => navigation.navigate("CrearCuenta") }
                    style={globalStylesTwo.enlace}
                >Crear Cuenta</Text> */}

                <Text 
                    onPress={ () => navigation.navigate("Menu") }
                    style={globalStylesTwo.enlace}
                >Nuerva Orden</Text>
            </View>
        </Container>
     );
}
 
export default Login;