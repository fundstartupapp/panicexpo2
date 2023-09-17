import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';


export default function MusicPlayer({route}) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [backButtonDisabled, setBackButtonDisabled] = useState(true);
  const [playButtonDisabled, setPlayButtonDisabled] = useState(true);
  const navigation = useNavigation();
  const [bookaa, setBooka] = React.useState(null);

  React.useEffect(() => {
    let { bookaa } = route.params;
    setBooka(bookaa)
    
    console.log(bookaa.web)
}, [bookaa])

useEffect(() => {
  async function playAudio() {
    try {
      if (bookaa && bookaa.mp3) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: bookaa.mp3 },
          { initialStatus: { positionMillis: 10000 /* Start from 10 seconds */ } }
        );
        
        setSound(sound);

        sound.setOnPlaybackStatusUpdate((status) => {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        });

        await sound.playAsync();
        setIsPlaying(true);
        setBackButtonDisabled(false);
        setPlayButtonDisabled(false);
      }
    } catch (error) {
      console.error('Error playing audio: ', error);
    }
  }

  playAudio();

  return () => {
    if (sound) {
      sound.stopAsync();
      sound.unloadAsync();
    }
  };
}, [bookaa]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (sound && !isPlaying) {
        sound.playAsync();
        setIsPlaying(true);
        setPlayButtonDisabled(false);
      }
    });

    return unsubscribe;
  }, [navigation, sound, isPlaying]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (sound && isPlaying) {
        sound.stopAsync();
        setIsPlaying(false);
      }
    });

    return unsubscribe;
  }, [navigation, sound, isPlaying]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent the default behavior of leaving the screen
      e.preventDefault();

      setTimeout(() => {
  
      // Prompt the user before leaving the screen
      Alert.alert(
        'Confirm Exit',
        'Are you sure you want to leave the music player?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Yes',
            onPress: () => {
              // Stop audio playback if it's playing
              if (sound && isPlaying) {
                sound.stopAsync();
              }
              // Allow leaving the screen after user confirmation
              navigation.dispatch(e.data.action);
            },
          },
        ],
        { cancelable: false }
      );
    }, 500);
  });
  
    return unsubscribe;
  }, [navigation, sound, isPlaying]);
  

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <LottieView
          source={require("../assets/animationmusic.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
        </View>
      <TouchableOpacity
        style={[styles.backButton, { opacity: backButtonDisabled ? 0.5 : 1 }]}
        onPress={() => {
          if (!backButtonDisabled) {
            if (sound && isPlaying) {
              sound.stopAsync();
            }
            navigation.goBack();
          }
        }}
        disabled={backButtonDisabled}
      >
       <Ionicons name="arrow-back" size={54} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{bookaa?.bookName}</Text>

      
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.rewindButton}
          onPress={async () => {
            if (sound && position >= 15000) { // Rewind 15 seconds if possible
              await sound.setPositionAsync(position - 15000);
            }
          }}
          disabled={backButtonDisabled}
        >
          <MaterialCommunityIcons name="rewind-15" size={34} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (sound) {
              if (isPlaying) {
                await sound.pauseAsync();
              } else {
                await sound.playAsync();
              }
              setIsPlaying(!isPlaying);
            }
          }}
          disabled={playButtonDisabled}
        >
          {/* Conditionally render custom icons for play and pause */}
          {isPlaying ? (
            <AntDesign name="pausecircle" size={70} color="black" />
          ) : (
            <AntDesign name="play" size={70} color="black" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fastForwardButton}
          onPress={async () => {
            if (sound && position <= duration - 15000) { // Fast forward 15 seconds if possible
              await sound.setPositionAsync(position + 15000);
            }
          }}
          disabled={backButtonDisabled}
        >
          <MaterialCommunityIcons name="fast-forward-15" size={34} color="black" />
        </TouchableOpacity>
      </View>
     
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="gray"
        onValueChange={(value) => {
          if (sound) {
            sound.setPositionAsync(value);
          }
        }}
      />
       <View style={styles.sliderTimeContainer}>
        <Text style={styles.sliderTimeText}>{formatTime(position)}</Text>
        <Text style={styles.sliderTimeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center', // Center the Lottie animation and title horizontally
    marginTop: 20, // Add top margin to separate the animation from other content
  },
  lottieAnimation: {
    width: 400, // Adjust the width of the animation as needed
    height: 450, // Adjust the height of the animation as needed
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  slider: {
    width: '80%',    
    marginTop: 20,
    
    
  },
  sliderTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  sliderTimeText: {
    fontSize: 16,
    color: 'black',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewindButton: {
    padding: 20,
  },
  fastForwardButton: {
    padding: 20,
  },
});

function formatTime(timeMillis) {
  const minutes = Math.floor(timeMillis / 60000);
  const seconds = ((timeMillis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}  