import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';

const DocumentFile = (props) => {
  console.log(props.url)
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
    <TouchableOpacity onPress={downloadDocument} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon name="description" size={28} color="#405E93" style={{ marginRight: 10 }} />
    <View>
      <Text style={{ color: '#405E93', fontWeight: 'bold', fontSize: 16 }}>{props.filename}</Text>
      <Text style={{ color: '#405E93', fontSize: 14 }}>Size: 1.2 MB</Text>
    </View>
  {/* </View> */}
  </TouchableOpacity>
  )
}

export default DocumentFile