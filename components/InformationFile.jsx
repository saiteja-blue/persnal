import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image } from 'react-native';


const InformationFile = () => {
  return (
    <View>
    <View style={{ marginTop: 20 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Skin Peeling Allergy</Text>
    <Text style={{ fontSize: 14, color: '#000', marginTop: 5 }}>
      This is not harmful to your skin it can be prevented. This is your Condition.
    </Text>
  </View>
      <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>About Problem</Text>
      <Text style={{ fontSize: 14, color: '#000', marginTop: 5 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </View>
       <View style={{ marginTop: 20 }}>
       <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Suggestions</Text>
       <Text style={{ fontSize: 14, color: '#000', marginTop: 5 }}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
       </Text>
     </View>
     </View>
  )
}

export default InformationFile