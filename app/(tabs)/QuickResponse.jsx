import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const QuickResponse = ({ quickResponse, handleSubmitMessage }) => {
  return (
    <View style={{ flexDirection: 'row', }}>
      {quickResponse.map((response, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleSubmitMessage(response)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#d9d9d9',
            marginRight: 5,
            marginBottom: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 12, color: '#000' }}>{response}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickResponse;
