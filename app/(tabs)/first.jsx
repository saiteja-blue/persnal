import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView,Image,StyleSheet, Button ,Dimensions,TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
// import * as ImagePicker from 'react-native-image-picker';

import {launchImageLibrary} from 'react-native-image-picker';
// import * as DocumentPicker from 'react-native-document-picker'
import InformationFile from '../../components/InformationFile';
// import send from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Data from "../../components/data.json"
import BaseBubble from './BaseBubble';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

import axios from 'axios';
import ImageScreen from '../../components/ImageScreen';

import { token } from '../../constants/constant';
import QuickResponse from "./QuickResponse"




const App = () => {

  const { height } = Dimensions.get('window');

    const [selectedIMage,setSelectedImage]=useState(null)
    const [selectedVideo,setSelectedVideo]=useState(null)
   const [selectedDocument,setSelectedDocument]=useState(null)
   const [showDropdown, setShowDropdown] = useState(false);

   const [message, setMessage] = useState('');

   const MediaPopUp=useRef(null)
   const [isPJSocketDisconnected, setIsPJSocketDisconnected] = useState(true); 
   const [currentMessageSocketData,SetCurrentMessageSocketData]=useState([])
   const [events,setEvents]=useState([])
   const [quickResponse,setQuickResponse]=useState([])
   const [media,setMedia]=useState(null)
   const [results,setResults]=useState(null)
   const [loading, setLoading] = useState(false);

console.log(quickResponse,"quickResponse")
const [ws, setWs] = useState(null);

const socketRef = useRef();

//todaay
const [scrollDown, setScrollDown] = useState(false)
const [eventPage, setEventPage] = useState(2);
const eventContainerRef = useRef(null);
const [prevEventPageLength, setPrevEventPageLength] = useState(5);
const [image,SetIMage]=useState(false)
 

console.log(currentMessageSocketData,"currentMessageSocketData")


   
const handleImageSelection = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [4, 3],
    quality: 1,
  });
  if(!result.canceled){
    setMedia("image")
    setResults(result)
    return
  }
  
  console.log(result,"hjkh");


  if (!result.canceled) {
    const fileUri = result.assets[0].uri;
    setShowDropdown(false)
    const data = {
      // message: `${currentMessage}`,
      file_type: 'img',
      beneficiary_number: '919133150872',
      beneficiary_id: "beneficiary|27e74ec8-f3a9-4d67-9b36-25fedc76bf50",
      encounter_id: 'all',
      header_media_type:"image"
    };


    const response = await fetch(fileUri);
    const blob = await response.blob();
    const file = new File([blob], result.assets[0].name || 'selected-image', { type: blob.type });

    console.log(response,file)
    const formData = new FormData();
    formData.append('file', file); 
    formData.append('file_type', data.file_type);
    formData.append('beneficiary_number',data.beneficiary_number)
    formData.append('encounter_id',data.encounter_id)
    formData.append('beneficiary_id',data.beneficiary_id)
    formData.append('header_media_type',data.header_media_type)



    try {
      // Send FormData to the backend with Axios
      const response = await axios.post('http://127.0.0.1:8000/wa-engage/send_app_message', formData, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxNDkwODI2LCJpYXQiOjE3MzEzODcwNDcsImp0aSI6ImVmMDM4ZjNhZjI1YzQ3OGY4OWRmMTQ4NTkzY2Q2NjBhIiwidXNlcl9pZCI6ImFkbWluIiwibmFtZSI6IkFkbWluIEFkbWluIiwiZW1haWwiOiJhZG1pbkBjbGluZXN0cmEuY29tIiwic2l0ZSI6ImV4YW1wbGUuY29tIiwiYWN0dWFsX3VzZXJfaWQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.MIp22WOfaXU_uUCLbMAwnDz2UQ1kp1q2TVqE6fgzM9g`,
          // 'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDocumentSelection = async () => {
   
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf','application/doc','application/docx'],
        copyToCacheDirectory: false, 
    });

    if(!result.canceled){
      setMedia("document")
      setResults(result)
      return
    }

    const data = {
      // message: `${currentMessage}`,
      file_type: 'pdf',
      beneficiary_number: '919133150872',
      beneficiary_id: "beneficiary|27e74ec8-f3a9-4d67-9b36-25fedc76bf50",
      encounter_id: 'all',
      header_media_type:"document"
    };

    if (!result.canceled) {
    const fileUri = result?.assets[0]?.uri;


    const response = await fetch(fileUri);
    const blob = await response.blob();


    const file = new File([blob], result.assets[0].name || 'selected-file', { type: blob.type });
    console.log(result,"document")
    console.log(file,"ijdfso")
    const formData = new FormData();


    // Create FormData
    formData.append('file', file); 
    formData.append('file_type', 'pdf');
    formData.append('beneficiary_number',data.beneficiary_number)
    formData.append('encounter_id',data.encounter_id)
    formData.append('beneficiary_id',data.beneficiary_id)
    formData.append('header_media_type',data.header_media_type)
                        
    try {
      // Send FormData to the backend with Axios
      const response = await axios.post('http://127.0.0.1:8000/wa-engage/send_app_message', formData,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }});
        setShowDropdown(false)

      console.log('Upload successful:', response.data);
    } catch (error) {
      setShowDropdown(false)
      console.error('Error uploading image:', error);
    
    }
  }
}

   






  const handleVideoSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    

    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
    }
  };



// const handleAudioSelection = async () => {
//   try {
//     const options = {
//       mediaType: 'audio', // restrict to audio files only
//     };

//     const result = await launchImageLibrary(options);
//     if (result.didCancel) {
//       console.log('User cancelled audio picker');
//     } else if (result.errorCode) {
//       console.log('Audio picker error: ', result.errorMessage);
//     } else {
//       const audioUri = result.assets?.[0]?.uri;
//       console.log(audioUri, "Audio URI");
//       // Use the audio URI (e.g., store it in state)
//     }
//   } catch (error) {
//     console.log('Error selecting audio: ', error);
//   }
// };

const handleAudioSelection = async () => {
   
  const result = await DocumentPicker.getDocumentAsync({
    type: 'audio/*',
      copyToCacheDirectory: false, 
  });

  if (result.type === 'success') {
      setDocument(result);
      console.log('Selected document:', result);
  } else {
      console.log('Document picking was canceled');
  }
};

const dropDownMedia = [
  {
    name: "Upload Image",
    action: handleImageSelection,
    size: 17,
    iconFrom:FontAwesomeIcon,
    icon: "image" // Add the FontAwesome icon directly
  },
  {
    name: "Upload Document",
    action: handleDocumentSelection,
    size: 20,
    iconFrom:AntDesign,
    icon: "addfile" // Add the FontAwesome icon directly
  },
  // {
  //   name: "Upload Video",
  //   action: handleVideoSelection,
  //   size: 20,
  //   iconFrom:Feather,
  //   icon: "video" // Add the FontAwesome icon directly
  // },
  // {
  //   name: "Upload Audio",
  //   action: handleAudioSelection,
  //   size: 20,
  //   iconFrom:FontAwesomeIcon5,
  //   icon: "file-audio" // Add the FontAwesome icon directly
  // }
];


const handleSubmitMessage = async (currentMessage) => {
  setQuickResponse([])
  const formData = new FormData();
  const data = {
    message: `${currentMessage}`,
    file_type: 'text',
    beneficiary_number: '919133150872',
    beneficiary_id: "beneficiary|27e74ec8-f3a9-4d67-9b36-25fedc76bf50",
    encounter_id: 'all',
  };

  formData.append('message', data.message); 
  formData.append('file_type', data.file_type);
  formData.append('beneficiary_number',data.beneficiary_number)
  formData.append('encounter_id',data.encounter_id)
  formData.append('beneficiary_id',data.beneficiary_id)


  const headers = { 'Accept': 'application/json, text/plain, */*',    'Authorization': `Bearer ${token}` };

  try {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/wa-engage/send_app_message`, formData,{
      headers: headers});
    console.log('Response:', response.data);
    setMessage("")
  } catch (error) {
    console.error('Error:', error);
    setMessage("")
  }
};

