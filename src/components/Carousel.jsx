import { Text,Dimensions,Animated,SafeAreaView, Image ,StyleSheet, View} from 'react-native'
import React , {useEffect} from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import hotelsActions from '../redux/actions/hotelsAction'
import citiesActions from '../redux/actions/citiesActions'

    const width = Dimensions.get('window').width
    const card = width * 1;
    const space = 55;

export default function Carousel() {
 let dispatch = useDispatch()
 let {getHotels} = hotelsActions
 let {getCities} = citiesActions
 let {hotels} = useSelector(store => store.hotelReducer)
 let {cities} = useSelector(store => store.citiesReducer)
 useEffect(()=>{
    dispatch(getHotels())
    dispatch(getCities())
 },[])
  
  let hotel =[...hotels.map(item => ({photo:item.photo[0],id:item._id,type:'Hotel',name:item.name}))]
  let city = [...cities.map(item => ({photo:item.photo,id:item._id,type:'City',name:item.name}))]

let data = hotel.concat(city)

    const scrollX = React.useRef(new Animated.Value(0)).current
    
    return (
    <SafeAreaView style={styles.container} >
      <Animated.FlatList onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}], {useNativeDriver:true})} data={data} horizontal={true} showsHorizontalScrollIndicator={false}  scrollEventThrottle={16} decelerationRate={0}  snapToAlignment="start" snapToInterval={card} keyExtractor={(item) => item.id} renderItem={({item , index})=>{
        let photo = item.photo
        
        const inputRange = [(index - 1) * card,index * card, (index + 1) * card];
        const outputRange = [0, -50, 0];
        const scrollY = scrollX.interpolate({inputRange,outputRange});
        return (
            <View style={{width:width}} >
                <Animated.View style={{ marginHorizontal: space,
                                    padding: 40,
                                    borderRadius: 25,
                                    backgroundColor: 'goldenrod',
                                    alignItems: 'center',
                                    transform: [{translateY:scrollY}],
                                    marginTop:60,
                                    height:350
                                   }} >
                <Image source={{uri:photo}} style={styles.posterImage}  />
                <Text style={{textAlign:'center', fontSize: 20, fontWeight:'900', fontFamily:'monospace'}} >{(item.type === 'Hotel' ? item.type : '') +' '+ item.name}</Text>
                </Animated.View>
            </View>
        )
      }} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      alignItems:'center',
      justifyContent: 'center',
    },
    posterImage: {
        width: 300,
        height: card * 0.5,
        resizeMode: 'cover',
        borderRadius: 24,
        margin:0,
        marginBottom: 10,
    },
  });
  