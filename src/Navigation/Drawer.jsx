import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer'
import { TouchableOpacity,Text ,Image} from 'react-native'
import Home from '../screens/Home'
import Cities from '../screens/Cities'
import Hotels from '../screens/Hotels'
import City from '../screens/City'
import Shows from '../screens/Shows'
import SignIn from '../screens/SignIn'
import Itineraries from '../screens/Itineraries'
import SignUp from '../screens/SignUp'
import Profile from '../screens/Profile'
import { useSelector } from 'react-redux'
import MyReactions from '../screens/MyReactions'
import SignOut from '../screens/SignOut'

const DrawerNav = createDrawerNavigator()

export default function Drawer(){
    
    let {id, logged} = useSelector(state => state.userReducer)

    return (
       
        <DrawerNav.Navigator name='root'  drawerContent = {(props)=><MenuItems {...props} />}>
            <DrawerNav.Screen name='Home' component={Home}/>
            <DrawerNav.Screen name='Cities' component={Cities}/>
            <DrawerNav.Screen name='Hotels' component={Hotels}/>
            <DrawerNav.Screen options={{drawerItemStyle: {display: 'none'}}} name='City' initialParams={{id: ''}} component={City}/>
            <DrawerNav.Screen name='Shows' component={Shows}/>
            <DrawerNav.Screen name='SignIn' component={SignIn}/>
            <DrawerNav.Screen options={{drawerItemStyle: {display: 'none'}}} name='Itineraries' initialParams={{id: ''}} component={Itineraries}/>
            <DrawerNav.Screen name='SignUp' component={SignUp}/>
            {logged ?
                (<>
                <DrawerNav.Screen name='Profile' initialParams={{id: id}} component={Profile}/>
                <DrawerNav.Screen name='MyReactions' component={MyReactions}/>
                <DrawerNav.Screen name='SignOut' component={SignOut}/>
                </>
                ) :
                <></>
            }
        </DrawerNav.Navigator>
    )
}



const MenuItems = ({navigation})=>{
    let { logged,photo,name} = useSelector(state => state.userReducer)
    return (
        <DrawerContentScrollView>
            <Text style={{fontSize:25,textAlign:'center',backgroundColor:'#eee',borderRadius:25,fontFamily: 'monospace'}}>Menu</Text>
            {logged ?
                (<>
                <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                
                <Image source={{uri:photo}} style={{width:35,height:35,borderRadius:50}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace',fontWeight:'800'}}>{name}  
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace',paddingLeft:40}}> My Profile</Text>       </Text> 
            </TouchableOpacity>
                </>
                ) :
                <></>
            }
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/home-regular-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Cities')} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/buildings-regular-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>Cities</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Hotels')} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/hotel-regular-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>Hotels</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Shows')} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/party-regular-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>Shows</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>navigation.navigate('SignIn')} style={logged?{display:'none'}:{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/log-in-regular-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} style={logged?{display:'none'}:{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/user-detail-solid-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>Sign Up</Text>
            </TouchableOpacity>
            
            {logged ?
                (<>
                <TouchableOpacity onPress={()=>navigation.navigate('MyReactions')} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/happy-alt-regular-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>My Reactions</Text>
            </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SignOut')} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:'#eee',margin:10,borderRadius:25}}>
                <Image source={require('../../assets/log-out-regular-60.png')} style={{width:30,height:30}}/>
                <Text style={{marginLeft:10,fontSize:15,fontFamily: 'monospace'}}>Sign Out</Text>
            </TouchableOpacity>
                </>
                ) :
                <></>
            }
        </DrawerContentScrollView>
    )
}