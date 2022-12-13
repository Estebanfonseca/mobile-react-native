import { createReducer } from "@reduxjs/toolkit";
import commentActions from "../actions/commentAction";

const initialState = {
    comment:[],
    load:false,
    error:false
}

const comentReducer = createReducer(initialState,(item)=>{
    item.addCase(commentActions.getComent.fulfilled,(state,action)=>{
        return {...state,load:false,error:false,...action.payload}
    })
    item.addCase(commentActions.createComent.fulfilled,(state,action)=>{
        return {...state,load:false,error:false,comment:state.comment.filter(item=>item._id !== action.payload._id)}
    })
    item.addCase(commentActions.createComent.rejected,(state,action)=>{
        return {...state,load:false,error:true}
    })
    item.addCase(commentActions.editComent.fulfilled,(state,action)=>{

        return {...state,load:false,error:false,comment:state.comment.filter(item=>item.comment === action.payload.comment)}
    })
    item.addCase(commentActions.editComent.rejected,(state,action)=>{

        return {...state,load:false,error:true}
    })
    item.addCase(commentActions.delComent.fulfilled,(state,action)=>{
        return {...state,load:false,error:false,comment:state.comment.filter(item=>item._id !== action.payload._id)}
    })
    item.addCase(commentActions.delComent.rejected,(state,action)=>{
        return {...state,load:false,error:true}
    })
})

export default comentReducer