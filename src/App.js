import React, { useState, useEffect} from "react"
import {
View,
StyleSheet,
Image,
TouchableOpacity,
}
from "react-native"
import Torch from "react-native-torch"
import RNShake from "react-native-shake"

import lightOff from "./assets/eco-light-off.png"
import lightOn from "./assets/eco-light.png"
import logoDioOff from "./assets/logo-dio-white.png"
import logoDioOn from "./assets/logo-dio.png"

export default () => {
    const [itsOn, setlight] = useState(false)

    const onToggle = () => {
        setlight(() => !itsOn)
    }

    useEffect(()=>{
        Torch.switchState(itsOn)
    })

    useEffect(()=>{
        const subscription = RNShake.addListener(()=>{
            setlight(()=>!itsOn)
        })
        return ()=> subscription.remove()
    })

    return <View
        style={
            itsOn ?
                styles.containerlight
                : styles.containerDark
        }>
        <Image
            style={[
                styles.lighting,
                itsOn ?
                    null
                    : { tintColor: 'white' }
            ]}
            source={
                itsOn ?
                    lightOn
                    : lightOff
            }
        />
        <TouchableOpacity
            onPress={onToggle}
        >
            <Image
                style={[styles.lighting, styles.logo]}
                source={
                    itsOn ?
                        logoDioOn
                        : logoDioOff
                }
            />
        </TouchableOpacity>
    </View>

}

const styles = StyleSheet.create({
    containerDark: {
        flex: 1,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: "center"
    },
    containerlight: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: "center"
    },
    lighting: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: 150,
        height: 150
    },
    logo: {
        width: 250,
        height: 250
    }
})