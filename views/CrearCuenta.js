import React, { useState, useContext, useEffect } from 'react'
import { View, Alert } from 'react-native'
import { Container, Button, Text, H1, Input, Form, Item, Toast} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStylesTwo from '../styles/globalTwo'

import AlertaContext from '../context/alertas/alertaContext'
import AuthContext from '../context/auth/authContext'

const CrearCuenta = () => {

    const alertasContext = useContext(AlertaContext);
    const { alerta, setAlerta } = alertasContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setpPwd] = useState('')
    const [pwdConfirm, setPwdConfirm] = useState('')

    const navigation = useNavigation();

    
    useEffect(() => {

        if(autenticado) navigation.navigate('NuevaOrden')

        if(mensaje) setAlerta(mensaje.msg, mensaje.categoria)

    }, [mensaje, autenticado]);


    const handelSubmit = () => {
        registrarUsuario({
            'nombre':nombre, 'email':email, 'pwd':pwd, 'pwdConfirm':pwdConfirm 
        })
        if(alerta){
            alerta.msg.errores.reverse()
            alerta.msg.errores.map(error => {
                // console.log(error.msg)
                Toast.show({
                    text: error.msg,
                    buttonText: 'Okay',
                    // type: "danger",
                    textStyle: { color: "yellow"},
                    duration: 3000,
                    position: "bottom"
                })
                return
            })
        }

    }

    return ( 
        <Container style={ [ globalStylesTwo.contenedor,  { backgroundColor: '#e84347' }]}>
            <View style={globalStylesTwo.contenido}>

                <H1 style={globalStylesTwo.titulo}>UpTask</H1>

                <Form>
                    <Item inlineLabel last style={globalStylesTwo.input} >
                        <Input 
                            placeholder="Nombre"
                            onChangeText={txt => setNombre(txt)}
                            name="nombre"
                        />
                    </Item>
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
                            onChangeText={txt => setpPwd(txt)}
                            name="pwd"
                        />
                    </Item>
                    <Item inlineLabel last style={globalStylesTwo.input} >
                        <Input 
                            secureTextEntry={true}
                            placeholder="Confirma tu Password"
                            onChangeText={txt => setPwdConfirm(txt)}
                            name="pwdConfirm"
                        />
                    </Item>
                </Form>

                <Button
                    square
                    block
                    style={globalStylesTwo.boton}
                    onPress={handelSubmit}
                >
                    <Text
                        style={globalStylesTwo.botonTexto}
                    >
                        CrearCuenta
                    </Text>
                </Button>

            </View>
        </Container>
     );
}
 
export default CrearCuenta;