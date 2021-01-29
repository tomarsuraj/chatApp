import React, {useState, useContext} from 'react';
import {Text, View, Button, StyleSheet, TextInput} from 'react-native';

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
    handleSignUp();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Sign In</Text>
      <View style={globalStyles.fome}>
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
      </View>
      <View style={styles.signUpText}>
        <Text style={{fontSize: 24}}>If you dont have account.</Text>

        <Text
          style={{color: '#075E54', fontSize: 24}}
          onPress={() => navigation.navigate('SignUp')}>
          SignUp
        </Text>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signUpText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
