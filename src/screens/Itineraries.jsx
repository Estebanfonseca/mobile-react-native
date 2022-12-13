import { SafeAreaView, FlatList, Text, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import apiUrl from '../url'
import CardItinerary from '../components/CardItinerary'

export default function Itineraries() {

    let {id} = useRoute().params
    let [itineraries, setItineraries] = useState([])
    let navigation = useNavigation()

    useEffect(() => {
        axios.get(`${apiUrl}/itineraries?cityId=${id}`)
            .then(res => setItineraries(res.data.response))
            .catch(err => err.message)
    })

  return (
    <SafeAreaView style={{flex: 1}}>
        {itineraries.length > 0 ?
        <FlatList data={itineraries} keyExtractor={item => item._id} renderItem={({item}) => <CardItinerary itId={item._id} name={item?.name} photo={item.photo} description={item.description} duration={item.duration} price={item.price}/>}/>:
        <Text style={{fontSize:40,textAlign:'center'}}>No itineraries yet</Text>
        }
        <Button title='Go Back' onPress={() => navigation.navigate('City', {id: id})}></Button>
    </SafeAreaView>
  )
}