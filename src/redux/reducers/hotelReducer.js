import { createReducer } from "@reduxjs/toolkit";
import hotelsActions from "../actions/hotelsAction";

const initialState = {
    hotels:[],
    userHotels:[],
    load: false,
    error: false
}

const hotelReducer = createReducer(initialState,(hotel)=>{
    hotel.addCase(hotelsActions.getHotels.pending,(state,action)=>{
        return {...state, load: true, error: false}
    })
    hotel.addCase(hotelsActions.getHotels.fulfilled,(state,action)=>{
        return {...state, load: false, error: false, ...action.payload}
    })
    hotel.addCase(hotelsActions.getHotels.rejected,(state,action)=>{
        return {...state, load: false, error: true}
    })
    hotel.addCase(hotelsActions.getHotelsByName.pending,(state,action)=>{
        return {...state, load: true, error: false}
    })
    hotel.addCase(hotelsActions.getHotelsByName.fulfilled,(state,action)=>{
        return {...state, load: false, error: false, ...action.payload}
    })
    hotel.addCase(hotelsActions.getHotelsByName.rejected,(state,action)=>{
        return {...state, load: false, error: true}
    })
    hotel.addCase(hotelsActions.getHotelByFilter.pending,(state,action)=>{
        return {...state, load: true, error: false}
    })
    hotel.addCase(hotelsActions.getHotelByFilter.fulfilled,(state,action)=>{
        return {...state, load: false, error: false, ...action.payload}
    })
    hotel.addCase(hotelsActions.getHotelByFilter.rejected,(state,action)=>{
        return {...state, load: false, error: true}
    })
    hotel.addCase(hotelsActions.deleteHotel.fulfilled,(state,action)=>{
        return { ...state,
            load: false,
            error: false,
            hotels: state.hotels.filter(el => el._id !== action.payload._id),
            userHotels: state.userHotels.filter(el => el._id !== action.payload._id)
        }
    })
    hotel.addCase(hotelsActions.getHotelsUser.fulfilled,(state,action)=>{
        return {...state,load: false,error: false,...action.payload}
    })
})

export default hotelReducer