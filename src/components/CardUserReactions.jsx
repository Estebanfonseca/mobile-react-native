import { SafeAreaView, Image, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactionsActions from '../redux/actions/reactionsActions'

export default function CardUserReactions({itId, photo, itName, rName, reload}) {

    let {token} = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let {deleteReaction} = reactionsActions
    let [color, setColor] = useState('lavenderblush')

    useEffect(() => {
        if(rName === 'like'){
            setColor('lightgreen')
        }
        if(rName === 'not-like'){
            setColor('gray')
        }
        if(rName === 'surprise'){
            setColor('orange')
        }
        if(rName === 'love'){
            setColor('indianred')
        }
    }, [])

    let deleteHandler = () =>{
        dispatch(deleteReaction({token, itId}))
            .then(res => reload())
            .catch(err => console.log(err))
    }

  return (
    <SafeAreaView style={{backgroundColor: color,padding:20,margin:15, alignItems:'center'}} >
      <Image source={{uri:photo}}  style={{width:300,height:300}} />
      <Text style={{textAlign:'center', fontFamily: 'monospace', fontSize:15, textDecorationLine: 'underline', fontWeight:'800', margin:10}} >{itName}</Text>
      <Text style={{textAlign:'center',fontSize:20, fontFamily: 'monospace', margin: 20}} >{rName !== 'love' ? `It ${rName} you` : `You ${rName} it`}</Text>
      <Button title='Delete Reaction' onPress={deleteHandler}></Button>
    </SafeAreaView>
  )
}