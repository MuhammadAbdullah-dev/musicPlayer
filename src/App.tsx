import { ActivityIndicator, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import { addTrack, setupPlayer } from '../musicPlayerService'
import MusicPlayer from './screen/MusicPlayer'

export default function App():JSX.Element {
  const [isPlayerReady,setIsPlayerReady] = useState(false)

  //checking if the player is setup
  async function setUp(){
    //saving reture value in isSetup variable
    let isSetup = await setupPlayer()
    //if true then we will addTracks to playetr
    if (isSetup){
      await addTrack()
    }
    setIsPlayerReady(isSetup)
  }
  // calling the function on initial rendder
  useEffect(() => {
    setUp()
  }, [])
  // now we will do conditonal rendering
  if(!isPlayerReady){
    return(
      <SafeAreaView>
    <ActivityIndicator />
    </SafeAreaView>
    )
  }
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <MusicPlayer />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});