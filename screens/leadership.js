import React,{useLayoutEffect, useState} from "react";
import {View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Image, Button, FlatList} from 'react-native';


const { width, height } = Dimensions.get('window')

import firestore from '../db/firebase';
import { collection, onSnapshot} from "firebase/firestore";

export default function Leadership () {

    let [dbData , setDbData] = useState()
    let [loaded, setLoaded] = useState(false)


      useLayoutEffect(()=>{
          if(loaded == false){
            getDb2();
          }
          setLoaded(true)
        }) 


    const getDb2 = async() => {
        await onSnapshot(collection(firestore, "leadership"), (snap)=>{
            const data = snap.docs.map(docx => docx.data())
            setDbData(data)
        })
    }



    const Card = ({item}) => {
        return (
            <View style={{width:width*0.9, height:height*0.14, borderRadius:11, bordercolor:"grey", borderWidth:1, marginVertical:10, flexDirection:"row"}} > 
                    <Image style={{height:60, width:60, borderRadius:1000, marginTop:20, marginLeft:20}} resizeMode="contain" source={{uri : item.url }} />
                    <View style={{bordercolor:"lightgrey", borderRightWidth:1, height:height*0.09, marginTop:14, marginHorizontal:14}} />
                    <View style={{justifyContent:"center"}}>
                        <Text style={{fontSize:16, fontWeight:"bold"}}>{item.name}</Text>
                        <Text style={{color:"grey", marginTop:4}}>{item.rank}</Text>
                    </View>
            </View>
        )
    }



    if(!dbData){
        return(
            <View style={{flex:1, backgroundColor:"white", alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator size="large" color="black" />
            </View>
        )
    }  else{
          return(
                  <View style={styles.container}>
                      <View style={{marginTop:15}}>
                            <FlatList 
                            data={dbData}
                            renderItem={({item}) => <Card item={item}
                            keyExtractor={(item, index) => index.toString()} />}
                            />
                      </View>
                  </View>
                )
      }  
}



const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:"white",
        alignItems:"center"
    }
})