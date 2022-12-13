import {View, Text ,ScrollView,TextInput,Button} from 'react-native'
import React , {useEffect , useState} from 'react'
import CardHotel from '../components/CardHotel'
import { useDispatch, useSelector } from 'react-redux'
import hotelsActions from '../redux/actions/hotelsAction'
import {Picker} from '@react-native-picker/picker';



export default function Hotels() {
let dispatch = useDispatch()
let {hotels} = useSelector(store=>store.hotelReducer)
let {getHotels,getHotelsByName,getHotelByFilter} = hotelsActions
let [search,setSearch] = useState('')
const [order, setOrder] = useState();

useEffect(()=>{
    dispatch(getHotels())
},[])


let clic = ()=>{
  let dato = {nameh:search,order:order}
    dispatch(getHotelByFilter(dato))
}
  return (
    <View style={{marginBottom:270}}>
    <Text style={{fontSize:45
    
    ,textAlign:'center'}}>Hotels</Text>
    <TextInput placeholder='search...' style={{backgroundColor:'#fff',borderRadius:20,padding:10}} value={search} onChangeText={(item)=>{setSearch(item); dispatch(getHotelsByName(item))}}  ></TextInput>
    <Picker style={{backgroundColor:'#fff',margin:10}}
  selectedValue={order}
  onValueChange={(itemValue) =>
    {setOrder(itemValue);dispatch(getHotelByFilter({order:itemValue,nameh:search}))}
  }>
  <Picker.Item label="Order" value="" />
  <Picker.Item label="Asc" value="1" />
  <Picker.Item label="Desc" value="-1" />
  </Picker>
    <Button title='Search' onPress={clic}></Button>
    {
      hotels.length > 0 ? <Text style={{textAlign:'center',fontSize:20}}>found {hotels.length} Hotels</Text> : ''
    }
    <ScrollView showsVerticalScrollIndicator={false} style={{width:370}}>
        {
        hotels.length > 0 ?
        hotels.map(item=> <CardHotel id={item._id} name={item.name} city={item.cityID.name} photo={item.photo[0]} key={item._id} capacity={item.capacity} />)
        : <Text style={{textAlign:'center',fontSize:20}}> Hotels not found </Text>
    }
    </ScrollView>
    
    </View>
  )
}