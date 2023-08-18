import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, useWindowDimensions, Text, Image, SafeAreaView, StatusBar } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function SearchBar({setCLicked, setSearchPhrase, inputRef, f, loading, setLoading}) {
    const { width, height } = useWindowDimensions();
    // const inputRef = useRef(null);
    const [arrowLeft, setArrowLeft] = useState(false)

    const [inputStyle, setInputStyle] = useState(styles.input)

    // const [loading, setLoading] = useState(false)

    // console.log(inputRef.current.isFocused())

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar
        animated={true}
        backgroundColor="#bc1823"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
            <View style={styles.container1}>
            {/* <View style={styles.logoContainer}> */}
                {/* <Image style={{ width: 30, height: 30, borderRadius: 8 }} source={require('../assets/ncm-logo.png')} /> */}
                    <Text style={styles.logo}>NCM</Text>
            {/* </View> */}
                {arrowLeft &&<TouchableOpacity onPress={()=>{
                    // setCLicked(false);
                    inputRef.current.blur();
                    setArrowLeft(false)
                    // inputRef.current.clear();
                    // setArrowLeft(false)
                    // setSearchPhrase("");
                }}>
                    <AntDesign name="arrowleft" size={24} color="white" style={styles.arrowLeft}
                                />
                </TouchableOpacity>}
                
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        placeholder='Rechercher'
                        // value={email}
                        // onChangeText={(text) => setEmail(text)}
                        // style={{width: width/2, ...inputRef.current.isFocused()?{...styles.input, textAlign: 'left', paddingLeft: 10}:styles.input}}
                
                        style={{width: width/2, ...inputStyle}}
                        // onKeyPress={handleKeyDown}
                        onChangeText={setSearchPhrase}
                        onFocus={() => {
                            // console.log('rr')
                            setCLicked(true);
                            setArrowLeft(true)
                            setInputStyle({
                                ...inputStyle,
                                textAlign: 'left',
                                paddingLeft: 10,
                            })
                          }}
                          onBlur={() => {
                            setCLicked(false);
                            inputRef.current.clear();
                            setArrowLeft(false)
                            setSearchPhrase("");
                            setInputStyle({
                                ...inputStyle,
                                textAlign:'center'
                            })
                          } }
                        />
                </View>
                {/* <AntDesign name="infocirlceo" size={17} color="white" /> */}
                {/* <Ionicons name="refresh" size={17} color="white" /> */}
                {loading?<Image style={{ width: 20, height: 20 }} source={require('../assets/Reload.gif')} />:
                <TouchableOpacity onPress={() => {
                    setLoading(true)
                    f();
                }}>
                    <Image style={{ width: 20, height: 20 }} source={require('../assets/Reloadstatic.png')} />
                </TouchableOpacity>}
                

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'red',
        backgroundColor: '#bc1823',
        // height: 80,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 11,
        paddingTop: 12,
        // justifyContent: "space-evenly"
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container1: {
        // borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        // borderWidth: 1
        fontWeight: 900,
        color: '#560216',
        // fontFamily: "Roboto"
    },
    input: {
        // textAlign: "center",
        backgroundColor: "white" ,
        // width: '80%',
        // borderRadius: 20,
        textAlign: "center",
        fontSize: 13
        // padding: 10,
        // borderWidth: 5
    },
    inputContainer: {
        // width: "80%",
        backgroundColor: "white" ,
        flexDirection: 'row',
        justifyContent: 'center',
        // width: '60%',
        width: '70%',
        // borderWidth: 5
        borderRadius: 20,
    },
    arrowLeft: {
        // marginLeft: 10,
        
    }
});