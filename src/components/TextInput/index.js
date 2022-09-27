import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = (props) => {
    return (
      <View style={inputStyles.inputContainer}>
        <TextInput
          style={inputStyles.input}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.setValue}
          placeholderTextColor={props.placeholderTextColor || '#ddd'}
        />
        {props.errorText ? <Text style={inputStyles.error}>{props.errorText}</Text> : null}
      </View>
    );
  };
  const inputStyles = StyleSheet.create({
    inputContainer:{borderColor: "#ddd", borderWidth: 1, borderRadius: 8, paddingVertical: 0},
    input: {
      backgroundColor: "#fff",
      height: 49,
      color: "#000",
      borderRadius: 10,
      fontSize: 14,
      paddingHorizontal: 15
    },
    error: {
      fontSize: 13,
      color: "#FA060D",
      paddingTop: 8
    }
  });

  export default Input;