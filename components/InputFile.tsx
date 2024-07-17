import React, { useState } from 'react';
import { StyleSheet, Platform, I18nManager } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import { theme } from '../../theme';
interface CInputProps extends InputProps {
    value: string,
    errorMessage: string,
    onChangeText: () => void,
    inputStyle?: object | null,
    label: string,
    width: number
}

export default function CInput(props: CInputProps) {
    const [length, setLength] = useState(0);
    let inputWidth = (props.width/2)-30

    //:- Checking text width for IOS Arabic text allignment
    function measureTextWidth() {
        if (Platform.OS === 'ios' && I18nManager.isRTL) {
            if (props.value != '') {
                const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625]
                const avg = 0.5279276315789471
                const textWidth = Array.from(props.value).reduce((acc, cur) => acc + (widths[cur.charCodeAt(0)] ?? avg), 0) * theme.fonts.font16
                setLength(textWidth)
            } else {
                setLength(0)
            }
        }
    }

    // Hot fix for : text with spaces wraps in fn ln textinput
    const textValueStyle = () => ({
        ...Platform.select({
            android: props.inputStyle,
            ios: length < inputWidth && I18nManager.isRTL ? props.inputStyle : {}
        })
    })

    return (
        <Input
            {...props}
            value={props.value}
            containerStyle={{ marginBottom: 1 }}
            inputContainerStyle={[props.inputStyle, styles.inputStyleName]}
            labelStyle={[styles.inputLabelStyle, props.labelStyle]}
            label={props.label}
            errorStyle={styles.errorTxt}
            errorMessage={props.errorMessage}
            onContentSizeChange={measureTextWidth}
            onChangeText={props.onChangeText}
            inputStyle={[{fontFamily:theme.fontFamily.regular,fontSize:theme.fonts.font12} ,textValueStyle()]}
            autoCorrect={false}
        />
    );
}

const styles = StyleSheet.create({
    inputStyleName: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 6,
        paddingLeft: 10,
        height: 50,
    },
    inputLabelStyle: {
        fontSize: theme.fonts.font11,
        fontWeight: '400',
        paddingBottom: 5,
        paddingTop: 10,
        fontFamily: theme.fontFamily.regular,
        color: theme.colors.labelTxtGrey,
        textAlign: 'left',
        marginTop: 2
    },
    errorTxt: {
        color: theme.colors.error,
        fontFamily: theme.fontFamily.regular,
        fontSize: theme.fonts.font9,
        textAlign: 'left',
    },
})


