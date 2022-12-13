import { SafeAreaView, Text,ImageBackground,Image,StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Carousel from '../components/Carousel'

export default function Home() {

  let screenHeight = Dimensions.get('window').height

  return (
    <SafeAreaView>
      <ImageBackground source={{uri:'https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80'}}  style={{alignItems:'center',height:screenHeight}}>
      <Image  source={require('../../assets/logo_transparent.png')} style={{width:250,height:250}}/>
      <Text style={styles.text}>Just dream it...</Text>
      <Text style={styles.text}>...we make it happens</Text>
      <Carousel/>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    
      },
})