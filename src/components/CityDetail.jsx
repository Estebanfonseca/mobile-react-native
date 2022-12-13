import { TouchableOpacity ,SafeAreaView, Text, ImageBackground, Dimensions, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function CityDetail({id, name, photo, continent, population}) {

    let screenHeight = Dimensions.get('window').height
    let navigation = useNavigation()

  return (
    <SafeAreaView>
        <ImageBackground source={{uri: photo}} resizeMode='cover' imageStyle={{opacity:0.2}} style={{bottom: 0, height: screenHeight, alignItems:'center'}}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.text}>Continent: {continent}</Text>
            <Text style={styles.text}>Population: {population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Itineraries', {id: id})} >
                <Text style={{color: 'floralwhite'}}>VIEW ITINERARIES</Text>
            </TouchableOpacity>
            <Button style={{position: 'absolute', bottom: -100}} title='Go back' onPress={() => navigation.navigate('Cities', null)} ></Button>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontFamily: 'monospace',
        margin: 50,
        fontSize: 50,
        justifySelf:'flex-start',
        textDecorationLine: 'underline'
    },
    text: {
        fontFamily: 'monospace',
        fontSize: 20,
        margin: 10
    },
    button: {
        padding: 10,
        margin: 80,
        backgroundColor: `dodgerblue`,
        borderRadius: 50,
    }
})