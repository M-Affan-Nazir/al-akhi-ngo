import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableWithoutFeedback, View } from "react-native" ;

import { Entypo } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen';
import Onboarding from '../screens/onboarding';
import DonateScreen from '../screens/Donate';
import ContactScreen from '../screens/Contact';
import BecomeAkhi from '../screens/becomeAkhi';
import AboutUs from '../screens/aboutUs';
import Leadership from '../screens/leadership';
import LocateScreen from '../screens/locate';
import Honor from '../screens/honor';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerIcon = (x) => {
    return (
        <View style={{marginRight:20}}>
        <TouchableWithoutFeedback onPress={()=> x.nav.toggleDrawer()}>
            <Entypo name="menu" size={24} color="black" />
        </TouchableWithoutFeedback>
        </View>
    )
}


const HomeStack = () => {

    const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(null);

    useEffect(async ()=> {
        const appStoredData = await AsyncStorage.getItem("isFirstLaunch")   //async and await very important here
        if(appStoredData == null){
            setIsAppFirstLaunch(true)
            AsyncStorage.setItem("isFirstLaunch", "false")
        }else{
            setIsAppFirstLaunch(false); 
        }
    }, [])

    return(
        isAppFirstLaunch != null && (
                <Stack.Navigator>
                    {isAppFirstLaunch == true && (
                        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:false}} />
                    )} 
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={
                                        ({navigation})=> ({  title:"Home" , headerLeft : ()=> <DrawerIcon nav={navigation} /> })} />
                    <Stack.Screen name="Donate" component={DonateScreen} />
                    <Stack.Screen name="Contact" component={ContactScreen} />
                </Stack.Navigator>   
        )
   )
}


const AkhiStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="becomeAkhi" component={BecomeAkhi} options={
                                        ({navigation})=> ({  title:"Volunteer Form" , headerLeft : ()=> <DrawerIcon nav={navigation} /> })} />
        </Stack.Navigator>
    )
}

const AboutUsStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="aboutUs" component={AboutUs} options={
                                        ({navigation})=> ({  title:"About Us" , headerLeft : ()=> <DrawerIcon nav={navigation} /> })} />
        </Stack.Navigator>
    )
}

const LeadershipStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="leadership" component={Leadership} options={
                                        ({navigation})=> ({  title:"Leadership" , headerLeft : ()=> <DrawerIcon nav={navigation} /> })} />
        </Stack.Navigator>
    )
}

const LocateStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="locate" component={LocateScreen} options={
                                        ({navigation})=> ({  title:"Locate" , headerLeft : ()=> <DrawerIcon nav={navigation} /> })} />
        </Stack.Navigator>
    )
}

const HonorStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="honor" component={Honor} options={
                                        ({navigation})=> ({  title:"Board of Honor" , headerLeft : ()=> <DrawerIcon nav={navigation} /> })} />
        </Stack.Navigator>
    )
}

const DrawerNav = () => {
    return(
        <NavigationContainer >
        <Drawer.Navigator screenOptions={{ swipeEdgeWidth:-10 }}>
            <Drawer.Screen name="Home" component={HomeStack} options={{ headerShown: false}} />
            <Drawer.Screen name="Become Akhi" component={AkhiStack} options={{ headerShown: false}} />
            <Drawer.Screen name="Locate" component={LocateStack} options={{ headerShown: false}} />
            <Drawer.Screen name="Our Leadership" component={LeadershipStack} options={{ headerShown: false}} />
            <Drawer.Screen name="Board of Honor" component={HonorStack} options={{ headerShown: false}} />
            <Drawer.Screen name="About Us" component={AboutUsStack} options={{ headerShown: false}} />
        </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNav