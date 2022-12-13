import { SafeAreaView , Text ,Image ,Button,Modal,TextInput,View,Alert} from 'react-native'
import React ,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import userActions from '../redux/actions/userAction'
import axios from 'axios'
import apiUrl from '../url'



export default function CardProfile({name, age, photo, email, role,id}) {
    let [open,setOpen] = useState(false)
    let [datoN,setName] = useState('')
    let [datoA,setAge] = useState('')
    let [datoP,setPhoto] = useState('')
    let navigation = useNavigation()


    
    let dato = {
      
    }
    let vacio ={

    }

    datoA === '' ? vacio.age = datoA : dato.age = datoA
    datoN === '' ? vacio.name = datoN : dato.name = datoN
    datoP === '' ? vacio.photo= datoP : dato.photo = datoP


    let submit= ()=>{
      axios.patch(`${apiUrl}/auth/me/${id}`, dato)
      Alert.alert('Was Edited')
      setOpen(false)
      setName('')
      setAge('')
      setPhoto('')
      navigation.navigate('Home')
    }

  return (
    <SafeAreaView style={{backgroundColor:'#fff',padding:20,margin:15,marginBottom:-10}} >
      <Image source={{uri:photo}}  style={{width:300,height:250}} />
      <Text style={{fontFamily: 'monospace', fontWeight: '800', fontSize: 20 ,textAlign:'center', margin:5}} >Name: {name}</Text>
      <Text style={{fontFamily: 'monospace', fontWeight: '800', fontSize: 20 ,textAlign:'center', margin:5}} >Age: {age}</Text>
      <Text style={{fontFamily: 'monospace', fontWeight: '800', fontSize: 20 ,textAlign:'center', margin:5}} >Email: {email}</Text>
      <Text style={{fontFamily: 'monospace', fontWeight: '800', fontSize: 20 ,textAlign:'center', margin:5, marginBottom:30}} >Role: {role}</Text>

      <Button  title='Edit profile' onPress={() =>setOpen(true)}></Button>
      <Modal visible={open}>
        <Text style={{fontSize:50, fontFamily: 'monospace', fontWeight: '800', textAlign: 'center', margin:10, textDecorationLine: 'underline'}}>Edit Your Profile</Text>
        <View style={{padding:15}} >
        <Text style={{textAlign:'center',}}>Name</Text>
        <TextInput value={datoN} onChangeText={item=>setName(item)} style={{backgroundColor:'#5555',margin:10,padding:15}}></TextInput>
        <Text style={{textAlign:'center',}}>Photo</Text>
        <TextInput value={datoP} onChangeText={item=>setPhoto(item)} style={{backgroundColor:'#5555',margin:10,padding:15}}></TextInput>
        <Text style={{textAlign:'center',}}>Age</Text>
        <TextInput value={datoA} onChangeText={item=>setAge(item)} style={{backgroundColor:'#5555',margin:10,padding:15}}></TextInput>
        <Button title='Edit' onPress={submit}  ></Button>
        </View>
        <Button title='Go back' onPress={()=>setOpen(false)}></Button>
      </Modal>
      <Button  title='My Reactions' onPress={() => navigation.navigate('MyReactions')}></Button>
    </SafeAreaView>
  )
}