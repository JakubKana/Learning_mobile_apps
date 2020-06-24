import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, PermissionsAndroid, Alert } from "react-native";
import { Colors } from "../constants/colors";

import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";

interface ImagePickerProps {
  onImageTake: (uri: string) => void;
}

const ImgPicker = (props: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string>("");

  const verifyPermissions = async () => {
    const result = await PermissionsAndroid.check("android.permission.CAMERA");
    if (result === false) {
      Alert.alert("Insufficient permissions!", "You need to grant camera permissions to use this app", [
        { text: "Okay" },
      ]);
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    ImagePicker.launchCamera(
      {
        title: "Take a photo",
        allowsEditing: true,
        maxHeight: 200,
        quality: 0.5,
      },
      (response: ImagePickerResponse) => {
        setPickedImage(response.uri);
        props.onImageTake(response.uri);
      },
    );
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export { ImgPicker };
