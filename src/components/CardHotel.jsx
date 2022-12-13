import { View , Text ,Image ,Button,Modal,ImageBackground} from 'react-native'
import React,{useState,useEffect} from 'react'
import CardDetail from '../screens/CardDetail'



export default function CardHotel({id,name,photo,capacity,city}) {
  let [open , setOpen] = useState(false)





  return (
    <View style={{backgroundColor:'#fff',padding:20,margin:15}} >
      <Image source={{uri:photo}}  style={{width:300,height:300}} />
      <Text style={{textAlign:'center'}} >{name}</Text>
      <Text style={{textAlign:'center'}} >Capacity: {capacity}</Text>
      <Button title='see more' value={id} onPress={()=>setOpen(true)} ></Button>
      <Modal  visible={open}>
        <View>
          <CardDetail city={city}  name={name} photo={photo} id={id} capacity={capacity} />
          <Button title='Go back' onPress={()=>setOpen(false)} ></Button>
        </View>
      </Modal>
    </View>
  )
}

