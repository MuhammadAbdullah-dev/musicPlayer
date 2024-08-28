import TrackPlayer, {play,pause, RepeatMode} from "react-native-track-player";
import { playListData } from "./src/constants";

//track player setup
export async function setupPlayer(){
    let isSetup = false
//this try block is if trackPlayer is ready otherwise catch block player ko setup kryga
    try {
      TrackPlayer.getCurrentTrack() 
      isSetup=true 
    } catch (error) {
        TrackPlayer.setupPlayer()
        isSetup = true
    }
//in finally we will return if player is ready or not
    finally{
        return isSetup
    }
}

//this is to addTrack to player
export async function addTrack(){
    TrackPlayer.add(playListData)
    TrackPlayer.setRepeatMode(RepeatMode.Queue)
}
//this function is for required services like play,pause,skip
export async function playbackService (){
    TrackPlayer.addEventListener(Event.RemotePause, ()=>{
        TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemotePlay, ()=>{
        TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemoteNext, ()=>{
        TrackPlayer.skipToNext()
    })
    TrackPlayer.addEventListener(Event.RemotePrevious, ()=>{
        TrackPlayer.skipToPrevious()
    })
}