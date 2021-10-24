import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import screen1 from './screens/screen1';
import screen2 from './screens/screen2';

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={screen1} />
        <RootStack.Screen name="screen2" component={screen2} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
