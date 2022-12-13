import {createReducer} from '@reduxjs/toolkit'
import filterHotelsActions from '../actions/filterHotelsActions'

const {setSearchedh, setOrder} = filterHotelsActions
const initialState = {
        nameh: '',
        order: 0,
}

const filterHotelsReducer = createReducer(initialState, builder => {
    builder
        .addCase(setSearchedh, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
        .addCase(setOrder, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
})

export default filterHotelsReducer