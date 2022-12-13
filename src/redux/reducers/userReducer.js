import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    photo:'',
    name:'',
    logged:false,
    role:'',
    id:'',
    token:'',
    load: false,
    error: false
}

const userReducer = createReducer(initialState,(item)=>{
    item
        .addCase(userActions.signIn.pending, (state, action) => {
            return {
                ...state,
                load:true,
                error:false
            }
        })
        .addCase(userActions.signIn.fulfilled,(state,action)=>{
            const {success,response} = action.payload
            if (success){
                let {user,token} = response.response
                AsyncStorage.setItem('token',JSON.stringify({token:{
                    user:token
                }}))
                let newState = {
                    ...state,
                    photo:user.photo,
                    name:user.name,
                    logged:true,
                    role:user.role,
                    id: user._id,
                    token:token,
                    load:false,
                    error:false
                }
                return newState
            }else{
                let newState = {
                    ...state,
                    message:response
                }
                return newState
            }
        })
        .addCase(userActions.signIn.rejected, (state, action) => {
            return {
                ...state,
                load:false,
                error:true
            }
        })
        .addCase(userActions.signToken.pending, (state, action) => {
            return {
                ...state,
                load:true,
                error:false
            }
        }) 
        .addCase(userActions.signToken.fulfilled, (state, action) => {
            const {success,response} = action.payload
            if (success){
                let {user,token} = response
                let newState = {
                    ...state,
                    name:user.user.name,
                    photo:user.user.photo,
                    logged:true,
                    role:user.user.role,
                    id:user.user._id,
                    token:token,
                    load:false,
                    error:false
                }
                return newState
            }else{
                let newState = {
                    ...state,
                    message:response
                }
                return newState
            }
        })
        .addCase(userActions.signToken.rejected, (state, action) => {
            return {
                ...state,
                load:false,
                error:true
            }
        })
        .addCase(userActions.signOut.pending, (state, action) => {
            return {
                ...state,
                load:true,
                error:false
            }
        })
        .addCase(userActions.signOut.fulfilled, (state, action) => {
            const {success,response} = action.payload
            if(success){
                AsyncStorage.removeItem('token')
                let newState = {
                    ...state,
                    id:'',
                    photo: '',
                    name: '',
                    logged: false,
                    role: '',
                    token: '',
                    load: false,
                    error:false
                }
                return newState
            } else{
                let newState = {
                    ...state,
                    message: response
                }
                return newState
            }
        })
        .addCase(userActions.signOut.rejected, (state, action) => {
            return {
                ...state,
                load:false,
                error:true
            }
        })
})

export default userReducer