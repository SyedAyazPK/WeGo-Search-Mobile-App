import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  TextInput,
} from 'react-native';
import {colors} from '../utills/colors';

const SearchBar = ({placeHolder, text, onChangeText, onPress, onFocus}) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeHolder}
        value={text}
        onFocus={onFocus}
        style={styles.searchInput}
      />

      <TouchableOpacity onPress={onPress}>
        <Image style={styles.micIcon} source={require('../assets/search.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.bgColorInput,
  },
  searchInput: {
    width: '80%',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  micIcon: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
});

export default SearchBar;