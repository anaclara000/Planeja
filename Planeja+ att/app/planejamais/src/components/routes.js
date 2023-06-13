import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput } from 'react-native';


import Home from '../pages/HomePage/HomePage'
import Eventos from '../pages/Eventos/Eventos'
import Parcerias from '../pages/Parcerias/Parcerias'
import Promotores from '../pages/Promotores/Promotores'

const Tab = createBottomTabNavigator();

export default function Routes({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarStyle: ({ focused, color, size }) => {
                    style: {
                        background: 'black'
                    }
                },

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    }


                    if (route.name === 'Promotores') {
                        iconName = focused
                            ? 'ios-compass'
                            : 'ios-compass-outline';
                    }

                    if (route.name === 'Parcerias') {
                        iconName = focused
                            ? 'ios-compass'
                            : 'ios-compass-outline';
                    }

                    if (route.name === 'Eventos') {
                        iconName = focused
                            ? 'ios-calendar'
                            : 'ios-calendar-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#212124',
                tabBarInactiveTintColor: 'grey',
            })}>


            <Tab.Screen name="Home"
                component={Home}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            />

            <Tab.Screen name="Promotores"
                component={Promotores}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            />

            <Tab.Screen name="Parcerias"
                component={Parcerias}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            />
            
            <Tab.Screen name="Eventos"
                component={Eventos}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            />



        </Tab.Navigator>
    )
}
