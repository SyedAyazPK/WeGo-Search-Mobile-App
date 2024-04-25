import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";

const items = [
  // name key is must. It is to show the text in front
  { id: 1, name: "angellist" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "etsy" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" },
];

const SearchablePicker = ({data, callBack}) => {

  return (
    <SearchableDropdown
      onTextChange={(text) => console.log(text)}
      // Listner on the searchable input
      onItemSelect={(item) => callBack(item)}
      // Called after the selection
      containerStyle={{ padding: 5 }}
      // Suggestion container style
      textInputStyle={{
        // Inserted text style
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#FAF7F6",
      }}
      itemStyle={{
        // Single dropdown item style
        padding: 10,
        marginTop: 2,
        backgroundColor: "#FAF9F8",
        borderColor: "#bbb",
        borderWidth: 1,
      }}
      itemTextStyle={{
        // Text style of a single dropdown item
        color: "#222",
      }}
      itemsContainerStyle={{
        // Items container style you can pass maxHeight
        // To restrict the items dropdown hieght
        maxHeight: "60%",
      }}
      items={data}
      // Mapping of item array
      defaultIndex={2}
      // Default selected item index
      placeholder="Search Service"
      // place holder for the search input
      resPtValue={false}
      // Reset textInput Value with true and false state
      underlineColorAndroid="transparent"
      // To remove the underline from the android input
    />
  );
};

export default SearchablePicker;

const styles = StyleSheet.create({
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headingText: {
    padding: 8,
  },
});
