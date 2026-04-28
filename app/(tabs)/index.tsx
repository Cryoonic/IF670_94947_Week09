import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { copyAsync } from "expo-file-system";

export default function index() {
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();

    if (!permission.granted) {
      alert("Camera permission is required to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Media library permission is required to select a photo.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveImage = async () => {
    if (!image) {
      alert("No image to save!");
      return;
    }

    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required!");
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      alert("Image saved to gallery!");
    } catch (error) {
      console.log(error);
      alert("Failed to save image");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Albert - 00000094947</Text>
      <View style={styles.button}>
        <Button title="Open Camera" onPress={openCamera} />
      </View>
      <View style={styles.button}>
        <Button title="Open Gallery" onPress={openGallery} />
      </View>
      <View style={styles.button}>
        <Button title="Save Image" onPress={saveImage} />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
    width: 150,
  },
  image: {
    width: 250,
    height: 200,
    marginTop: 20,
  },
});
