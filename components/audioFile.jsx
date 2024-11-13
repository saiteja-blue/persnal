import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Audio } from 'expo-av';

const AudioFile = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Replace this with your audio URL

  const playSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) setIsPlaying(false);
      });
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={{ flexDirection: 'row',alignItems:'center',width: '70%',  }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#D7E5F3',
          // padding: 10,
          borderRadius: 10,
          
        }}
      >
        <FontAwesomeIcon name="file-audio-o" size={24} color="#405E93" style={{ marginRight: 10 }} />
        <Text style={{ color: '#405E93', fontWeight: 'bold', fontSize: 16, flex: 1 }}>
          Audio File.mp3
        </Text>
        <TouchableOpacity onPress={playSound}>
          <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={24} color="#405E93" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioFile;
