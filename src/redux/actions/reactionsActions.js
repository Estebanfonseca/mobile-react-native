import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const getItineraryReactions = createAsyncThunk('getItineraryReactions', async(itId) => {
    try {
        let res = await axios.get(`${apiUrl}/reactions?itineraryId=${itId}`)
        return {
            reactions: res.data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})
const getShowReactions = createAsyncThunk('getShowReactions', async(idS) => {
    try {
        let res = await axios.get(`${apiUrl}/reactions?showId=${idS}`)
        return {
            reactions: res.data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})
const getMyReactions = createAsyncThunk('getMyReactions', async(id) => {
    try {
        let res = await axios.get(`${apiUrl}/reactions?userId=${id}`)
        return {
            reactions: res.data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})
const updateItReactions = createAsyncThunk('updateItReactions', async({token, name, itId}) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.put(`${apiUrl}/reactions?name=${name}&itineraryId=${itId}`, null, headers)
        return {
            reaction: res.data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})
const updateShReactions = createAsyncThunk('updateShReactions', async({token, name, idS}) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.put(`${apiUrl}/reactions?name=${name}&showId=${idS}`, null, headers)
        return {
            reaction: res.data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})
const deleteReaction = createAsyncThunk('deleteReaction', async({token, itId}) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.put(`${apiUrl}/reactions/${itId}`, null,headers)
        return {
            reaction: res.data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})

const reactionsActions = {
    getItineraryReactions,
    getShowReactions,
    getMyReactions,
    updateItReactions,
    updateShReactions,
    deleteReaction
}
export default reactionsActions