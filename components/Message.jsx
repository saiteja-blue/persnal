import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image } from 'react-native';

const Message = (props) => {
  return (
     <View>
        <Text style={{ color: 'inherit' }}>{props.message}</Text>
     </View>
  )
}



export default Message