import React from 'react';
import IMageFile from '../../components/ImageFile';
import DocumentFile from '../../components/DocumentFile';
import AudioFile from '../../components/audioFile';
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image ,StyleSheet} from 'react-native';
import Message from "../../components/Message"


const BaseBubble = (props) => {
    // console.log(props)
  return (
    //props.direction == 'outgoing'?styles.outgoing:styles.incoming
    <View style={props.event_data.direction == 'outgoing'?styles.outgoing:styles.incoming}>
      <View style={props.event_data.direction == 'outgoing'?styles.eventCompOutgoing:styles.eventCompIncoming}>
      {props.event_data?.type === "image" ? (
        <IMageFile {...props.event_data} />
      ) : props.event_data?.type === "document" ? (
        <DocumentFile {...props.event_data}
        />
      ) :props.event_data?.type==="audio"? (
        <AudioFile eventId={props.eventId}   user="admin"   url={props.event_data.url}
          filename={props.event_data.filename}context={props.event_data.message} time={props.timestamp}  name="Vamsi"
        />
      ):props.event_data?.type==="text"? (
        <Message {...props.event_data}
        />):null }
    </View>

    </View>
    
    
  );
};

const styles = StyleSheet.create({
  eventCompOutgoing: {
    backgroundColor:"#D8E9FD", 
    // borderColor: '#e5e7eb', 
    // borderWidth: 1,
    // borderRadius:5,
    borderTopLeftRadius: 12, // Rounded for the top left
    borderTopRightRadius: 12, // Rounded for the top right
    borderBottomLeftRadius: 12, // Rounded for the bottom left
    borderBottomRightRadius: 0, 
  //  color:"black",
    maxWidth: "70%", 
    overflow: 'hidden', 
    // padding: 10, 
    lineHeight: 24, 
    // marginBottom:10,
    
  },
  eventCompIncoming:{
    backgroundColor:"#125873" , 
    // borderColor: '#e5e7eb', 
    // borderWidth: 1,
    // borderRadius:5,
    borderTopLeftRadius: 12, // Rounded for the top left
    borderTopRightRadius: 12, // Rounded for the top right
    borderBottomLeftRadius: 0, // Rounded for the bottom left
    borderBottomRightRadius: 12, 
    color:"white",
    maxWidth: "70%", 
    overflow: 'hidden', 
    // padding: 10, 
    lineHeight: 24, 
    // marginBottom:10,
  },
  incoming:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start"
  },
  outgoing:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end"
  }
  
});


export default BaseBubble;
