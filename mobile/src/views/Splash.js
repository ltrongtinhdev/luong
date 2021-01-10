import React from 'react';
import {View, Text,SafeAreaView,ImageBackground} from 'react-native'
function Splash(props) {
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground style={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center"
            }} source={require('../../assets/bg.png')} />
        </SafeAreaView>
    );
}

export default Splash;