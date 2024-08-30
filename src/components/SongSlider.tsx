import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Slider from '@react-native-community/slider'
import { useProgress } from 'react-native-track-player'
import { seekTo } from 'react-native-track-player/lib/src/trackPlayer'
const SongSlider = () => {
    //binding progress
    const {position,duration} = useProgress()
    useEffect(() => {

    },)
    
  return (
    <View>
      <Slider 
      value={position}
      minimumValue={0}
      maximumValue={duration}
      thumbTintColor='#FFF'
      maximumTrackTintColor='#FFF'
      onSlidingComplete={(value) => { 
        console.log(position)
        seekTo(value) }}
      style={styles.sliderContainer}/>
      <View style={styles.timeContainer}>
        {/* This text will display time and we are using javascript for it Date class
        will give us date and time and we will use substring() method to get time */}
        <Text style={styles.time}>
            {new Date(position*1000).toISOString().substring(15,19)}
        </Text>
        <Text style={styles.time}>
            {new Date((duration-position)*1000).toISOString().substring(15,19)}
        </Text>
      </View>
    </View>
  )
}

export default SongSlider

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,

    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
})