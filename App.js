// import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import News from './screens/News';
import RootNavigation from './navigation/navigation';
import { useEffect, useRef, useState } from 'react';
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { appVersionsCol } from './firebase';
import {version as app_version}  from './package.json';
import { Update } from './components/Update';


export default function App() {
  const [update, setUpdate] = useState(false)

    useEffect(() => {
      const q = query(appVersionsCol, where("version", "==", app_version));
        // getDocs(q).then(snapshot => {
        //   console.log(snapshot.docs)
        //   snapshot.docs.forEach(doc => {
        //     console.log(doc.data())
        //   })
        // })

        onSnapshot(q, (snapshot) => {
          console.log(snapshot.docs.length)
          if(snapshot.docs.length === 0)
            setUpdate(true)
          else
            setUpdate(false)
          // snapshot.docs.forEach((doc) => {
          //   console.log(doc.data())
          // })
        })



        
        
    }, [])
  return update?<Update />:<RootNavigation />
    // <SafeAreaView style={styles.container}>
    //   <News />
      

    //   {/* <StatusBar style="auto" /> */}
    // </SafeAreaView>
  
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
// });


