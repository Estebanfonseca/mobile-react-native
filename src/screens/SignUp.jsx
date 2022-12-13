import { ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'
import apiUrl from '../url'

export default function SignUp({navigation, userRole = 'user'}) {

    let [fName, setFName] = useState('')
    let [lName, setLName] = useState('')
    let [age, setAge] = useState('')
    let [photo, setPhoto] = useState('')
    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    let [passOk, setPassOk] = useState('')

    let submit = () => {
        if(pass !== passOk){
            Alert.alert('Passwords don´t match')
        } else{
            let newUser = {
                name: fName,
                lastName: lName,
                role: userRole,
                age: age,
                photo: photo,
                email: email,
                password: pass,
            }
            axios.post(`${apiUrl}/auth/sign-up`, newUser)
                    .then((res)=>{
                        if(res.data.success){
                            Alert.alert(`${res.data.message}, please check your email to validate your user`)
                            navigation.navigate('Home')
                        } else{
                            let error = res.data.message
                            error.forEach(item=>Alert.alert(item.message))
                        }
                    })
                    .catch(err => {
                        Alert.alert('Error sending form, bad request')
                    })
        }
    }

  return (
    <ScrollView>
        <Text style={{textAlign:'center',}}>Name</Text>
        <TextInput placeholder='Name...' style={{backgroundColor:'#5555',margin:10,padding:15}} value={fName} onChangeText={(item)=>{setFName(item)}}/>
        <Text style={{textAlign:'center',}}>Last Name</Text>
        <TextInput placeholder='Last Name...' style={{backgroundColor:'#5555',margin:10,padding:15}} value={lName} onChangeText={(item)=>{setLName(item)}}/>
        <Text style={{textAlign:'center',}}>Age</Text>
        <TextInput placeholder='Age...' style={{backgroundColor:'#5555',margin:10,padding:15}} value={age} onChangeText={(item)=>{setAge(item)}} keyboardType='numeric' min={18} max={100}/>
        <Text style={{textAlign:'center',}}>Photo</Text>
        <TextInput placeholder='Photo Url...' style={{backgroundColor:'#5555',margin:10,padding:15}} value={photo} onChangeText={(item)=>{setPhoto(item)}} keyboardType='url'/>
        <Text style={{textAlign:'center',}}>Email</Text>
        <TextInput placeholder='Email...' style={{backgroundColor:'#5555',margin:10,padding:15}} value={email} onChangeText={(item)=>{setEmail(item)}} keyboardType='email-address'/>
        <Text style={{textAlign:'center',}}>Password</Text>
        <TextInput secureTextEntry={true} passwordRules={true} placeholder='Password...' style={{backgroundColor:'#5555',margin:10,padding:15}} value={pass} onChangeText={(item)=>{setPass(item)}} />
        <Text style={{textAlign:'center',}}>Confirm your password</Text>
        <TextInput secureTextEntry={true} passwordRules={true} placeholder='Password...' style={{backgroundColor:'#5555',margin:10,padding:15}} value={passOk} onChangeText={(item)=>{setPassOk(item)}} />
        <TouchableOpacity style={{backgroundColor:'#2B9CD9',padding:10,margin:10,borderRadius:25}} onPress={submit} ><Text style={{color:'#fff',textAlign:'center'}}>Sign Up</Text></TouchableOpacity>
        <Text style={{textAlign:'center',}}>Already have an Account?</Text>
        <TouchableOpacity style={{backgroundColor:'#2B9CD9',padding:10,margin:10,borderRadius:25}} ><Text style={{color:'#fff',textAlign:'center'}} onPress={() => navigation.navigate('SignIn')}>Sign In</Text></TouchableOpacity>
    </ScrollView>
  )
}