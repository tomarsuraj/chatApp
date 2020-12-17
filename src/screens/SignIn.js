import React, {useState, useContext} from 'react';
import {Text, View, Button, TextInput} from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';

import AppButton from '../components/AppButton';
import {globalStyles} from '../globalStyles';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('s@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleSignUp = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Sign in success');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Sign In</Text>

      <TextInput
        keyboardType="email-address"
        style={globalStyles.input}
        placeholder="Enter Email"
        onChangeText={(val) => setEmail(val)}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={globalStyles.input}
        placeholder="Enter Password"
        onChangeText={(val) => setPassword(val)}
        value={password}
      />

      <AppButton title="Sign In" onPress={handleSubmit} />

      <Text>If new User sign Up</Text>

      <AppButton
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default SignIn;