const handleOutsidePress = () => {
  if (showDropdown) {
    setShowDropdown(false);
  }
};


useEffect(() => {
  // console.log('api url--->', apiUrl);
  
  if (isPJSocketDisconnected == true) {
      setIsPJSocketDisconnected(false);
      const client_id = "sdflsfljnsd";
      //   const site = Cookies.get("site");
      // const pj_sockets = new WebSocket(
      //     `ws://localhost:8001/sockets/ws/events/${site}/${client_id}`);
      const site="example.com"
      const pj_sockets = new WebSocket(
          `${process.env.EXPO_PUBLIC_SOCKET_URL}/sockets/ws/events/${site}/${client_id}`);
      if (pj_sockets.readyState === WebSocket.OPEN) {
          return;
      }
      pj_sockets.onopen = () => {
          console.log("WebSocket connected actions bottm");
      };
      pj_sockets.onmessage = (event) => {
        
          console.log(event,"hiiiii")

         let data= JSON.parse(event.data);
         if(data.event_data.direction !== 'outgoing'){
          // let quickResponse= JSON.parse(data.event_data.quick_responses);
          const responsesArray = JSON.parse(data.event_data.quick_responses.replace(/'/g, '"'));
          setQuickResponse(responsesArray)
          console.log(responsesArray,"quickResponse")
         }
         console.log(data,"helllo")
        

         if ("beneficiary|27e74ec8-f3a9-4d67-9b36-25fedc76bf50" == data["beneficiary_id"]) {
          setEvents((p)=>[...p,data])
        }
        //  SetCurrentMessageSocketData((p)=>[...p,data])

      };
      pj_sockets.onclose = (event) => {
          setIsPJSocketDisconnected(true);
      };
      pj_sockets.onerror = (error) => {
          setIsPJSocketDisconnected(true);
          pj_sockets.close();
      };
      // setpj_sockets1(pj_sockets)
      setWs(pj_sockets);
      return () => {
          if (ws) {
              ws.close();
          }
      };
  }
  // const accessToken = AsyncStorage.getItem('accessToken');
  // console.log("accessToken in sockets===>", accessToken);
  // if (beneficiary_id) {
  //     fetchBeneficiaryEvents(beneficiary_id);
  // }
}, [isPJSocketDisconnected]);

const checkScrollPosition = () => {
  const eventContainer = eventContainerRef.current;
  if (eventContainer) {
    if (
      (eventContainer.scrollHeight - 1500) - eventContainer.scrollTop <=
      eventContainer.clientHeight
    ) {
      setScrollDown(false);
    } else {
      setScrollDown(true);
    }
  }
};





useEffect(() => {
  // const source = axios.CancelToken.source()
  // setLoading(true);
  setLoading(true);
  
  axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/beneficiary_base/beneficiary_events_data?beneficiary_id=${"beneficiary|27e74ec8-f3a9-4d67-9b36-25fedc76bf50"}&encounter_id=${"all"}&page=${1}&limit=10`,{  headers: {
      'Authorization': `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data',
     " Content-Type": "application/json"

    },} 

  ).then((res) => {
   
    console.log(res.data.data,"dataaaa")
    setEvents(res.data.data)
    setLoading(false)
    // checkScrollPosition()
  }).catch((err) => {
    if (axios.isCancel(err)) {
      //console.log('Request canceled')
    } else {
      //  console.error('events error',err)
    }
    setLoading(false); 
  })

  return () => {
    // source.cancel()
    console.log("something is happening")
  }
}, []);


