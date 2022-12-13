import { FlatList, SafeAreaView, Text } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactionsActions from '../redux/actions/reactionsActions'
import CardUserReactions from '../components/CardUserReactions'
import { useFocusEffect } from '@react-navigation/native'

export default function MyReactions() {

    let [myReactions, setMyReactions] = useState([])
    let dispatch = useDispatch()
    let {getMyReactions} = reactionsActions
    let {id} = useSelector(state => state.userReducer)
    let [update, setUpdate] = useState(false)

    useEffect(() => {
        dispatch(getMyReactions(id))
            .then(res => setMyReactions(res.payload.reactions))
            .catch(err => console.log(err))
    }, [update])

    useFocusEffect(
        useCallback(() => {
            dispatch(getMyReactions(id))
                .then(res => setMyReactions(res.payload.reactions))
                .catch(err => console.log(err))
        }, [])
   )

    let reload = () => {
        setUpdate(!update)
    }

  return (
    <SafeAreaView style={{flex:1}}>
        <Text style={{fontSize:50,textAlign:'center', fontFamily: 'monospace', textDecorationLine: 'underline'}}>My Reactions</Text>
        {
            myReactions.length > 0 ?
            <FlatList data={myReactions} keyExtractor={(item) => item?._id} renderItem={({item}) =>
                <CardUserReactions itId={item._id} photo={item.itineraryId ? item.itineraryId.photo[0] : item.showId.photo} itName={item.itineraryId ? item.itineraryId.name : item.showId.name} reload={reload} rName={item.name}/>
            }/> :
            <Text style={{fontSize:40,textAlign:'center'}}>No reactions yet</Text>
        }
    </SafeAreaView>
  )
}