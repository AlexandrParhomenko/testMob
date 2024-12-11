import {Image, StyleSheet, Platform} from 'react-native';
import WebView from "react-native-webview";

export default function HomeScreen() {
    return (
        <WebView
            source={{uri: "https://rutube.ru/video/private/adbae9da4026bd1e8c8525f9039d7a9f/?p=8FJhEHYkGEbU6gzmS6m-fA"}}
            style={styles.webview}
            javaScriptEnabled
            scalesPageToFit={true}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction
        />
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    webview: {
        width: "100%",
        height: 100
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
