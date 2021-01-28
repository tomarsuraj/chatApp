import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

//Icon
import IconI from 'react-native-vector-icons/Ionicons';
import IconO from 'react-native-vector-icons/Octicons';
import {SET_SEARCH_CHAT_BY_NAME} from '../context/action.type';
import {UserContext} from '../context/Context';

import {globalStyles} from '../globalStyles';
const HomeHeader = () => {
  const {appData, dispatch} = useContext(UserContext);
  const {searchChatByName} = appData;

  const [openSearchInput, setOpenSearchInput] = useState(false);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logContainer}>
        <Text style={styles.logText}>ChatApp</Text>
      </View>

      {openSearchInput ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={[globalStyles.input, {borderColor: '#fff', color: '#fff'}]}
            placeholder="Enter Name to Search"
            placeholderTextColor="#fff"
            onBlur={() => setOpenSearchInput(false)}
            autoFocus={true}
            value={searchChatByName}
            onChangeText={(val) =>
              dispatch({type: SET_SEARCH_CHAT_BY_NAME, payload: val})
            }
          />
        </View>
      ) : (
        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => {
              setOpenSearchInput(true);
            }}>
            <IconI name="search" color="#fff" size={24} style={styles.icon} />
          </TouchableOpacity>
          <IconO
            name="kebab-vertical"
            color="#fff"
            size={24}
            style={styles.icon}
          />
        </View>
      )}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
  },
  logContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  logText: {
    fontSize: 24,
    color: '#fff',
  },
  optionContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  searchContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    marginHorizontal: 15,
  },
});
