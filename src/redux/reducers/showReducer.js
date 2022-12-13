import { createReducer } from "@reduxjs/toolkit";
import showsActions from "../actions/showAction";  

const initialState = {
    show: [],
    showH:[],
    load:false,
    error:false
}

const showsReducer = createReducer(initialState,(item)=>{
    item.addCase(showsActions.getShow.fulfilled,(state,action)=>{
        return {...state,load:false,error:false,...action.payload}
    })
    item.addCase(showsActions.deleteShow.fulfilled,(state,action)=>{
        return{...state,load:false,error:false,show:state.show.filter(item=>item._id !== action.payload._id)}
    })
    item.addCase(showsActions.createShow.fulfilled,(state,action)=>{
        return {...state,load:false,error:false,show:state.show.filter(item=>item._id !== action.payload._id)}
    })
    item.addCase(showsActions.getShowH.fulfilled,(state,action)=>{
        return {...state,load:false,error:false,...action.payload}
    })
})

export default showsReducer