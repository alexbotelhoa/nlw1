import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
// import Points from './pages/Points';
// import Details from './pages/Details';

const AppStack = createStackNavigator();

export default function Routes() {
   return (
      <NavigationContainer>
        <AppStack.Navigator 
            screenOptions={{ 
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#f0f0f5'
                }
            }}
        >
            <AppStack.Screen name="Home" component={Home} />
            {/* <AppStack.Screen name="Points" component={Points} /> */}
            {/* <AppStack.Screen name="Details" component={Details} /> */}
        </AppStack.Navigator>
      </NavigationContainer>
   );
}
