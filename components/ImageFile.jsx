import React, { useState } from 'react';
import { View, Image,Text, Modal,StyleSheet, TouchableOpacity } from 'react-native';

const ImageFile = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImagePress = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <TouchableOpacity
      style={{
        width:"100%" ,
        padding: 3,
        borderRadius: 10,
        // border:"1px solid green"
       
      }}
      onPress={() => handleImagePress(props.url)}
    >
      <Image
        source={{
          uri: props.url
        }}
        style={{
          // width: 200,
          minWidth:200,
          height: 200,
          // resizeMode: 'contain',
       
          borderRadius: 10,
        }}
        
      />

      {props.message&&<Text style={{paddingVertical:10,paddingHorizontal:5}}>{props.message}</Text>}



      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  chatContainer: {
    padding: 16,
  },
  message: {
    marginBottom: 16,
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 8,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#fff',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default ImageFile;
