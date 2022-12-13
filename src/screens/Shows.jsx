import { View, Text , ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import showsActions from '../redux/actions/showAction'
import { useDispatch, useSelector } from 'react-redux'
import CardShow from '../components/CardShow'


export default function Shows() {

let dispatch = useDispatch()
let {getShow} = showsActions
let {show} = useSelector(store=>store.showsReducer)

useEffect(()=>{
    dispatch(getShow())
},[])



  return (
    <View style={{marginBottom:80}}>
      <Text style={{fontSize:50,textAlign:'center'}}>Shows</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:400}}>
        {
        show.length > 0 ?
        show.map(item=> <CardShow idS={item._id} name={item.name} photo={item.photo} key={item._id} description={item.description} date={item.date} price={item.price} />)
        : <Text style={{textAlign:'center',fontSize:20}}> shows not found </Text>
    }
    </ScrollView>
    </View>
  )
}