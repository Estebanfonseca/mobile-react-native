import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const getCities = createAsyncThunk('getCities', async() => {
    try {
        const res = await axios.get(`${apiUrl}/cities`)
        return {
            cities: res.data.response
        }
    } catch (err) {
        return {
            error: 'Error'
        }
    }
})
const getFilteredCities = createAsyncThunk('getFilteredCities', async(filter) => {
    try {
        let searchQuery = filter.name
        let checkQuery = filter.continent.join('&continent=')
        const res = await axios.get(`${apiUrl}/cities?name=${searchQuery}&continent=${checkQuery}`)
        return {
            cities: res.data.response
        }
    } catch (error) {
        return {
            error: 'Error'
        }
    }
})
const getUserCities = createAsyncThunk('getUserCities', async(userId) => {
    try {
        let res = axios.get(`${apiUrl}/cities?userId=${userId}`)
        return{
            userCities: (await res).data.response
        }
    } catch (error) {
        return{
            error: 'Error'
        }
    }
})
const deleteCity = createAsyncThunk('deleteCity', async({cId, token}) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        const res = await axios.delete(`${apiUrl}/cities/${cId}`, headers)
        return{
            _id: res.data.response._id
        }
    } catch (error) {
        return {
            error: 'Error'
        }
    }
})
const citiesActions = {
    getCities,
    getFilteredCities,
    getUserCities,
    deleteCity
}

export default citiesActions