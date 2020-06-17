import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { ActionType } from "../../store/reducers/types";

type InputProps = TextInputProps & {
  id: string;
  label: string;
  errorText: string;
  required?: boolean;
  email?: string;
  min?: number;
  max?: number;
  minLength?: number;
  initialValue?: string;
  initiallyValid?: boolean;
  onInputChanged: (id: string, value: string, isValid: boolean) => void;
};

interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
  [name: string]: any;
}

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state: InputState, action: ActionType): InputState => {
  if (action.type === INPUT_CHANGE) {
    return {
      ...state,
      value: action.value,
      isValid: action.isValid,
    };
  }

  if (action.type === INPUT_BLUR) {
    return {
      ...state,
      touched: true,
    };
  }
  return state;
};

const Input = (props: InputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: !!props.initiallyValid,
    touched: false,
  });

  const { onInputChanged, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChanged(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChanged, id]);

  const textChangeHandler = (text: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "OpenSans-Bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "OpenSans-Regular",
    color: "#F00",
    fontSize: 13,
  },
});

export { Input };
