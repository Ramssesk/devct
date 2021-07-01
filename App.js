import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './views/Login';
import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';
import Prueba from './views/Prueba';
import Payments from './views/Payments';

import BotonResumen from './components/ui/BotonResumen';

import PedidoState from './context/pedidos/pedidosState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';

import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StripeProvider
        publishableKey="pk_test_51IEPIuB8zchurVJ64WzG5ggrrZG2nI6zqmT3iIkI5fEgAgStr6INy5rJVi8pIscOilEpOdHS4DTf0lM3WiwR15yB00mP0fD2oG"
      >
    <AuthState>
      <PedidoState>
      <AlertaState>
      <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#e84347'
                }, 
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerTintColor: '#000'
              }}
            >
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    title: ""
                  }}
                />

                <Stack.Screen
                  name="NuevaOrden"
                  component={NuevaOrden}
                  options={{
                    title: "Nueva Orden"
                  }}
                />

                <Stack.Screen
                  name="Menu"
                  component={Menu}
                  options={{
                    title: "Nuestro Menú", 
                    headerRight: props => <BotonResumen />
                  }}
                />

                <Stack.Screen
                  name="DetallePlatillo"
                  component={DetallePlatillo}
                  options={{
                    title: "Detalle Platillo"
                  }}
                />

                <Stack.Screen
                  name="FormularioPlatillo"
                  component={FormularioPlatillo}
                  options={{
                    title: "Ordenar Platillo"
                  }}
                />

                <Stack.Screen
                  name="ResumenPedido"
                  component={ResumenPedido}
                  options={{
                    title: "Resumen Pedido"
                  }}
                />

                <Stack.Screen
                  name="ProgresoPedido"
                  component={ProgresoPedido}
                  options={{
                    title: "Progreso de Pedido"
                  }}
                />

                <Stack.Screen
                  name="Prueba"
                  component={Prueba}
                  options={{
                    title: "Prueba"
                  }}
                />

                <Stack.Screen
                  name="Payments"
                  component={Payments}
                  options={{
                    title: "Pagar"
                  }}
                />

            </Stack.Navigator>
        </NavigationContainer>
        </AlertaState>
      </PedidoState>
    </AuthState>
        </StripeProvider>
    </>
  );
};


export default App;
