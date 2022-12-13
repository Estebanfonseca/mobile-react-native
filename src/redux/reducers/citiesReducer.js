import {createReducer} from '@reduxjs/toolkit'
import citiesActions from '../actions/citiesActions'

const {getCities, getFilteredCities, getUserCities, deleteCity} = citiesActions
const initialState = {
    cities: [],
    userCities: [],
    load: false,
    error: false
}

const citiesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getCities.pending, (state, action) => {
            return {
                ...state,
                load: true,
                error: false, 
            }
        })
        .addCase(getCities.fulfilled, (state, action) => {
            return {
                ...state,
                load: false,
                error: false,
                ...action.payload
            }
        })
        .addCase(getCities.rejected, (state, action) => {
            return {
                ...state,
                load: false,
                error: true, 
            }
        })
        .addCase(getFilteredCities.pending, (state, action) => {
            return {
                ...state,
                load: true,
                error: false, 
            }
        })
        .addCase(getFilteredCities.fulfilled, (state, action) => {
            return {
                ...state,
                load: false,
                error: false,
                ...action.payload
            }
        })
        .addCase(getFilteredCities.rejected, (state, action) => {
            return {
                ...state,
                load: false,
                error: true, 
            }
        })
        .addCase(getUserCities.pending, (state, action) => {
            return {
                ...state,
                load: true,
                error: false, 
            }
        })
        .addCase(getUserCities.fulfilled, (state, action) => {
            return {
                ...state,
                load: false,
                error: false,
                ...action.payload
            }
        })
        .addCase(getUserCities.rejected, (state, action) => {
            return {
                ...state,
                load: false,
                error: true, 
            }
        })
        .addCase(deleteCity.pending, (state, action) => {
            return {
                ...state,
                load: true,
                error: false, 
            }
        })
        .addCase(deleteCity.fulfilled, (state, action) => {
            return {
                ...state,
                load: false,
                error: false,
                cities: state.cities.filter(el => el._id !== action.payload._id),
                userCities: state.userCities.filter(el => el._id !== action.payload._id)
            }
        })
        .addCase(deleteCity.rejected, (state, action) => {
            return {
                ...state,
                load: false,
                error: true, 
            }
        })
})
export default citiesReducer