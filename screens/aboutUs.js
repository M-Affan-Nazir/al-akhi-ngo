import React from "react";
import {View, Text, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';

const { width, height } = Dimensions.get('window')

export default function AboutUs () {

    return(
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <Image source={require("../assets/images/logo.png")} style={{height:"35%", width: width, resizeMode:"contain"}} />
            <View style={{marginHorizontal:width*0.05}}>
                <Text style={{fontSize:18, textAlign:"center", lineHeight:18}}>  
                Al Akhi is an Aspiring NGO playing its due part in Improving the condition of the community through 
                all means possible. It envisions to provide an efficent and unified platform to the people who yearn to improve
                the condition and share a similar aim. The moto of Al-Akhi can be summarized in the following verse of the Holy Quran:
                </Text>
            </View>
            <View style={{marginHorizontal:width*0.05, marginTop:height*0.02}}>
                <Text style={{fontSize:18, textAlign:"center", lineHeight:18, fontWeight:"bold"}} >
                    "Indeed Allah will not change the condition of the people until they change what is in 
                    themselves" (Ar-Raad : 11)
                </Text>
            </View>
            <View style={{marginHorizontal:width*0.05, marginTop:height*0.02, marginBottom:height*0.08}}>
                <Text style={{fontSize:18, textAlign:"center", lineHeight:18}}>
                    Al-Akhi is being powered by the Youth of Pakistan and the
                    generous support of the Patreons. AL-Akhi continues to Provide resources to the people who
                    seek it.
                </Text>
            </View>
        </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor : "white",
        flex :1,
        justifyContent:"center",
        alignItems:"center"
    }
})