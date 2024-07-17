import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types'
import { theme } from '../../theme';
import { getString } from '../../utility/language';

export default function CButton(props) {
    return (
        <Button 
           // disabledStyle={props.secondary ? [styles.secondary,props.buttonStyle] : [styles.primary,props.buttonStyle]}
            disabled={props.disabled}
            loading={props.loading}
            title={props.title} 
            containerStyle={[styles.buttonContainer,props.style]} 
            buttonStyle={props.secondary ? [styles.secondary,props.buttonStyle] : [styles.primary,props.buttonStyle]} 
            titleStyle={props.secondary ? [styles.darkText, props.textStyle] : [styles.lightText, props.textStyle]} 
            onPress={props.onPress} />
    )
}

// styles
const styles = StyleSheet.create({
    buttonContainer : {
        alignSelf: 'stretch', 
        // marginHorizontal:20,
        marginVertical:5,
        // borderRadius:8
     
    },
    primary: {
        backgroundColor: theme.colors.primary,
        padding:10,
        borderRadius:10,
        
    },
    secondary: {
        backgroundColor:theme.colors.white, 
        borderWidth: 1, 
        borderColor: theme.colors.boarderBlue,
        padding:10,
        borderRadius:10
    },
    lightText: {
        color: theme.colors.white,
        fontSize:theme.fonts.font11,
        fontFamily:theme.fontFamily.regular,
        padding:5,
    },
    darkText: {
        color: theme.colors.text_common,
        fontSize:theme.fonts.font11,
        fontFamily:theme.fontFamily.regular,
        padding:5
    }
})

CButton.propTypes = {
    // title of the button
    title : PropTypes.string.isRequired,
    // style of button container
    style: PropTypes.object,
    // OnPress action
    onPress: PropTypes.func,
    // primary button color
    primary: PropTypes.any,
    // secondary button color
    secondary: PropTypes.any,
    disabled: PropTypes.any,
}

// Specifies the default values for props:
CButton.defaultProps = {
    title: getString("continue"),
};

