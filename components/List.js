import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ramdomize } from "../utils";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => {
   
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={()=>navigation.navigate("SearchResults", {name})}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        {/* <Text style={styles.details}>{details}</Text> */}
      </View>

    </TouchableOpacity>
   
)};
// the filter
const List = ({ searchPhrase, setCLicked, data, inputRef, storeInfos, setData, setFocus}) => {

    // const [store, setStore] = useState(dataDefault)
  const [color, setColor] = useState(new Array(data.length).fill({
    backgroundColor: 'white',
    color: 'grey'
  }))

//   console.log(storeInfos)

// console.log(data.length)
    // const [backgroundColor, setBackgroundColor] = useState()
    
  const renderItem = ({ item, index }) => {
    // when no input, show all
    // if (searchPhrase === "") {
    //   //return <Item name={item.name} details={item.details} />;
    // //   <Item name={item.name}  />;
    // return <Text>Bonjour</Text>
    // }

    // if (searchPhrase !== "") {
    // // if (item.toUpperCase().startsWith(searchPhrase.toUpperCase()))
    // // if (item.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")))
    // // if (item[0].toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")))
    //     // return <Text>{item[0]}</Text>
    //     if(index < 10)
    //     return <Text>{item.replace('&#039;', "'")}</Text>
    // }
    // filter of the name
    // if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
    //   //return <Item name={item.name} details={item.details} />;
    // //   return <Item name={item.name}  />;

    // }
    // filter of the description
    // if (item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
    //   //return <Item name={item.name} details={item.details} />;
    //   return <Item name={item.name} />;
    // }
    // if (searchPhrase === "")
    if(index < 10)
    return color?<View style={{...styles.result, backgroundColor: color[index].backgroundColor}}
    onTouchStart={() => {
        // setCLicked(false);
        // setBackgroundColor('red')

        setColor([...Array(index).fill({
            backgroundColor: 'white',
            color: 'grey'
          }), {
            backgroundColor: '#f2f2f2',
            color: 'grey'
          }, ...Array(color.length - index).fill({
            backgroundColor: 'white',
            color: 'grey'
          })])

        console.log(item, index)
        inputRef.current.blur();

        let data = storeInfos.filter(val => val.category.some(v => v.toLowerCase().includes(item.toLowerCase())) || val.title.toLowerCase().includes(item.toLowerCase()) ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        ramdomize(data)
        // console.log(data)
        setData(data)

        setFocus(focus => focus.map(v => 0))
        // setSearchPhrase("");
    }}>
        <Feather name="search" size={13} color="grey" />
        {/* <Text style={styles.text}>{searchPhrase === ""?item[0]:item.replace(/&#039;/g, "'")}</Text> */}
        <Text style={{...styles.text, color: color[index].color}}>{item.replace(/&#039;/g, "'")}</Text>
    </View>:<></>
  };

//   console.log(searchPhrase)
//   console.log([...new Set(data.map(v => v.category))])

// console.log('r')

// console.log(data.filter(v => v[1].nb > 1).length)
// data.filter(v => v[1].nb > 3)
// console.log(dataDefault.map(v => v[0]))
  return (
    <SafeAreaView style={styles.list__container}>
      <View
        // onStartShouldSetResponder={() => {
        //   setCLicked(false);
        // }}
      >
        <FlatList
        //data={searchPhrase === ""?dataDefault:[...new Set(data.map(v => v.category))].filter(v => v.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, "")))}
        // data={searchPhrase === ""?dataDefault.map(v => v[0]):[...new Set(data.map(v => v.category))].filter(v => v.split(' ').some(v => v.toUpperCase().startsWith(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) )}
        // data={searchPhrase === ""?dataDefault:data.filter(v => v[1].nb > 1)}
        data={data}

          renderItem={renderItem}
          //keyExtractor={(item) => item.id}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    // margin: 10,
    height: "85%",
    width: "100%",
    backgroundColor: "white"
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
   // fontStyle: "italic",
  },
  result: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 10,
    padding: 10,
    // borderWidth: 1
  },
  text: {
    fontSize: 20,
    // color: "grey",
  }
});