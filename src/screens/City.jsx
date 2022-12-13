import { Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import CityDetail from '../components/CityDetail'
import apiUrl from '../url'

export default function City() {

    const {id} = useRoute().params
    const [city, setCity] = useState({})

    useEffect(() => {
        axios.get(`${apiUrl}/cities/${id}`)
        .then(res => setCity(res.data.response))
        .catch(err => err.message)
    }, [id])

    return (
      <View>
        {city ?
        <CityDetail id={city._id} name={city.name} photo={city.photo} continent={city.continent} population={city.population}/> :
        <Text>There's no city</Text>}
      </View>
    )
}