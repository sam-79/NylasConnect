import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';


import { useSelector } from 'react-redux';

import Hostname from './src/screens/Hostname';
import AppNavigator from './src/Navigator/AppNavigator';


//Index for getting hostname
const Index = () => {
  const hostname = useSelector(state => state.hostname.value);
  return (
    <View style={styles.container}>
      {
        hostname ?
          <AppNavigator />
          :
          <Hostname />
      }
    </View>
  )

}


export default function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
