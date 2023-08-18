import { Button, Pressable, StyleSheet, Text } from "react-native";
import { View } from "react-native";

export function Update(){
    return (
        <View>
            <Pressable style={styles.update} onPress={() => {} }>
            <Text style={styles.text}>UPDATEdfhhffhfhfhfhfhfh</Text>
            </Pressable>
        </View>
        
    )
}

const styles = StyleSheet.create({
    update: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
       color: "red"
    },

  });
  
  