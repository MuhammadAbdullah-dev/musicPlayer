import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
//importing track player and other events
import TrackPlayer,{
    Track,
    Event,
    useTrackPlayerEvents
} from 'react-native-track-player'
//importing components
import { playListData } from '../constants'
import SongInfo from '../components/SongInfo'
import SongSlider from '../components/SongSlider'
import ControlCenter from '../components/ControlCenter'

//defining width variable
const {width} = Dimensions.get('window')


const MusicPlayer = () => {
    const [track,setTrack] = useState<Track | null>()

    //event to define if track is changed
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event=>{
        switch (event.type) {
            case Event.PlaybackTrackChanged:
                const playing =await TrackPlayer.getTrack(event.nextTrack)
                setTrack(playing)
                break;
            default:
                break;
        }
    })

    //to render the artwork
    const renderArt = ()=>{
        return(
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                    {track?.artwork && (
                        <Image
                        style={styles.albumArtImg}
                        source={{uri: track?.artwork?.toString()}}
                        />
                    )}
                </View>
            </View>
        )
    }

  return (
    <View style={styles.container}>
      <FlatList 
      horizontal
      data={playListData}
      renderItem={renderArt}
      keyExtractor={item => item.id.toString()}/>
    <SongInfo track={track}/>
    <SongSlider />
    <ControlCenter />
    </View>
  )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
      },
      listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      },
      albumContainer: {
        width: 300,
        height: 300,
      },
      albumArtImg: {
        height: '100%',
        borderRadius: 4,
      },
})