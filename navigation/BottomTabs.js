import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import News from '../screens/News'
import { AntDesign, Foundation } from '@expo/vector-icons'
import Website from '../screens/Website'

const Tab = createBottomTabNavigator() 

export default function BottomTabs() {

 // const {items} = useSelector((state)=>state.cartReducer.selectedItems)

  return (

       <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: "#bc1823",
                 
              }}
           >
         <Tab.Screen 
         name = "Home" 
         component={News} 
         options ={{
           headerShown: false,
           tabBarIcon: ({color, size}) =>(

            <Foundation name="home" size={size} color={color} />
            // <Icon 
            // name="home" 
            // type="material"
            // color={color}
            // size={size}/>
           ) 
         }}
         />
          <Tab.Screen 
         name = "Search" 
         component={Website} 
         options ={{
           headerShown: false,
           tabBarIcon: ({color, size}) =>(
            <AntDesign name="contacts" size={size} color={color} />
            // <Icon 
            // name="search" 
            // type="material"
            // color={color}
            // size={size}/>
           ) 
         }}
         />
       </Tab.Navigator>
  )
}
