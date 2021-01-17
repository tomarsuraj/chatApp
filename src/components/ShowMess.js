import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserContext} from '../context/Context';

const ShowMess = ({item}) => {
  const {appData, dispatch} = useContext(UserContext);

  return (
    <View style={styles.messContainer}>
      {appData.user.uid !== item.senderId ? (
        <View style={styles.leftMess}>
          <Text style={styles.mess}>{item.message}</Text>
          <Text style={styles.date}>
            {item.timeStamp.toDate().toLocaleTimeString()}
          </Text>
        </View>
      ) : (
        <View style={styles.rightMess}>
          <Text style={styles.mess}>{item.message}</Text>
          <Text style={styles.date}>
            {item.timeStamp.toDate().toLocaleTimeString()}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ShowMess;

const styles = StyleSheet.create({
  messContainer: {
    marginVertical: 5,
    marginHorizontal: 8,
  },

  leftMess: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
  },
  rightMess: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderRadius: 5,
    padding: 5,
  },
  date: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 3,
  },
  mess: {
    fontSize: 16,
    paddingRight: 10,
    paddingLeft: 5,
  },
});
