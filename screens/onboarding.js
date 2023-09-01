import React,{useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get("window")

const slides = [
    {
        id : '1',
        image : require('../assets/images/dove.png'),
        title : "Peace",
        subtitle : "Let Peace Prevail amongst the Community"
    },
    {
        id : '2',
        image : require('../assets/images/olive.png'),
        title : "BrotherHood",
        subtitle : "A Forum To Provide Help To The Ones Who Seek It"
    },
    {
        id : '3',
        image : require('../assets/images/team.png'),
        title : "TeamWork",
        subtitle : "An initiative by the Youth of Pakistan to bring real difference among Lives of People"
    },

]

const Slide = ({item}) => {
    return(
        <View style={{alignItems:"center",}}>
            <Image source={item.image} style={{height:"75%", width: width, resizeMode:"contain"}} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    )
}


export default function Onboarding(x) {
    
    const [currentSlideIndex, setCurrentSlideIndex] =  useState(0);
    const slideRef = useRef(null);

    const Footer = () => {
        return(
            <View style={{height:height*0.25, justifyContent:"space-between", paddingHorizontal:20,}}>
                
                <View style={{flexDirection:"row", justifyContent : "center", marginTop : 20,}}>
                    {slides.map((_,index)=>
                    <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                        backgroundColor : "black",
                        width : 25,
                    } ]}/>
                    )}
                </View>
                
                <View style={{marginBottom : 20,}}>
                    {
                        currentSlideIndex == slides.length-1 ? 
                        <View style={{flexDirection : "row"}}>
                            <TouchableOpacity onPress={becomeAnAkhi} style={[styles.lastBtn]}>
                                <Text style={{color:"white", fontSize:13, fontWeight:"bold"}}>BECOME AN AKHI</Text>
                            </TouchableOpacity>
                        </View> 
                    : 
                        <View style={{flexDirection:"row"}}>
                             <TouchableOpacity onPress={skip} style={[styles.btn,{backgroundColor:"transparent", borderWidth : 1, borderColor : "black"}]}>
                                <Text style={{color:"black",fontSize:13, fontWeight:"bold"}}>SKIP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide} >
                                <Text style={{color:"white", fontSize:13, fontWeight:"bold"}}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                    
                    
                </View>
            </View>
        )
    }
    

    const becomeAnAkhi = () => {
        x.navigation.replace("HomeScreen")
    }

    const updateCurrentSlideIndex = (scrollData) => {
        const contentOffsetX = scrollData.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    }
    
    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if(nextSlideIndex != slides.length){
            const offset = nextSlideIndex * width
            slideRef?.current?.scrollToOffset({offset})
            setCurrentSlideIndex(nextSlideIndex);
        }else{
            console.warn("Going To next Home Screen")
        }
    }

    const skip = () => {
        const lastSlideIndex = slides.length - 1
        const offset = lastSlideIndex*width
        slideRef?.current?.scrollToOffset({offset})
        setCurrentSlideIndex(lastSlideIndex)
    }

    return (
    <SafeAreaView>
        <StatusBar backgroundColor={"white"} />
        <View style={styles.container}>
            <FlatList data={slides} 
            ref={slideRef}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            contentContainerStyle={{height : height*0.75}} 
            horizontal 
            showsHorizontalScrollIndicator={false}
            pagingEnabled 
            renderItem={({item}) => <Slide item={item} /> } />
            <Footer />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height : "100%"
  },
  title : {
      fontSize : 22,
      fontWeight : "bold",
      textAlign : "center"
  },
  subtitle : {
      color : "grey",
      fontSize : 15,
      marginTop : 10,
      maxWidth : "70%",
      textAlign : "center",
      lineHeight : 23
  },
  indicator : {
      height:2.5,
      width : 10,
      backgroundColor : "darkgrey",
      marginHorizontal : 3,
      borderRadius : 2,
  },
  btn : {  
      width : "45%",
      height : 50,
      borderRadius : 5,
      backgroundColor: "black",
      justifyContent : "center",
      alignItems : "center",
      marginHorizontal : 8
  },
  lastBtn : {
    width : "100%",
    height : 50,
    borderRadius : 5,
    backgroundColor: "black",
    justifyContent : "center",
    alignItems : "center",
  }
});