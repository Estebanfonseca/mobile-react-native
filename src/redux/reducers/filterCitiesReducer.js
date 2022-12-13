import {createReducer} from '@reduxjs/toolkit'
import filterCitiesActions from '../actions/filterCitiesActions'

const {setChecked, setSearched} = filterCitiesActions
const initialState = {
        continent: [],
        name: ''
}

const filterCitiesReducer = createReducer(initialState, builder => {
    builder
        .addCase(setChecked, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
        .addCase(setSearched, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
})

export default filterCitiesReducer