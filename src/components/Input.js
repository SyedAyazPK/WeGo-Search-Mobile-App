import React from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import {colors} from '../utills/colors';

const Input = ({placeHolder, text, onChangeText, isPassword, multiline, keyboardType, disable}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeHolder}
      value={text}
      secureTextEntry={isPassword}
      style={[styles.searchInput, {height: multiline ? 100 : 60}]}
      multiline={multiline}
      numberOfLines={multiline && 4}
      keyboardType={keyboardType || "default"}
      editable={disable}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    width: '100%',
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: colors.bgColorInput,
    borderRadius: 8,
    color: colors.black
  },
});

export default Input;