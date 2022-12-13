import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const getItineraries = createAsyncThunk('getItineraries', async() => {
    try {
        let res = await axios.get(`${apiUrl}/itineraries`)
        return {
            itineraries: res.data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})

const getUserItineraries = createAsyncThunk('getUserItineraries', async(id) => {
    try {
        let res = axios.get(`${apiUrl}/itineraries?userId=${id}`)
        return{
            userItineraries: (await res).data.response
        }
    }catch (error) {
        return{
            error: 'Error'
        }
    } 
})
const deleteItinerary = createAsyncThunk('deleteItinerary', async({itId, token}) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        const res = await axios.delete(`${apiUrl}/itineraries/${itId}`, headers)
        return{
            _id: res.data.response._id
        }
    } catch (error) {
        return {
            error: 'Error'
        }
    }
})
const itinerariesActions = {
    getItineraries,
    getUserItineraries,
    deleteItinerary
}
export default itinerariesActions