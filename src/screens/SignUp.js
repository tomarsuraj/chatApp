import React, {useState, useContext} from 'react';
import {Text, View, TextInput} from 'react-native';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// Usrr Context

// globalStyles
import {globalStyles} from '../globalStyles';
import AppButton from '../components/AppButton';

const SignUp = ({navigation}) => {
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        firestore()
          .collection('Users')
          .doc(data.user.uid)
          .set({
            name,

            email,
            bio,
            uid: data.user.uid,
          })
          .then(() => {
            console.log('User added!');
          });
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
      <Text style={globalStyles.titleText}>SignUp</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Enter Name"
        onChangeText={(val) => setName(val)}
        value={name}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Bio"
        onChangeText={(val) => setBio(val)}
        value={bio}
      />
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

      <AppButton title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};

export default SignUp;
