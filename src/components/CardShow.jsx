import { View, Text , Image,Button,Modal} from 'react-native'
import React , {useState,useEffect}from 'react'
import Comments from './Comments'
import Reaction from './Reaction'
import reactionsActions from '../redux/actions/reactionsActions'
import { useDispatch, useSelector } from 'react-redux'



export default function CardShow({photo,name,description,idS,price,date}) {
    let [open,setOpen] = useState(false)
    let dispatch = useDispatch()
    let [showReactions, setShowReactions] = useState()
    let {id} = useSelector(store => store.userReducer)
    let [updated, setUpdated] = useState(false)
    let {getShowReactions} = reactionsActions

    useEffect(()=>{
      dispatch(getShowReactions(idS))
      .then(res => setShowReactions(res.payload.reactions))
      .catch(err => console.log(err))
    },[updated])
    
    let reload = () =>{
      setUpdated(!updated)
    }



  return (
    <View style={{backgroundColor:'#fff',padding:20,margin:15}} >
      <Image source={{uri:photo}}  style={{width:300,height:300}} />
      <Text style={{textAlign:'center',fontSize:30,fontWeight:'500'}} >{name}</Text>
      <Text style={{textAlign:'center'}} ><Text style={{fontWeight:'500',fontSize:18}}>Description:</Text> {description}</Text>
      <Text style={{textAlign:'center'}} ><Text style={{fontWeight:'500',fontSize:18}}>Date: </Text> {date.slice(0,10)}</Text>
      <Text style={{textAlign:'center'}} ><Text style={{fontWeight:'500',fontSize:18}}>Price: $ </Text> {price}</Text>
              <View style={{flexDirection:'row',width:400}} >
      {
        showReactions ? 
            showReactions.map(el => {
              return <Reaction  key={el._id} reload={reload} name={el.name} userId={el.userId} idS={idS} icon={el.userId.includes(id) ? el.icon : el.iconBack}/>
            }) :
            <></>
      }
              </View>
      <Button title='Comment'  onPress={()=>setOpen(true)} ></Button>
      <Modal  visible={open}>
        <Comments show={idS}/>
        <Button title='Go back'  onPress={()=>setOpen(false)} ></Button>
      </Modal>
    </View>
  )
}