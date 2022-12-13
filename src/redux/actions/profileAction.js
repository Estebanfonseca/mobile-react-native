import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from '../../url'

const getUser = createAsyncThunk ('getUser',async(id)=>{
    try {
        let res = await axios.get(`${apiUrl}/auth/me/${id}`)
        return {
            user:res.data.response
        }
    }catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const profileAction = {
    getUser
}

export default profileAction