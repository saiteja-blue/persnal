import React from 'react';
import { View, Image } from 'react-native';

const ImageFile = (props) => {
  return (
    <View
      style={{
        
        padding: 10,
        borderRadius: 10,
       
      }}
    >
      <Image
        source={{
          uri: props.url
        }}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
       
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default ImageFile;
