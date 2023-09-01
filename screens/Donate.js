import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

export default function DonateScreen(){
    return(
        <ScrollView style={styles.container}>
        <View style={styles.container}>
            <View style={{marginTop: height*0.03, alignItems:"center"}}>
                <Text style={{fontSize:27,}}>Donation Methods</Text>
                <View style={{borderTopColor:"black",borderBottomWidth:1, width:width*0.61,borderRadius:6 }} />
            </View>
            <View style={{marginTop:height*0.05, justifyContent:"center",alignItems:"center"}}>
                <View style={{borderBottomColor:"grey",borderBottomWidth:3,width:width*0.9, marginBottom:height*0.03}} />
                    <View style={{flexDirection:"row"}}>
                        <MaterialCommunityIcons style={{marginVertical:3.5}} name="bank-outline" size={20} color="black" />
                        <Text style={{fontSize:19,textAlign:"center",lineHeight:height*0.035, fontWeight:"bold", marginHorizontal:7}}>Telenor MicroFinance Bank</Text>
                    </View>
                    <View >
                        <Text> Payment Method : EasyPaisa</Text>
                        <Text>Account Number: 03475164623</Text>
                    </View>
                    <View style={{borderBottomColor:"grey",borderBottomWidth:3,width:width*0.9, marginBottom:height*0.03, marginTop:height*0.03}} />
                    <View style={{flexDirection:"row"}}>
                        <MaterialCommunityIcons style={{marginVertical:3.5}} name="bank-outline" size={20} color="black" />
                        <Text style={{fontSize:19,textAlign:"center",lineHeight:height*0.035, fontWeight:"bold", marginHorizontal:7}}>Mobilink MicroFinance Bank</Text>
                    </View>
                    <View >
                        <Text> Payment Method : JazzCash</Text>
                        <Text>Account Number: 03475164623</Text>
                    </View>
                    <View style={{borderBottomColor:"grey",borderBottomWidth:3,width:width*0.9, marginBottom:height*0.03,marginTop:height*0.03}} />
                    <View style={{flexDirection:"row"}}>
                        <AntDesign style={{marginVertical:3.5}} name="customerservice" size={20} color="black" />
                        <Text style={{fontSize:19,textAlign:"center",lineHeight:height*0.035, fontWeight:"bold", marginHorizontal:7}}>Contact Us for Further Assistance</Text>
                    </View>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1
    }
})