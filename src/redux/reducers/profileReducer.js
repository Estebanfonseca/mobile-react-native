import {createReducer} from '@reduxjs/toolkit'
import profileAction from '../actions/profileAction'

const initialState={
    user:[],
    load:false,
    error:false
}
const profileReducer = createReducer(initialState,(item)=>{
    item.addCase(profileAction.getUser.fulfilled,(state,action)=>{
        return {...state,load:false,error:false,...action.payload}
    })
})



export default profileReducer