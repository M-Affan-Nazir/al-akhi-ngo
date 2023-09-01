import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, TextInput, Alert, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { setDoc, doc } from 'firebase/firestore';
import firestore from '../db/firebase';

const { width, height } = Dimensions.get('window')

export default function ContactScreen () {

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [message, setMessage] = useState("")
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

    const messageTextInput = (x) => {
        setMessage(x);
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

    const LastCheck = () => {
        if(isSubmitPressed){
            if(!name || !number || !message){
                return( 
                        setWasWrong(true),
                        setIsSent(false),
                        <RedBox/>
                      )
            }
            else if(name || number || message){
                return (
                        setIsSent(false),
                        send(),
                        null
                        )
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
           try{
                return (
                    setDisplayInd(true),
                    await setDoc(doc(firestore, "contact", name + "_" + Math.ceil( Math.random() * 10000 ).toString()), {
                        name: name,
                        number: number,
                        message : message
                    }),
                    setIsSubmitPressed(false),
                    setIsSent(true),
                    clearInput(),
                    setDisplayInd(false),
                    Alert.alert("Form Recieved" , "You will be contacted" )
                )   
            } catch{
                Alert.alert("Error Occured!", "Please Try again in a while. If Problem persists, contact and report")
            }
        }
    }

    const clearInput = () => {
        return (
            setName(""),
            setNumber(""),
            setMessage("")
        )
    }

    if (displayInd == false){
        return(
            <ScrollView style={styles.container}>
            <View style={styles.container}>
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
                
                    <View style={{marginHorizontal:width*0.09,marginTop:height*0.07, }}>
                    <Text style={{fontSize:16}}>Your Message:</Text>
                    </View>
                    <TextInput style={{width:width*0.68, height: height*0.06 ,marginTop:0, marginHorizontal:width*0.1, borderBottomWidth:1, borderBottomColor:"black"}} 
                                placeholder="Type your message here" 
                                multiline={true} 
                                value={message}
                                onChangeText={messageTextInput} 
                                maxLength={350} />
                </View>
                <TouchableOpacity style={{justifyContent:"center",alignItems:"center", marginTop:height*0.06}} onPress={()=>{setIsSubmitPressed(true)}}>
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