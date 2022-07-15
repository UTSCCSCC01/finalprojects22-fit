import React, { Component, useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  Button,
  Image,
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  View, 
  ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { patchUserProfile } from '../../controller/Profile/editProfileController';

export default function EditProfileScreen ({ route, navigation }) {

  const [didChange, setDidChange] = useState(false);
  const { data, image } = route.params;
  const [user, setUser] = useState(data)
  const [name, onChangeName] = useState(data.display_name);
  const [bio, onChangeBio] = useState(data.bio);
  const [imageChanged, setImageChanged] = useState(false);
  const [pImg, setPImg] = useState(image);

  /* update user record */
  const handleSave = async () => {
    /* bundle parameters into JSON format */

    // handle updated image upload 
    if (imageChanged) { 

    }

    const body = JSON.stringify({
      display_name: name,
      bio: bio,
    });
    
    /* patch user profile record */
    const json = await patchUserProfile(body);
  
    alert("Profile Successfully Updated!");
    navigation.goBack();
  }

  const pickImage = async () => {
    if (true) {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
      });

      if (!result.cancelled) {
          setImage(result.uri);
          setImageChanged(true);
      }
    }
  };


  const primaryOrange = '#FF8C42'
  const primaryPurple = '#4E598C'
  const secondaryPurple = '#717FC0'

  const styles = StyleSheet.create({
    nameInput: {
      marginTop: -10,
      marginLeft: 10,
      height: 40,
      borderBottomWidth: 1,
      paddingBottom: 0
    },
    bioInput: {
      height: 120,
      marginLeft: 30,
      borderWidth: 1,
      padding: 10,
    },
    appButtonContainer: {
      backgroundColor: primaryOrange,
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    appButtonText: {
      fontSize: 15,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
    pImgEdit: {
      justifyContent: "center", 
      alignItems: "center",
      flexDirection: 'column',
    },
  });

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={styles.pImgEdit}>
        <Image 
          source={{ uri: 'data:image/png;base64,'.concat(pImg) }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: primaryPurple,
            alignSelf: 'center',
          }} />
        <Button
          title="Upload Profile Picture"
          color={primaryOrange}
          onPress={() => pickImage()}
        /> 
      </View>
      <View style={{flexDirection: "row", paddingTop: 20, paddingLeft: 30, paddingRight: 30}}>
        <View>
          <Text style={{ color: primaryPurple, fontSize: 15, fontWeight: "bold"}}>Name:</Text>  
        </View>
        <View style={{flex:1}}>
          <TextInput
            color={primaryPurple}
            borderColor={primaryPurple}
            style={styles.nameInput}
            value={name}
            onChangeText={onChangeName}
            fontSize={15}
          />
        </View>
      </View>

      <View style={{flexDirection: "row", paddingTop: 20, paddingLeft: 30, paddingRight: 30}}>
        <View>
          <Text style={{ color: primaryPurple, fontSize: 15, fontWeight: "bold"}}>Bio:</Text>  
        </View>
        <View style={{flex:1}}>
          <TextInput
            multiline
            numberOfLines={4}
            color={primaryPurple}
            borderColor={primaryPurple}
            style={styles.bioInput}
            value={bio}
            onChangeText={onChangeBio}
            fontSize={15}
          />
        </View>
      </View>

      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            handleSave()
          }}
          style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}