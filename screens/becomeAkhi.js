import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, TextInput, Alert, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import {Picker} from '@react-native-picker/picker';

import firestore from '../db/firebase';
import { setDoc, doc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window')

export default function ContactScreen () {

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [occupation, setOccupation] = useState("none")
    const [institution, setInstitution] = useState("")
    const [isSubmitPressed, setIsSubmitPressed] = useState(false);
    const [val, setIsVal] = useState(false);
    const [wasWrong, setWasWrong] = useState(false); 
    const [isSent, setIsSent] = useState(false);
    const [displayInd, setDisplayInd] = useState(false)
    
    const nameTextInput = (x) => {
        setName(x.replace(/[0-9-#*;,.<>"'!@$%^&()?:+_=`~\{\}\[\]\\\/]/g,''));
    }

    const numberTextInput = (x) => {
        setNumber(x.replace(/[^0-9+]/g,''));
    }

    const institutionTextInput = (x) => {
        setInstitution(x.replace(/[0-9-#*;,.<>"'!@$%^&()?:+_=`~\{\}\[\]\\\/]/g,''));
    }

    const GreenBox = () => {
        return(
            <View style={{justifyContent:"center",alignItems:"center", marginTop:height*0.05}}>
                <View style={{backgroundColor:"#A0FF91", width:width*0.7, height:height*0.1, borderRadius:11, flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
                <AntDesign name="checkcircleo" size={24} color="white" />
                </View>
            </View>
        )
    }

    const RedBox = () => {
        return(
            <View style={{justifyContent:"center",alignItems:"center", marginTop:height*0.05}}>
                <View style={{backgroundColor:"#F66394", width:width*0.7, height:height*0.1, borderRadius:11, flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
                    <Feather name="alert-circle" size={24} color="white" />
                    <Text style={{color:"white", fontSize:20}}> | </Text>
                    <Text style={{color:"white", fontSize:15}}> Please Fill the Fields Properly </Text>
                </View>
            </View>
        )
    }

    const RedBox2 = () => {
        return(
            <View style={{justifyContent:"center",alignItems:"center", marginTop:height*0.05}}>
                <View style={{backgroundColor:"#F66394", width:width*0.7, height:height*0.1, borderRadius:11, flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
                    <Feather name="alert-circle" size={24} color="white" />
                    <Text style={{color:"white", fontSize:20}}> | </Text>
                    <Text style={{color:"white", fontSize:15}}> Please Select An Occupation </Text>
                </View>
            </View>
        )
    }

    const LastCheck = () => {
        if(isSubmitPressed){  //turn isSubmitPressed to false after calling the function to send data to database, which can then return greenbox(if isSumbitPressd is false otherwise GreenBox will remain even after trying to submit another time, where it can collide with green box)
            if(occupation == "none") {
                return ( setWasWrong(true),
                        <RedBox2 />
                    )
            }
            else if(!name || !number || !institution){
                return ( setWasWrong(true),
                        <RedBox/>
                        )
            }
            else{
                return (
                    setIsSent(false),
                    send(),
                    null
                ) //return null here, so red box disappears when everything is fine. Green box returned when sent to db (remeber the chosen process)
            }
        }
        else{
            if(isSent){
                return <GreenBox/>
             }
             else{
                 return null
             }
        }
    }   

    const send = async () => {
        
        if(val == false && wasWrong == true){
            setIsSubmitPressed(false);
            setIsVal(true);
            return null;
        } else{
            try  { 
                return (
                setDisplayInd(true),
                await setDoc(doc(firestore, "become_Akhi", name + "_" + Math.ceil( Math.random() * 10000 ).toString()), {
                    name: name,
                    number: number,
                   occupation: occupation,
                   institution:institution,
                  }),
                setIsSubmitPressed(false),
                setIsSent(true),
                clearInput(),
                setDisplayInd(false),
                Alert.alert("Form Recieved" , "You will be contacted" )
                )   
            } catch {
                Alert.alert("Error Occured!", "Please Try again in a while. If Problem persists, contact and report")
            }
        }
    }

    const clearInput = () => {
        return (
            setName(""),
            setNumber(""),
            setOccupation("none"),
            setInstitution("")
        )
    }


    if (displayInd == false){
        return(
            <ScrollView style={styles.container} bounces={false}>
            <View style={styles.container}>
                <View style={{alignItems:"center", marginTop:height*0.04}}> 
                    <View style={{height:height*0.2, width:width*0.85, borderColor:"black", borderWidth:2, backgroundColor:"transparent", borderRadius:9 , justifyContent:"center", alignItems:"center" }}>
                        <Text style={{fontSize:18, fontWeight:"bold", borderBottomColor:"grey", borderBottomWidth:1, marginBottom:height*0.02}}>Help Us Achieve Our Aim!</Text>
                        <Text style={{fontSize:15}} > Become An Akhi By Joining Hands With Us</Text>
                    </View>
                </View>
                <View style={{}}>
                    {<LastCheck/>}
                    <View style={{marginHorizontal:width*0.09,marginTop:height*0.07, }}>
                    <Text style={{fontSize:16}}>Your Name:</Text>
                    </View>
                    <TextInput style={{width:width*0.68, height: height*0.06 ,marginTop:0, marginHorizontal:width*0.1, borderBottomWidth:1, borderBottomColor:"black"}} 
                                placeholder="Name"
                                value={name} 
                                onChangeText={nameTextInput} 
                                maxLength={40} />
                    
                    <View style={{marginHorizontal:width*0.09,marginTop:height*0.07, }}>
                    <Text style={{fontSize:16}}>Your Number:</Text>
                    </View>
                    <TextInput keyboardType="numeric" style={{width:width*0.68, height: height*0.06 ,marginTop:0, marginHorizontal:width*0.1, borderBottomWidth:1, borderBottomColor:"black"}} 
                                placeholder="Number" 
                                value={number}
                                onChangeText={numberTextInput}
                                maxLength={14} />
                </View>
                <View style={{marginHorizontal:width*0.09,marginTop:height*0.07, }}>
                    <Text style={{fontSize:16}}>Occupation:</Text>
                </View>
                <View style={{marginHorizontal:width*0.1}}>
                    <Picker style={{width:width*0.68}} selectedValue={occupation} mode="dropdown" onValueChange={(value)=>{setOccupation(value)}} >
                        <Picker.Item label="None" value="none" />
                        <Picker.Item label="School" value="school" />
                        <Picker.Item label="College" value="college" />
                        <Picker.Item label="University" value="University" />
                        <Picker.Item label="Started Professional Life" value="profession" />
                    </Picker>
                    <View style={{borderBottomColor:"black",borderBottomWidth:1, width:width*0.68}} />
                </View>
    
                <View style={{marginHorizontal:width*0.09,marginTop:height*0.07, }}>
                    <Text style={{fontSize:16}}>Institution:</Text>
                </View>
                    <TextInput style={{width:width*0.68, height: height*0.06 ,marginTop:0, marginHorizontal:width*0.1, borderBottomWidth:1, borderBottomColor:"black"}} 
                                placeholder="Name of Institution"
                                value={institution} 
                                onChangeText={institutionTextInput} 
                                maxLength={40} />
    
                <TouchableOpacity style={{justifyContent:"center",alignItems:"center", marginTop:height*0.06, marginBottom:height*0.06}} onPress={()=>{setIsSubmitPressed(true)}}>
                    <View style={{width:width*0.7, height:height*0.08, backgroundColor:"transparent", borderColor:"black" , borderWidth:1 , borderRadius:8, justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"black", fontSize:15, fontWeight:"bold"}}> SUBMIT </Text>
                    </View>
                </TouchableOpacity>
            
            </View>
            </ScrollView>
        )
    } else {
        return(
            <View style={{backgroundColor:"white",flex:1, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large" color="black" />
                <Text style={{fontSize:16, marginTop:20,fontWeight:"bold"}}>Please Wait</Text>
            </View>
        )

    }

    }

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        flex:1
    }
})