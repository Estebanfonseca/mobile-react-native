import { View, Text, TextInput, TouchableOpacity, FlatList, Image,Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import commentActions from "../redux/actions/commentAction";
import { ifError } from "assert";

export default function Comments({ show, itin }) {
    let [coment, setComent] = useState("");
    let [push,setPush] = useState(false)
    let [idd,setIdd] = useState('')
    let [edite,setEdite] = useState('')
    let dispatch = useDispatch();
    let { id ,token} = useSelector((store) => store.userReducer);
    let { comment } = useSelector((store) => store.comentReducer);
    let { createComent, getComent ,delComent,editComent} = commentActions;
    let req = {
        show,
        itin,
    };
    useEffect(() => {
        dispatch(getComent(req));
    }, []);
    let datos = {
        userID: id,
        comment: coment,
    };
    show ? (datos.showID = show) : (datos.itinerarieID = itin);

    let submit = () => {
        dispatch(createComent(datos))
        .then(res => {
            if(res.payload.error){
                Alert.alert('Log in or Sign up please')
            }
        })
        .catch(err => console.log(err));
        setComent("");
        dispatch(getComent(req));
    };
    
    let edit = ()=>{
        let headers = {headers: {'Authorization': `Bearer ${token}`}}
        dispatch(editComent({userID:id,comment:edite,id:idd,headers}))
        .then(res => {
            if(res.payload.error){
                Alert.alert('unauthorized action')
            } else{
                Alert.alert('was edited')
            }
        })
        .catch(err => console.log(err))
        setPush(false)
        setEdite('')
        dispatch(getComent(req))
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={comment}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    let headers = {headers: {'Authorization': `Bearer ${token}`}}
                    let idSH = item._id
                    let dato = {
                        idSH,
                        headers
                    }
                    return (
                        <><View style={{backgroundColor: "#ddd",margin:15,  borderRadius: 25 }} >
                            <View style={{ flexDirection: "row", backgroundColor: "#eee", padding: 20,  borderRadius: 25 ,alignItems:'center'}}>
                                <Image source={{ uri: item.userID.photo }} style={{ width: 60, height: 60, borderRadius: 50 }} />
                                <View style={{ backgroundColor: "#afaa", padding: 10, margin: 5, width: 250, borderRadius: 25 }}>
                                    <Text style={{ fontSize: 13, fontWeight: "800" }}>{item.userID.name}</Text>
                                    <Text>{item.comment}</Text>
                                    
                                </View>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                    <TouchableOpacity onPress={()=>{setPush(!push);setIdd(item._id);setEdite(item.comment)}}>
                                        <Text style={{backgroundColor:'#ccc',padding:2,margin:3,textAlign:'center',fontSize:11}}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{
                                        dispatch(delComent(dato))
                                        .then(res => {
                                            if(res.payload.error){
                                                Alert.alert('unauthorized action')
                                            } else{
                                                Alert.alert('was deleted')
                                            }
                                        })
                                        .catch(err => console.log(err))
                                        }} >
                                        <Text style={{backgroundColor:'#ccc',padding:2,margin:3,textAlign:'center',fontSize:11}}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    push && item._id === idd ?<View style={{flexDirection:'row'}}>
                                    <TextInput value={edite} onChangeText={item=>setEdite(item)} style={{ backgroundColor: "#fff", margin: 10, padding: 15,flex:1,borderRadius:25 }}></TextInput>
                                    <TouchableOpacity onPress={edit} style={{backgroundColor:'#2B9CD9',borderRadius:50 , width:80,height:80,padding:22,margin:5}}><Text style={{fontSize:17,fontWeight:'800',color:'#fff'}}>Edit</Text></TouchableOpacity>
                                    </View>  : ''
                                }
                        </View>
                        </>
                    );
                }}
            />
            <TextInput
                placeholder="Your comment"
                style={{ backgroundColor: "#ddd", margin: 10, padding: 15 }}
                value={coment}
                onChangeText={(item) => {
                    setComent(item);
                }}
            />
            <TouchableOpacity onPress={submit} style={{ backgroundColor: "#2B9CD9", padding: 10, margin: 10, borderRadius: 25 }}>
                <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Comment</Text>
            </TouchableOpacity>
        </View>
    );
}
