import { Button } from "react-native";
import { View } from "react-native";

export function Update(){
    return (
        <View>
            <Button title="UPDATE" />
        </View>
    )
}

const styles = StyleSheet.create({
    update: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  