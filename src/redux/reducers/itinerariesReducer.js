import {createReducer} from '@reduxjs/toolkit'
import itinerariesActions from '../actions/itinerariesActions'

const {getItineraries, getUserItineraries, deleteItinerary} = itinerariesActions
const initialState = {
    itineraries: [],
    userItineraries: [],
    load: false,
    error: false
}

const itinerariesReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(getItineraries.pending, (state, action) => {
        return {
            ...state,
            load: true,
            error: false, 
        }
    })
    .addCase(getItineraries.fulfilled, (state, action) => {
        return {
            ...state,
            load: false,
            error: false,
            ...action.payload
        }
    })
    .addCase(getItineraries.rejected, (state, action) => {
        return {
            ...state,
            load: false,
            error: true, 
        }
    })
    .addCase(getUserItineraries.pending, (state, action) => {
        return {
            ...state,
            load: true,
            error: false, 
        }
    })
    .addCase(getUserItineraries.fulfilled, (state, action) => {
        return {
            ...state,
            load: false,
            error: false,
            ...action.payload
        }
    })
    .addCase(getUserItineraries.rejected, (state, action) => {
        return {
            ...state,
            load: false,
            error: true, 
        }
    })
    .addCase(deleteItinerary.pending, (state, action) => {
        return {
            ...state,
            load: true,
            error: false, 
        }
    })
    .addCase(deleteItinerary.fulfilled, (state, action) => {
        return {
            ...state,
            load: false,
            error: false,
            itineraries: state.itineraries.filter(el => el._id !== action.payload._id),
            userItineraries: state.userItineraries.filter(el => el._id !== action.payload._id)
        }
    })
    .addCase(deleteItinerary.rejected, (state, action) => {
        return {
            ...state,
            load: false,
            error: true, 
        }
    })
})
export default itinerariesReducer