/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

//  const isDarkMode = useColorScheme() === 'dark';
// const backgroundStyle = {
//   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// };

import React, {useEffect} from 'react';
import { getBreaches } from './src/NetworkManager';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BreachesList from './src/Breaches/BreachesList';
import { RootStackParamList } from './src/NavigationTypes';
import store from './src/Store';
import { observer } from "mobx-react-lite"

import {
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Theme } from './src/Types';
import BreachDetails from './src/Breaches/BreachDetails';

/**
 * 'NavigationContainer'
 * is a component which manages our navigation tree and contains the navigation state.
 * This component must wrap all navigators structure.
 * Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const App = observer( () => {
  const isDeviceThemeDark = useColorScheme() === 'dark'
  let isDark = store.settingsStore.theme === Theme.Dark;
  if(store.settingsStore.theme === Theme.Auto) {
    isDark = isDeviceThemeDark;
  }

  return (
    <SafeAreaProvider>
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="BreachesList" // sets the 'TopList' to be render first in the navigation
        screenOptions={{headerTransparent: false, statusBarStyle: isDark ? 'light' : 'dark'}}
         // 'screenOptions' sets options for all screens in the navigator, in case
        //we want the same options for everyone.
      >
        <Stack.Screen name="BreachesList" 
        component={BreachesList}
        options={{
          headerTintColor: isDark ? 'white' : 'black',
          headerStyle: {
            backgroundColor: isDark ? 'black' : 'white',
          },
        }}
        />
        <Stack.Screen
          name="BreachDetails"
          component={BreachDetails}
          options={({route}) => ({
            title: route.params?.Title,
            headerTintColor: isDark ? 'white' : 'black',
            headerStyle: {
              backgroundColor: isDark ? 'black' : 'white',
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
   </SafeAreaProvider>
  )
});

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
