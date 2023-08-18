import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import WebView from "react-native-webview";

export default function Details({route}) {

    const navigation = useNavigation();

    const {title, image, pubDate, link, description, html} = route.params.item;
    const [loaded, setLoaded] = useState(true);
    const [refresh, setRefresh] = useState(false);

    // console.log(html)

    return(
        <View style={styles.container}>
            {/* <Text style={styles.title}>{title}</Text>
            <Image style={styles.image} source={{uri: image}} />  */}
            <View style={styles.header}>
                <View style={styles.header1}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <AntDesign name="arrowleft" size={30} color="white" style={styles.arrowLeft} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refreshContainer} onPress={() => {
                        setRefresh(true)
                    }}>
                        <Text style={styles.refresh}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            
            {/* <MaterialCommunityIcons name="arrow-left-bold" size={34} color="grey" style={styles.arrowLeft}/> */}
            </View>
            {loaded && 
            // <ActivityIndicator
            //     size="large"
            // />
            <View style={styles.loading}><Image style={{ width: 100, height: 100 }} source={require('../assets/loading.gif')} /></View>
            }
            {/* <WebView 
            style={{ opacity: 0.99, overflow: 'hidden' }}
            // style={{flex: 1}}
            originWhitelist={['*']}
            // source={{html: '<h1>Bonjour<h1/>'}}
            // source={{html: '<div>'+description+'</div'}}
            // source={{uri: link}}
            source={refresh?{uri: link}:{html: html}}
            // source={loaded?{html: html}:{uri: link}}
            // javaScriptEnabled={false}

            onLoad={() => setLoaded(false)}
            /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 3,
        flex: 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "white"
    },
    header: {
        // height: 80,
        backgroundColor: "#bc1823",
        // borderWidth: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        padding: 10
    },
    header1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 1,
        width: "100%",
        paddingHorizontal: 15,
    },
    arrowLeft: {
        paddingTop: 10,
        paddingBottom: 10
    },
    title: {
        fontSize: 25
    },
    image: {
        width: '90%', 
        height: '60%', 
        borderWidth: 10,
        borderColor: "red"
    },
    refreshContainer: {
        backgroundColor: '#560216',
        padding: 8,
        paddingHorizontal: 17,
        borderRadius: 20
    },
    refresh: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#d9d9d9',
        
    },
    loading: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
  });