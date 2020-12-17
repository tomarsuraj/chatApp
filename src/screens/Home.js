import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserContext} from '../context/Context';

const Home = () => {
  const {appData} = useContext(UserContext);
  return (
    <View>
      <Text>Home {appData.isAuthenticated ? <Text>True</Text> : null}</Text>
      {appData.user ? (
        <>
          <Text>{appData.user.name}</Text>
          <Text>{appData.user.uid}</Text>
        </>
      ) : (
        <Text>User dosent exist</Text>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
