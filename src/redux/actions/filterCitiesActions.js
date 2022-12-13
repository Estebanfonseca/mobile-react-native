import {createAction} from '@reduxjs/toolkit'

const setChecked = createAction('setChecked', (checked) => {
    return {
        payload:{
            continent: checked
        }
    }
})
const setSearched = createAction('setSearched', (searched) => {
    return {
        payload:{
            name: searched
        }
    }
})
const filterCitiesActions = {
    setChecked,
    setSearched
}
export default filterCitiesActions