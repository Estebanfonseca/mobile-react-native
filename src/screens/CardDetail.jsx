import { View, Text , Image , Button , Modal,FlatList,ImageBackground,Dimensions,TouchableOpacity} from 'react-native'
import React , {useState,useEffect} from 'react'
import showsActions from '../redux/actions/showAction'
import { useDispatch, useSelector } from 'react-redux'
import CardShow from '../components/CardShow'


export default function CardDetail({id, name , photo , capacity,city}) {
    let [open , setOpen] = useState(false)
    let dispatch = useDispatch()
  let {showH} = useSelector(store=>store.showsReducer)
  let {getShowH} = showsActions

  useEffect(()=>{
    dispatch(getShowH(id))
  },[])
  let screenHeight = Dimensions.get('window').height

  return (
    <View style={{marginBottom:-100}} >
      <ImageBackground source={{uri: photo}} resizeMode='cover' imageStyle={{opacity:0.2}} style={{bottom: 0, height: screenHeight, alignItems:'center'}}>

      <Image source={{uri:photo}} style={{width:300,height:300}} />
      <Text style={{textAlign:'center',fontFamily: 'monospace',fontSize: 20,margin: 10}} >{name}</Text>
      <Text style={{textAlign:'center',fontFamily: 'monospace',fontSize: 20,margin: 10}}>City: {city}</Text>
      <Text style={{textAlign:'center',fontFamily: 'monospace',fontSize: 20,margin: 10}}>Capacity: {capacity}</Text>
      <TouchableOpacity style={{ padding: 10,margin: 80,backgroundColor: `dodgerblue`,borderRadius: 50,}}  onPress={()=>setOpen(true)} ><Text style={{color: 'floralwhite'}}>View Shows</Text></TouchableOpacity>
        <Modal visible={open}>
            <FlatList data={showH} keyExtractor={(item)=>item._id} renderItem={({item})=>{
                return(
                    <View style={{backgroundColor:'#fff'}}>
                        <CardShow idS={item._id} name={item.name} photo={item.photo} key={item._id} description={item.description} date={item.date} price={item.price} />
                    </View>
                )
            }}/>
        <Button style={{position: 'absolute', bottom: -100}} title='Go back' onPress={()=>setOpen(false)} ></Button>
        
        </Modal>
      </ImageBackground>
     </View>
  )
}