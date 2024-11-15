import React from 'react';
import { View, Image,Text } from 'react-native';

const ImageFile = (props) => {
  return (
    <View
      style={{
        
        padding: 3,
        borderRadius: 10,
        // border:"1px solid green"
       
      }}
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
    </View>
  );
};

export default ImageFile;
