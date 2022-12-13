import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardProfile from '../components/CardProfile'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import profileAction from '../redux/actions/profileAction'

export default function Profile() {

    let {id} = useRoute().params
    let {getUser} = profileAction
    let dispatch = useDispatch()
    let [user, setUser] = useState()
    let navigation = useNavigation()

    useEffect(() => {
        dispatch(getUser(id))
        .then(res => setUser(res.payload.user))
        .catch(err => console.log(err))
    }, [])

  return (
    <View >
      <Text style={{fontSize:50, fontFamily: 'monospace', fontWeight: '800', textAlign: 'center', margin:10, textDecorationLine: 'underline'}}>My Profile</Text>
      <CardProfile name={user?.name} age={user?.age} photo={user?.photo} email={user?.email} role={user?.role} id={user?._id}/>
      <Button  title='GO TO HOMEPAGE' onPress={() => navigation.navigate('Home')}></Button>
    </View>
  )
}