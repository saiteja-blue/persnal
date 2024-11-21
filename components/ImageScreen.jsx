import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { token } from '../constants/constant';

import Ioniconss from '@expo/vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';



const formatFileSize = (sizeInBytes) => {
    const sizeInKB = sizeInBytes / 1024;
    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(1)} kB`; // Converts to KB with 1 decimal place
    } else {
      const sizeInMB = sizeInKB / 1024;
      return `${sizeInMB.toFixed(1)} MB`; // Converts to MB with 1 decimal place
    }
  };

const ImageSelected=({results})=>{
    return (
       <>
        {results?.assets[0].uri && (
            <Image source={{ uri: results?.assets[0].uri }} style={styles.image} />
          )}
       </>
    )
}
const DocumentSelected=({results})=>{
    console.log(results)
   return( 
   

    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
    <Ionicons name="document-text" size={60} color="blue" />
    
    {results?.assets[0].name && (
      <Text style={{ fontSize: 20, textAlign: 'center', }}>
        {results.assets[0].name}
      </Text>
    )}
    
    {results?.assets[0].size && (
      <Text style={{ fontSize: 16 }}>
        {formatFileSize(results.assets[0].size)}
      </Text>
    )}
  </View>
  
   )
}

const ImagePickerWithTextInput = ({media,results,setMedia,setShowDropdown,setResults }) => {
  const [imageUri, setImageUri] = useState(null);
  const [text, setText] = useState('');

 
  
//   const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNTYyMjM1LCJpYXQiOjE3MzEzODcwNDcsImp0aSI6IjdiOTdiOGU4YjVhNjQxNTVhNzIzNzU5NjVmNWQ1OTExIiwidXNlcl9pZCI6ImFkbWluIiwibmFtZSI6IkFkbWluIEFkbWluIiwiZW1haWwiOiJhZG1pbkBjbGluZXN0cmEuY29tIiwic2l0ZSI6ImV4YW1wbGUuY29tIiwiYWN0dWFsX3VzZXJfaWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.yDxgz73cazIoXlbaYgZkgJm-iN8PWW6fpj1dmk_QqKs'
  const pickImage = async () => {
    // Ask for permission to access the gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSendMessage = async () => {
    if (!results.canceled) {
      const fileUri = results?.assets[0]?.uri;
  
      console.log(fileUri, "fileUrifileUrifileUri");
  
      try {
        // Read the file
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists) {
          console.error('File does not exist:', fileUri);
          return;
        }
  
        const data = {
          message: `${text}`,
          file_type: media == "image" ? 'img' : media == "document" ? "pdf" : null,
          beneficiary_number: '919133150872',
          beneficiary_id: "beneficiary|27e74ec8-f3a9-4d67-9b36-25fedc76bf50",
          encounter_id: 'all',
          header_media_type: media == "image" ? "image" : media == "document" ? "document" : null,
        };
  
        const file = {
          uri: fileInfo.uri,
          name: results?.assets[0]?.name || 'selected-file',
          type: media == "image" ? 'image/jpeg' : 'application/pdf', // Adjust based on the file type
        };
  
        
  
        const formData = new FormData();
        formData.append('file', file);
        formData.append('file_type', data.file_type);
        formData.append('beneficiary_number', data.beneficiary_number);
        formData.append('encounter_id', data.encounter_id);
        formData.append('beneficiary_id', data.beneficiary_id);
        formData.append('header_media_type', data.header_media_type);
        formData.append('message', data.message);
  
        // Send FormData to the backend
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL_LOCALHOST}/wa-engage/send_app_message`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            'ngrok-skip-browser-warning': 'skip-browser-warning',
            'Accept': 'application/json, text/plain, */*'
          },
        });
  
        setMedia(false);
        setShowDropdown(false);
        console.log('Upload successful:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
        setMedia(false);
        setShowDropdown(false);
      }
    }
  };

  const handleClose=()=>{
    setMedia('')
    setResults(null)
    setShowDropdown(false)
  }

  return (
    <View style={styles.container} >

<TouchableOpacity onPress={handleClose} style={styles.closeButton} >
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

    {media=="image"?<ImageSelected results={results}/>: media=="document"?<DocumentSelected results={results}/>:null}
      
      {/* Input field and Send icon positioned at the bottom */}
      <View style={styles.inputContainer}>
     
        <View style={{flex:1, borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#c9d4f1', paddingHorizontal: 10 ,paddingVertical: 15,display:"flex",flexDirection:"row",justifyContent:"space-between",gap:10,position:"relative"}}>
      
    
      <TextInput placeholder="Add message" value={text} onChangeText={setText} style={{ fontSize: 14, color: '#000',flex: 1,borderWidth: 0,outline: 'none'}}  
    />
      
         
    </View>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: "center",

  
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    left: 15,
    zIndex: 1, // Ensure it's above other elements
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  inputContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    // backgroundColor: 'white',
    gap:5
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  sendButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagePickerWithTextInput;
