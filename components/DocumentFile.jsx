import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';

import { Ionicons } from '@expo/vector-icons';

const DocumentFile = (props) => {
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };
  



  const downloadDocument = async () => {
    try {
      const downloadUri = `${FileSystem.documentDirectory}${props.filename}`;

      const { uri } = await FileSystem.downloadAsync(props.url, downloadUri);
   
      // Alert.alert('Download Successful', `File downloaded to: ${uri}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Alert.alert('Download Error', 'Could not download the file.');
    }
  };

  return (
  //   <TouchableOpacity onPress={downloadDocument} style={{ flexDirection: 'row', alignItems: 'center',padding:10 }}>
  //   <Icon name="description" size={28} color="#405E93" style={{ marginRight: 10 }} />
  //   <View>
  //     <Text style={{ color: '#405E93', fontWeight: 'bold', fontSize: 16 }}>{props.filename}</Text>
  //     <Text style={{ color: '#405E93', fontSize: 14 }}>Size: 1.2 MB</Text>
  //   </View>
  // {/* </View> */}
  // </TouchableOpacity>

  <TouchableOpacity
  style={{ flexDirection: 'column',padding:3,}} onPress={downloadDocument}>
  <View
    style={{
      backgroundColor: 'white',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
      
  
    }}
  >
    <Ionicons name="document-text" size={60} color="blue" />
    
   
  </View>
  <View>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          flexWrap: 'wrap',
          color:"gray"
        }}
      
      >
        {truncateString(props.filename,30)}
      </Text>
      <Text style={{ fontSize: 14,textAlign: 'center',  color:"gray" }}>Size: 1.2 MB</Text>
    </View>

  {props.message&&<Text style={{paddingVertical:10,paddingHorizontal:5}}>{props.message}</Text>}
</TouchableOpacity>
  )
}

export default DocumentFile