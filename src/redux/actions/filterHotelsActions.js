import {createAction} from '@reduxjs/toolkit'

const setSearchedh = createAction('setSearchedh', (searchedh) => {
    return {
        payload:{
            nameh: searchedh
        }
    }
})
const setOrder = createAction('setOrder', (ordered) => {
    return {
        payload:{
            order: ordered
        }
    }
})
const filterHotelsActions = {
    setSearchedh,
    setOrder
}
export default filterHotelsActions