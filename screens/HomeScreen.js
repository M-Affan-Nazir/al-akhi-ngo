import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';

import Carousel from '../components/Carousel';

const { width, height } = Dimensions.get('window')

export const Data =
        [{
                title: '', source: require("../assets/images/corousel/1.png"),
                description: "",
                id: 1

        },
        {
                title: '', source: require("../assets/images/corousel/2.png"),
                description: "",
                id: 2
        },
        {
                title: '', source: require("../assets/images/corousel/3.png"),
                description: "",
                id: 3
        },
        {
               title: '', source: require("../assets/images/corousel/4.png"),
               description: "",
               id: 4
        },
        {
                title: '', source: require("../assets/images/corousel/5.png"),
                description: "",
                id: 5
        },
        {
               title: '', source: require("../assets/images/corousel/6.png"),
               description: "",
               id: 6
        },
        {
               title: '', source: require("../assets/images/corousel/7.png"),
               description: "",
                id: 7
       },
       {
               title: '', source: require("../assets/images/corousel/e.png"),
               description: "",
               id: 8
      },]



export default function HomeScreen(x) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
    <View>
      <StatusBar style="auto" />
      <Carousel data={Data} />
      <View style={styles.line} />
    </View>
    <TouchableOpacity style={{justifyContent:"center",alignItems:"center", marginTop:height*0.06}} onPress={()=>{x.navigation.navigate("Donate")}}>
      <View style={{width:width*0.80, height:height*0.08, backgroundColor:"black", borderRadius:8, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"white", fontSize:15, fontWeight:"bold"}}> DONATE </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={{justifyContent:"center",alignItems:"center", marginTop:height*0.04}} onPress={()=>{x.navigation.navigate("Contact")}}>
      <View style={{width:width*0.80, height:height*0.08, backgroundColor:"transparent", borderColor:"black" , borderWidth:1 , borderRadius:8, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"black", fontSize:15, fontWeight:"bold"}}> CONTACT US </Text>
      </View>
    </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line : {
    borderBottomColor : "lightgrey",
    borderWidth : 1,
    marginTop : 17,
    marginHorizontal : 27,
  },
});