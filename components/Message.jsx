import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image } from 'react-native';

const Message = (props) => {
   const isOutgoing = props.direction === 'outgoing';

  return (
     <View style={{padding:10}}>
        <Text style={{ color: isOutgoing ? 'black' : 'white' }}>{props.message}</Text>
     </View>
  )
}



export default Message