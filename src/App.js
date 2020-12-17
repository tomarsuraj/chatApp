import React, {useContext, useEffect} from 'react';
import {UserContext} from './context/Context';

//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import {IS_AUTHTHENTICATED, SET_USER} from './context/action.type';

const Stack = createStackNavigator();

const App = () => {
  const {appData, dispatch} = useContext(UserContext);

  const onAuthStateChanged = (user) => {
    if (user) {
      // console.log(user._user.uid);
      dispatch({type: IS_AUTHTHENTICATED, payload: true});

      firestore()
        .collection('Users')
        .doc(user._user.uid)
        .get()
        .then((documentSnapshot) => {
          console.log('Total users: ', documentSnapshot._data);
          dispatch({type: SET_USER, payload: documentSnapshot._data});
        });
    }
  };

  useEffect(() => {
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {appData.isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
