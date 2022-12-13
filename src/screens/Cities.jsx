import { View, SafeAreaView, TextInput, Text, FlatList, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import CardCity from '../components/CardCity'
import filterCitiesActions from '../redux/actions/filterCitiesActions'
import apiUrl from '../url'
import axios from 'axios'
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default function Cities({navigation}) {

    let [checkCities, setCheckCities] = useState([])
    let {cities} = useSelector(state => state.citiesReducer)
    let filter = useSelector(state => state.filterCitiesReducer)
    let dispatch = useDispatch()
    let {getCities, getFilteredCities} = citiesActions
    let {setSearched, setChecked} = filterCitiesActions

    useEffect(() => {
        axios.get(`${apiUrl}/cities`)
            .then(res => setCheckCities(res.data.response))
            .catch(err => console.log(err.message))
    }, [])
    useEffect(() => {
        if(cities.length < 1 && filter.name === '' && filter.continent.length < 1){
            dispatch(getCities())
        } else{
            dispatch(getFilteredCities(filter))
        }
    }, [filter])

    let clickHandler = () => {
        dispatch(getFilteredCities(filter))
    }

    let checkHandler = (e) => {
        let auxArray = [...filter.continent]
        if(e.target.checked){
            auxArray.push(e.target.value)
        }else{
            auxArray = auxArray.filter(el => el !== e.target.value)
        }
        let checked = auxArray
        dispatch(setChecked(checked))
    }

  return (
    <SafeAreaView style={{flex:1,}}>
        <Text style={{fontSize:50,textAlign:'center'}}>Cities</Text>
        <TextInput placeholder='search...' style={{backgroundColor:'#fff',borderRadius:20,padding:10}} value={filter.name} onChangeText={(item)=>{dispatch(setSearched(item.trim()))}}  ></TextInput>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
            {checkCities.length > 0 ?
            Array.from(new Set(checkCities.map(city => city.continent))).map(el => {
                return (
                    <BouncyCheckbox key={el} fillColor='blue' style={{padding: 10}} text={el} textStyle={{fontSize: 20, textDecorationLine: "none",}} isChecked={filter.continent.includes(el) ? true : false} onPress={(isChecked) => {
                        let auxArray = [...filter.continent]
                        if(isChecked){
                            auxArray.push(el)
                        }else{
                            auxArray = auxArray.filter(element => element !== el)
                        }
                        let checked = auxArray
                        dispatch(setChecked(checked))
                    }}></BouncyCheckbox>
                        )
            }): <></>
            }
        </View>
        <Button title='Search' onPress={clickHandler}></Button>
        {
            cities.length > 0 ? <Text style={{textAlign:'center',fontSize:20}}>found {cities.length} Cities</Text> : ''
        }
        {cities.length > 0 ?
        <FlatList data={cities} keyExtractor={(item) => item._id} renderItem={({item}) => 
            <CardCity navigation={navigation} id={item._id} name={item.name} photo={item.photo} population={item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}/>
        } ListFooterComponent={<></>}/>:<Text style={{fontSize:40,textAlign:'center'}}>No matches in your search</Text>
      }
    </SafeAreaView>
  )
}