import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Screens from './src/constant/screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/views/Home'
import Register from './src/views/Register'
import Login from './src/views/Login'
import News from './src/views/News'
import Weather from './src/views/Weather'
import Splash from './src/views/Splash'
import Newspaper from './src/views/Newspaper'
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeScreen = () => {
  return(
    <Tabs.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === Screens.HOME) {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } 
            if (route.name === Screens.PAPER) {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }
            if (route.name === Screens.WET) {
              iconName = focused ? 'arrow-forward-circle-sharp' : 'arrow-forward-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
    >
      <Tabs.Screen name={Screens.HOME} component={Home} options={{headerShown:false, title:'Tin mới nhất',unmountOnBlur: true}}/>
      <Tabs.Screen name={Screens.PAPER} component={Newspaper} options={{title:'Tin đã xem',unmountOnBlur: true}} />
      <Tabs.Screen name={Screens.WET} component={Weather} options={{title: 'Thống tin thời tiết',unmountOnBlur: true}} />
    </Tabs.Navigator>
  );
};

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name={Screens.LOGIN} component={Login} options={{headerShown:false}} />
        <Stack.Screen name={Screens.SLP} component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name={Screens.REG} component={Register} options={{headerShown:false}}/>
        <Stack.Screen name={Screens.HOME} component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name={Screens.NEWS} component={News} />
        <Stack.Screen name={Screens.WET} component={Weather} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
    
}
export default App;