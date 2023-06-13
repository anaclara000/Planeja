import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Routes from './src/components/routes';
import Promotores from './src/pages/Promotores/Promotores';
import PerfilPromotor from './src/pages/PerfilPromotor/PerfilPromotor';
import Parcerias from './src/pages/Parcerias/Parcerias';
import Convidado from './src/pages/SouConvidado/SouConvidado';
import DetalhesEvento from './src/pages/Eventos/ConferirModal/ConferirModal';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Routes}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false,
            headerLeft: null
          }} />

        <Stack.Screen name="Promotores" component={Promotores}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false,
            headerLeft: null
          }} />

        <Stack.Screen name="PerfilPromotor" component={PerfilPromotor}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false,
            headerLeft: null
          }} />

        <Stack.Screen name="Parcerias" component={Parcerias}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false,
            headerLeft: null
          }} />

        <Stack.Screen name="Convidado" component={Convidado}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false,
            headerLeft: null
          }} />

        <Stack.Screen name="DetalhesEvento" component={DetalhesEvento}
          options={{
            title: '',
            headerTransparent: true,
            headerShow: false,
            headerLeft: null
          }} />


      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
