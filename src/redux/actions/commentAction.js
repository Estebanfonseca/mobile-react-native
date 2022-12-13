import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../url";

const getComent = createAsyncThunk('getComent',async(datos)=>{
    let res
    try{
        datos.show?
        res =  axios.get(`${apiUrl}/comments?showID=${datos.show}`):
        res =  axios.get(`${apiUrl}/comments?itinerarieID=${datos.itin}`)
        return{ comment: (await res).data.response}
    }catch (error) {
        return{
            error: 'Error'
        }
    }
})

const delComent = createAsyncThunk('delComent',async(datos)=>{
    let id = datos.idSH
    let token = datos.headers
    try{
        let res = await axios.delete(`${apiUrl}/comments/${id}`,token)
        return{ _id: res.data.response._id }
    }catch (error) {
        return{
            error: 'Error'
        }
    }
})
const editComent = createAsyncThunk('editComent',async(datos)=>{
    let id = datos.id
    let token = datos.headers
    let dato = {
        userID:datos.userID,
        comment:datos.comment
    }
    try{
        let res = await axios.put(`${apiUrl}/comments/${id}`,dato,token)
        return{ comment: res.data.response}
    }catch (error) {
        return{
            error: 'Error'
        }
    }
})
const createComent = createAsyncThunk('createComent',async(datos)=>{
    try{
        let res = await axios.post(`${apiUrl}/comments`,datos)
        return{ comment: res.data}
    }catch (error) {
        return{
            error: 'Error'
        }
    }
})

const commentActions = {
    getComent,
    delComent,
    editComent,
    createComent
}

export default commentActions