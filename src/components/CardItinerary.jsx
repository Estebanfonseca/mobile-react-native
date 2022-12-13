import { SafeAreaView, Text, View, Image, Button, StyleSheet, Modal } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactionsActions from '../redux/actions/reactionsActions'
import Reaction from './Reaction'
import Comments from './Comments'

export default function CardItinerary({itId, name, photo,description, duration, price}) {

    let [open, setOpen] = useState(false)
    let [count, setCount] = useState(0)
    let dispatch = useDispatch()
    let {getItineraryReactions} = reactionsActions
    let [itineraryReactions, setItineraryReactions] = useState()
    let [updated, setUpdated] = useState(false)
    let {id} = useSelector(state => state.userReducer)

    useEffect(() => {
          dispatch(getItineraryReactions(itId))
          .then(res => setItineraryReactions(res.payload.reactions))
          .catch(err => console.log(err))
      },[updated])

    useEffect(() => {
        let interval = setInterval(() => {
                            count < 2 ? setCount(++count) : setCount(0)
                        }, 3000)
                        return () => {
                            clearInterval(interval)
                        }
    }, [count])

    let reload = () => {
        setUpdated(!updated)
    }

  return (
    <SafeAreaView style={{backgroundColor:'#fff',padding:20,margin:15, alignItems: 'center'}} >
      <Image source={{uri:photo[count]}}  style={{width:300,height:300}} />
      <Text style={styles.title} >{name}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.text}>Duration: {duration} hs.</Text>
      <Text style={styles.text}>Price: ${price?.toFixed(2)}</Text>
      <View style={{flexDirection:'row', alignItems: 'center', margin: 10}} >
        {
            itineraryReactions ?
            itineraryReactions.map(el => {
                return <Reaction key={el._id} reload={reload} name={el.name} userId={el.userId} itId={itId} icon={el.userId.includes(id) ? el.icon : el.iconBack}/>
            }) :
            <></>
        }
      </View>
      <Button title='Comment'  onPress={()=>setOpen(true)} ></Button>
      <Modal  visible={open}>
        <Comments show={itId}/>
        <Button title='Go back'  onPress={()=>setOpen(false)} ></Button>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        textAlign:'center',
        fontFamily: 'monospace',
        fontSize: 15,
        fontWeight: '800',
        textDecorationLine: 'underline',
        margin: 5
    },
    text: {
        fontFamily: 'monospace',
        margin: 5,
        alignSelf: 'flex-start'
    }
})