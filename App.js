import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './src/Navigation/Drawer';

export default function App() {

  return (
      <SafeAreaView style={{flex:1}}>
        <NavigationContainer>
          <Provider store={store}>
            <Drawer/>
          </Provider>
        </NavigationContainer>
      </SafeAreaView>
  )
}
