import React, { LegacyRef, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Dimensions,
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface Props {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  labelColor?: string;
  value?: any;
  onChangeText?: (text: string) => void;
}

const Input: React.FC<Props> = ({
  placeholder,
  keyboardType,
  labelColor,
  onChangeText,
  value,
}) => {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");
  return (
    <View
      style={{
        padding: 15,
        margin: 10,
        backgroundColor: "#e6e6e6",
        borderRadius: 5,
        width: windowWidth * 0.95,
      }}
    >
      {focus && (
        <Text style={{ color: labelColor ?? "gray" }}>{placeholder}</Text>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          value={value}
          style={{
            fontSize: 16,
            width: "90%",
          }}
          onChangeText={(text) => {
            setText(text);
            if (onChangeText) {
              onChangeText(text);
            }
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            if (!text) {
              setFocus(false);
            }
          }}
          placeholder={!focus ? placeholder : ""}
          keyboardType={keyboardType}
        />
        {focus && (
          <AntDesign
            onPress={() => {
              if (onChangeText) {
                setText("");
                onChangeText("");
              }
            }}
            name="close"
            size={20}
            color="gray"
          />
        )}
      </View>
    </View>
  );
};

export default Input;
