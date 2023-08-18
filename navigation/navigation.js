import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import News from '../screens/News';
import Details from '../screens/Details';
import BottomTabs from './BottomTabs';

 export default function RootNavigation() {
    const Stack = createStackNavigator();
    const screenOptions = {
        headerShown: false,
    }
  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="BottomTabs" component={BottomTabs}/>
              {/* <Stack.Screen name="News" component={News}/> */}
              <Stack.Screen name="Details" component={Details}/>
         </Stack.Navigator>
      </NavigationContainer>
  )
}