const groupedDataArray = useMemo(() => {
  const groupedDataMap = new Map();

  events?.forEach((item) => {
    const date = item.timestamp.split(" ")[0];

    if (!groupedDataMap.has(date)) {
      groupedDataMap.set(date, []);
    }

    groupedDataMap.get(date).push(item);
  });

  return Array.from(groupedDataMap, ([date, events]) => ({
    date,
    events,
  }));
}, [events]);

const sortedGroupedDataArray = groupedDataArray.map(({ date, events }) => ({
  date,
  events: events.slice().sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateA - dateB;
  }),
}));

console.log(sortedGroupedDataArray,"sprt")

 useEffect(() => {
  
  // Scroll to the bottom when groupedDataArray changes (e.g., when loading new messages)
  if (eventPage == 1 || eventPage == 2) {
    eventContainerRef.current?.scrollToEnd({ animated: false });
  }
}, [groupedDataArray,media]);

const getBeneficiaryEventsData = async (eventPage) => {
  try {
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL_LOCALHOST}/beneficiary_base/beneficiary_events_data?beneficiary_id=${"beneficiary|7ac04d9b-7040-48a0-ac2c-ba1c2ddcd524"}&encounter_id=${"all"}&page=${eventPage}&limit=20`, 
    );
    return res.data.data;
  } catch (error) {
    console.log('event error', error);
  }
};


const loadMoreEvents = async () => {
  // if (eventLoading) return;
  // setEventLoading(true);

  try {
    const oldEventData = prevEventPageLength > 0
      ? await getBeneficiaryEventsData( eventPage)
      : null;

    // setEventLoading(false);
    if (oldEventData && oldEventData.length > 0) {
      // setPrevEventPageLength(oldEventData.length);
      setEvents((prevEvents) => [...oldEventData, ...prevEvents]);
      setEventPage((prev) => prev + 1);
      // eventContainerRef.current.scrollTo({
      //   y: oldEventData.length * 100, // Adjust based on item height
      //   animated: false,
      // });
    }
  } catch (error) {
    console.error("Error loading more events:", error);
    // setEventLoading(false);
  }
};


const handleScroll = (event) => {
  const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
  const scrollTop = contentOffset.y;
  const clientHeight = layoutMeasurement.height;
  const scrollHeight = contentSize.height;

  if (scrollTop <= 0) {
    // loadMoreEvents();
  }
};

console.log(events,"ssssss")



  return (
    <View  style={{ flex: 1,}}>
    {media?<ImageScreen results={results} media={media} setMedia={setMedia} setShowDropdown={setShowDropdown} setResults={setResults}/>:<View  style={{ flex: 1,}}>
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
         {/* Header */}
       
          <View style={{ flex: 1, backgroundColor: '#F5F5F5',  }}>
        
      <View style={{flexDirection:'row',justifyContent:"center", alignItems: 'center',backgroundColor:"#125B73",paddingTop:30,paddingBottom:15,color:"white"  }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color:"white" }}>Cura AI</Text>
        <Icon name="sync" size={20} color="white" style={{ marginLeft: 5 }} />
      </View>

      
   
      
<View style={{paddingHorizontal:20,paddingBottom:20,flex: 1,}}>
      {/* Scrollable Content */}
      {loading?     <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>:<ScrollView ref={eventContainerRef}   onScroll={handleScroll}   >
      

      

        <View >
           {
            sortedGroupedDataArray.length > 0 &&
            sortedGroupedDataArray.map((obj) => (
              <View key={obj.date} style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: '#BDBDBD' }} />
                  <View>
                    <Text style={{ fontSize: 12 }}>
                      {new Date(obj.date.split(" ")[0]).toLocaleDateString("en-GB")}
                    </Text>
                  </View>
                  <View style={{ flex: 1, height: 1, backgroundColor: '#BDBDBD' }} />
                </View>
                {obj.events.map((event, index) => {

return <React.Fragment key={index}>
{event.actionable === false ? (
  <View style={{ marginTop: 20, alignItems: 'center',}}>
    <View style={{  flexDirection: 'row', justifyContent: 'center', position: 'relative' }}>
      {/* <StatusNotifyPill
        index={index}
        context={event.is_context_dynamic ? event.event_data.message.replace(/_/g, ' ') : event.event_type.replace(/_/g, ' ')}
      /> */}
       <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          backgroundColor: '#D1D5DB', // equivalent to bg-gray-100
          color: '#1f2937', // equivalent to text-gray-800
          fontSize: 14, // equivalent to text-sm
          paddingVertical: 5, // equivalent to py-[5px]
          paddingHorizontal: 10,
          borderRadius: 4, // rounded corners
          textTransform: 'capitalize', // capitalize text
        }}
      >
       {event.is_context_dynamic ? event.event_data.message.replace(/_/g, " ") : event.event_type.replace(/_/g, " ")}
      </Text>
    </View>
      {/* <View style={{ position: 'absolute', top: 28, transform: [{ scale: 0 }], transition: 'transform 0.2s', borderRadius: 4, backgroundColor: '#4B5563', padding: 8 }}>
        <Text style={{ fontSize: 10, color: '#FFFFFF' }}>
          {getTimeFormat(event.timestamp)}
        </Text>
      </View> */}
    </View>
  </View>
):
<View style={{ marginBottom:15 }}>
<BaseBubble key={index} {...event}/>
</View>

}
</React.Fragment>
                })}
              </View>
            ))
           }

          {/* {currentMessageSocketData.map((currentMedia,index)=>{
         return  <BaseBubble key={index} {...currentMedia}/>
          })} */}
        </View>

      </ScrollView>}

      {/* Upload Section */}
      {/* <ScrollView horizontal  contentContainer 
      showsHorizontalScrollIndicator={false} > */}
     
     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexShrink: 0 }}>
     {quickResponse.length>0 && <QuickResponse quickResponse={quickResponse} handleSubmitMessage={handleSubmitMessage}/>
      
     }
    </ScrollView>
      
{/*       
      </ScrollView> */}

      {/* Ask Qura Input */}
      <View style={{ marginTop: 20, borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#c9d4f1', paddingHorizontal: 10 ,paddingVertical: 15,display:"flex",flexDirection:"row",justifyContent:"space-between",gap:10,position:"relative"}}>
      {showDropdown && (
        <View style={{
          position: 'absolute', bottom: height * 0.08, left: 10, backgroundColor: '#fff',
          borderRadius: 5, paddingVertical: 10,paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3, shadowRadius: 5, elevation: 5,  border:"1px solid #808080",
        }} ref={MediaPopUp}>
          {
            dropDownMedia.map((media,index)=>{
              const IconComponent = media.iconFrom;
              console.log(IconComponent,"IconComponent")
              return <TouchableOpacity key={index} onPress={media.action} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5,columnGap:10 }}>
              <IconComponent name={media.icon} size={media.size} color="#125873" style={{width:20}} />
              <Text style={{ fontSize: 14, color: '#000', }}>{media.name}</Text>
            </TouchableOpacity>
            })
          }
          

          
        </View>
      )}
      <TouchableOpacity onPress={toggleDropdown}>
         {!showDropdown? <AntDesign name='plus' size={24} color="#000" />:<Ionicons name='close' size={25} color="#000"/>}
        </TouchableOpacity>
        <TextInput placeholder="Ask Cura..." style={{ fontSize: 14, color: '#000',flex: 1,borderWidth: 0,outline: 'none'}}  value={message}
        onChangeText={setMessage}/>
        
          <Icon onPress={()=>handleSubmitMessage(message)} name={ message.trim().length>0? 'send' : 'keyboard-voice'} size={25} color="#405E93" />
           
      </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
    </View>
    
    }
    </View>
    
  );
};

const styles = StyleSheet.create({
  baseBubble: {
width:"100%",
display:"flex",
flexDirection:"column",
alignItems:"flex-end"
},
loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default App;