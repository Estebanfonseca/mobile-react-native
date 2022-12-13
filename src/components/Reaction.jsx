import { View, Text,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import reactionsActions from '../redux/actions/reactionsActions'

export default function Reaction({reload,name,userId,idS,icon, itId}) {
    let {token} = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let { updateShReactions, updateItReactions} = reactionsActions
    let clickHandler = () => {
      if(idS){
        dispatch(updateShReactions({token, name, idS}))
            .then(res => reload())
            .catch(err => console.log(err))
            reload()
      }
      if(itId){
        dispatch(updateItReactions({token, name, itId}))
            .then(res => reload())
            .catch(err => console.log(err))
      }
    }
  return (
    <View style={{justifyContent:'center', alignItems: 'center'}} >
        <TouchableOpacity onPress={clickHandler}><Image source={{uri:icon}} style={{width:25,height:25,marginHorizontal: 25}} /></TouchableOpacity>
        <Text style={{textAlign:'right',}}>{userId.length}</Text>
    </View>
  )
}