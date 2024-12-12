import React, {FC, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar, Text, Dimensions} from "react-native";
import {useSelector} from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import {selectColor} from "../../app/store/reducers/themeSlice";
import {VideoStorageItem} from "../../app/types/types";
import themeStyles from "../../styles/styles";
import {WebView} from "react-native-webview";
import CloseLink from "../BackLink/CloseLink";
import {SafeAreaView} from "react-native-safe-area-context";
import ListPagesLoader from "../CustomLoaders/ListPagesLoader";

interface IPlayerProps {
    onClose: Function
    videoUrl: string
    name: string
}

const VideoPlayer: FC<IPlayerProps> = ({onClose, videoUrl, name}) => {
    const playerRef = React.useRef(null);
    let themeColor = useSelector(selectColor)
    const [playing, setPlaying] = useState(true);
    const [stopInterval, setStopInterval] = useState(false);
    const [mute, setMute] = useState(false);
    const [showBar, setShowBar] = useState(false);
    const [videoDuration, setVideoDuration] = useState<string>('00:00');
    const [videoDurationInSeconds, setVideoDurationInSeconds] = useState<number>(0);
    // const [currentTime, setCurrentTime] = useState<string>('00:00');
    const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
    const watchedTimeInterval = useRef<any>();
    const fetchDataInterval = useRef<any>();
    const [storageVideoArr, setStorageVideoArr] = useState<VideoStorageItem[]>([])



    // const fetchVideoData = async () => {
    //     await asyncStorage.getItem('watchedVideos').then(res => setStorageVideoArr(JSON.parse(res!)))
    // }
    //
    // const handleFullScreenPress = (status: boolean) => {
    //     status ? ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT) :
    //         ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).then(() => ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT))
    // }
    //
    // useEffect(() => {
    //     fetchVideoData()
    //
    //     return () => {
    //         clearInterval(watchedTimeInterval.current)
    //         clearInterval(fetchDataInterval.current)
    //         watchedTimeInterval.current = null
    //         fetchDataInterval.current = null
    //     }
    // }, []);
    //
    const [orientation, setOrientation] = useState(0);
    useEffect(() => {
        checkOrientation();
        const subscription = ScreenOrientation.addOrientationChangeListener(
            handleOrientationChange
        );
        return () => {
            // @ts-ignore
            ScreenOrientation.removeOrientationChangeListeners(subscription);
        };
    }, []);
    const checkOrientation = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();
        setOrientation(orientation);
    };
    const handleOrientationChange = (o: any) => {
        setOrientation(o.orientationInfo.orientation);
    };

    // const getDuration = () => {
    //     playerRef.current!.getDuration().then(
    //         (res: number) => {
    //             setVideoDurationInSeconds(res)
    //             setVideoDuration(`${Math.trunc(res / 60)}:${res - (Math.trunc(res / 60) * 60)}`)
    //         }
    //     );
    // }
    //
    // const countMinutes = (time: number) => {
    //     let minutes: number | string = Math.trunc(time / 60)
    //     if (Math.trunc(minutes / 10) < 1) minutes = `0${minutes}`
    //     let seconds: number | string = time - ((Math.trunc(time / 60) * 60))
    //     if (Math.trunc(seconds / 10) < 1) seconds = `0${seconds}`
    //     return `${minutes}:${seconds}`
    // }
    //
    // const handleGetCurrentTime = async () => {
    //     return playerRef.current!.getCurrentTime()
    // }
    //
    // const onAllReady = async () => {
    //     // playerRef.current!.seekTo(storageVideoArr[0].watchedInSeconds, true)
    //     let duration = 0
    //     await playerRef.current!.getDuration().then(res => {
    //         duration = res
    //     })
    //     watchedTimeInterval.current = setInterval(() => {
    //         if (playing) {
    //             handleGetCurrentTime().then(
    //                 (res: number) => {
    //                     setCurrentTimeInSeconds(Math.trunc(res))
    //                     setCurrentTime(countMinutes(Math.trunc(res)))
    //                 }
    //             );
    //         }
    //     }, 1000)
    //     fetchDataInterval.current = setInterval(async () => {
    //         let videosArr = await AsyncStorage.getItem('watchedVideos').then(res => JSON.parse(res!))
    //         let newValue = {}
    //         let curTime = 0
    //         await handleGetCurrentTime().then(
    //             (res: number) => {
    //                 curTime = res
    //             }
    //         );
    //
    //         if (playing) {
    //             // if (duration - curTime <= 6 && !storageVideoArr[title].isWatched) {
    //             if (duration - curTime <= 6) {
    //                 newValue = {
    //                     watchedInSeconds: 0,
    //                     isWatched: true
    //                 }
    //                 let newEmptyValue = {
    //                     watchedInSeconds: 0,
    //                     isWatched: false
    //                 }
    //                 videosArr[0] = newValue
    //                 await AsyncStorage.setItem('watchedVideos', JSON.stringify([...videosArr, newEmptyValue]))
    //                 clearInterval(fetchDataInterval.current)
    //                 fetchDataInterval.current = null
    //             } else if (curTime > storageVideoArr[0].watchedInSeconds) {
    //                 newValue = {
    //                     watchedInSeconds: Math.trunc(curTime),
    //                     isWatched: videosArr[title].isWatched
    //                 }F
    //                 videosArr[0] = newValue
    //                 await AsyncStorage.setItem('watchedVideos', JSON.stringify(videosArr))
    //             }
    //         }
    //     }, 5000)
    // }

    // if (!storageVideoArr[0]) return <ListPagesLoader/>

    // fetch("https://rutube.ru/video/private/9e94fd4626c0571a936636e80ae5fd42/?p=fY-BevCR9eS11U3zhZ7WvQ").then(res => console.log(res))

    // const player = useVideoPlayer("https://rutube.ru/play/embed/9e94fd4626c0571a936636e80ae5fd42/?p=fY-BevCR9eS11U3zhZ7WvQ", player => {
    //     player.loop = true;
    //     player.play();
    // });

    if (!videoUrl) return <ListPagesLoader/>

    return (
        <SafeAreaView
            style={[themeColor === 'light' ? themeStyles.backgroundLight : themeStyles.backgroundDark, {flex: 1, zIndex: 11, position: "absolute", height: "100%", width: "100%"}]}>
            <CloseLink onClose={onClose} label={name}/>
            {/*<VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />*/}
            <WebView
                ref={playerRef}
                source={{ uri: videoUrl }}
                style={styles.webview}
                javaScriptEnabled
                scalesPageToFit={true}
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    progressbar: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 5,
        backgroundColor: "gray"
    },
    webview: {
        width: "100%",
        height: 100
    },
    progressbarDone: {
        width: 0,
        height: 5,
        backgroundColor: "red"
    },
    playerBar: {
        backgroundColor: '#252525',
        paddingVertical: 10
    },
    horizontalPlayerBar: {
        backgroundColor: '#252525',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        zIndex: 12,
        width: '100%',
    },
    playerButtons: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 300,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    time: {
        marginLeft: 10,
    },
});

export default VideoPlayer;