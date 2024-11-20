import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet,ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { token } from '../../constants/constant';
import axios from 'axios';

const Data=[
    {
      "name": "Appointment Reminder",
      "time": "08:00 AM",
      "supportingText": "Your appointment with Dr. Smith is scheduled for 8:00 AM today. Please arrive 15 minutes early."
    },
    {
      "name": "Medication Reminder",
      "time": "09:00 AM",
      "supportingText": "It's time to take your morning medication. Don't forget your blood pressure pill."
    },
    {
      "name": "Health Tip",
      "time": "10:00 AM",
      "supportingText": "Stay hydrated today. Drink at least 8 cups of water to keep your body functioning optimally."
    },
    {
      "name": "Appointment Reminder",
      "time": "12:00 PM",
      "supportingText": "Your follow-up appointment with Dr. Lee is at 12:00 PM. Please ensure you have your medical history ready."
    },
    {
      "name": "Medication Reminder",
      "time": "02:00 PM",
      "supportingText": "It's time for your afternoon medication. Remember to take your pain relievers with a meal."
    },
    {
      "name": "Health Tip",
      "time": "03:00 PM",
      "supportingText": "Take a short walk to improve your circulation and boost energy in the afternoon."
    },
    {
      "name": "Appointment Reminder",
      "time": "04:30 PM",
      "supportingText": "Your physical therapy session starts at 4:30 PM. Wear comfortable clothes and shoes."
    },
    {
      "name": "Medication Reminder",
      "time": "06:00 PM",
      "supportingText": "Evening medication time. Ensure you’ve taken your heart medication with food."
    },
    {
      "name": "Health Tip",
      "time": "08:00 PM",
      "supportingText": "End your day with some light stretching exercises to relax your muscles and improve sleep quality."
    },
    {
      "name": "Final Reminder",
      "time": "09:30 PM",
      "supportingText": "Last reminder for the day: Log your daily health stats in your health tracking app before bed."
    }
  ]
  

const NotificationScreen = () => {
    const URl=process.env.EXPO_PUBLIC_API_URL_Dev
console.log(URl)
    const [notificationData, setNotificationData] = useState({
        loading: true,
        data: [],
        // data:Data,
        error: null,
      });


      const truncateString = (str, length) => {
        if (str?.length <= length) return str;
        return str?.slice(0, length) + '...';
      };
      

      useEffect(() => {
         
    const fetchNotifications = async () => {
        try {
   
          setNotificationData((prevState) => ({
            ...prevState,
            loading: true,
          }));
  
         
          const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL_LOCALHOST}/request_handling/user_notifications/?beneficiary_id=beneficiary%7C18380335-3979-45c9-b6fb-4f5d1e0f2def`,{  headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',
          },} );
  

          setNotificationData({
            loading: false,
            data: response.data, 
            error: null,
          });
        } catch (error) {
        
          setNotificationData({
            loading: false,
            data: [],
            error: error.message || 'An error occurred while fetching notifications',
          });
        }
      };
  
   
      fetchNotifications();
    }, []);


    const groupedDataArray = useMemo(() => {
        const groupedDataMap = new Map();
    
        // Group events by date
        notificationData.data.forEach((item) => {
          const date = item.created_at.split(" ")[0]; // Extract the date part
          if (!groupedDataMap.has(date)) {
            groupedDataMap.set(date, []);
          }
          groupedDataMap.get(date).push(item);
        });
    
        // Convert Map to array and sort events by timestamp within each date
        return Array.from(groupedDataMap, ([date, notificationData]) => ({
          date,
          notificationData,
        }));
      }, [notificationData]);

      const sortedGroupedDataArray = groupedDataArray.map(({ date, notificationData }) => ({
        date,
        notificationData: notificationData.slice().sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA - dateB;
        }),
      }));



console.log(sortedGroupedDataArray,"dfsk")

const formatDate = (inputDate) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    const input = new Date(inputDate);
  
    const isSameDay = (date1, date2) => 
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  
    if (isSameDay(input, today)) {
      return "Today";
    } else if (isSameDay(input, yesterday)) {
      return "Yesterday";
    } else {
      return inputDate;
    }
  };

  if (notificationData.loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#125B73" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { /* Add back navigation functionality here */ }}>
          <Ionicons name="arrow-back" size={24} color="#125B73" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification</Text>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            {sortedGroupedDataArray.map((notification, index) => (
                <View key={index} >
                <Text style={styles.sectionTitle}> {`${formatDate(notification.date)} (${notification.notificationData.length})`}</Text>
               {notification.notificationData.map((notification,index)=>{
                return <View key={index}  style={styles.notificationCard}>
                <View style={styles.notificationInfo}>
                  <AntDesign name="clockcircleo" size={20} color="black" />
                  <View style={styles.notificationTextContainer}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationSubtitle}>
                      {truncateString(notification.description,35)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.notificationTime}>{notification.created_at.split(" ")[1].slice(0, 5)}</Text>
              </View>
 } )}
              </View>
            ))}

            {/* <View style={styles.notificationCard}>
              <View style={styles.notificationInfo}>
                <FontAwesome name="glass" size={24} color="#4A4A4A" />
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationTitle}>Drink water</Text>
                  <Text style={styles.notificationSubtitle}>
                    Supporting line text lorem
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Drink water</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          {/* <View style={[styles.section, styles.sectionBottom]}>
            <Text style={styles.sectionTitle}>Yesterday (5)</Text>

            <View style={styles.notificationCard}>
              <View style={styles.notificationInfo}>
                <FontAwesome name="glass" size={24} color="#4A4A4A" />
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationTitle}>Drink water</Text>
                  <Text style={styles.notificationSubtitle}>
                    Supporting line text lorem
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Drink water</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE9FD',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#125B73',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  section: {
    paddingBottom: 16,
  },
  sectionBottom: {
    marginTop: 16,
  },
  sectionTitle: {
    color: '#4A4A4A',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTextContainer: {
    marginLeft: 12,
  },
  notificationTitle: {
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationSubtitle: {
    color: '#7A7A7A',
    fontSize: 14,
    marginTop: 4,
  },
  notificationTime: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#E1F5FE',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBE9FD',
  },
});

export default NotificationScreen;
