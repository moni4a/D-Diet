import React from 'react'
import { requireNativeComponent, StyleSheet, View, Platform, findNodeHandle, UIManager } from 'react-native';
import PropTypes from 'prop-types';

let InputMasking = requireNativeComponent(`InputMasking`);


class RNInputMasking extends React.Component {
    constructor(props) {
        super(props);
    }


    focus = () => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.inputMaskingRef),
            UIManager.getViewManagerConfig('InputMasking').Commands
                .focus,
            []
        );
    }

    blur = () => {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.inputMaskingRef),
            UIManager.getViewManagerConfig('InputMasking').Commands
                .blur,
            []
        );
    }

    _onErrorForMasking = ({nativeEvent}) => {

        console.log('error ',nativeEvent)
        
    }

    render() {



        return <View style={[styles.fieldContainer, this.props.style]} >

            <InputMasking

                ref={_ref => this.inputMaskingRef = _ref}

                style={styles.field}

                onChangeText={this.props.onChangeText}

                /******************
                 * 
                 * 
                 * Catch the result from this function as,
                 * 
                 * console.log(' onChangeText ', event.nativeEvent.text )
                 * 
                 *********************/

                {...(Platform.OS == "android" ?
                    { onFocus: this.props.onFocus }
                    : { onFocusText: this.props.onFocus })
                }

                /*********************
                 * 
                 * Catch the result from this function as,
                 * 
                 * console.log(' onFocus ', event.nativeEvent.focus )
                 * 
                 *********************/

                onErrorForMasking={this.props.onErrorForMasking ?? this._onErrorForMasking}

                /*********************
                 * 
                 * Catch the result from this function as,
                 * 
                 * Use this function to see why the typing was stopped,
                 *  
                 * 
                 * console.log(' onErrorForMasking ', event.nativeEvent.error )
                 * 
                 *********************/


                {...(Platform.OS == "android" ?
                    { onSubmitEditing: this.props.onSubmitEditing }
                    : { onSubmitText: this.props.onSubmitEditing })
                }

                /*********************
                 * 
                 * Catch the result from this function as,
                 * 
                 * console.log(' onSubmitEditing ', event.nativeEvent.text )
                 * 
                 *********************/


                underlineColorAndroid={this.props.underlineColorAndroid}


                /*********************
                 * 
                 * Use this prop to set the underline color of the text input:
                 * 
                 * default is #cccccc, pass any hex color
                 * 
                 *********************/


                {...(Platform.OS == "android" ?
                    { placeholder: this.props.placeholder }
                    : { _placeholder: this.props.placeholder })
                }

                /*********************
                 * 
                 * Use this prop to set the placeholder for the text input:
                 * 
                 * Pass any string
                 * 
                 *********************/

                placeholderTextColor={this.props.placeholderTextColor}

                /*********************
                * 
                * Use this prop to set the placeholder text color for the text input:
                * 
                * default is #cccccc, pass any hex color
                * 
                *********************/


                {...(Platform.OS == "android" ?
                    { textColor: this.props.textColor }
                    : { _textColor: this.props.textColor })
                }

                /*********************
                * 
                * Use this prop to set the text color for the text input:
                * 
                * default is android's default, pass any hex color
                * 
                *********************/


                textSize={this.props.textSize}

                /*********************
                * 
                * Use this prop to set the text size for the text input:
                * 
                * default is android's default, pass any number
                * 
                *********************/

                disabled={this.props.disabled}

                /*********************
                * 
                * Use this prop to disable the editing for the text input:
                * 
                * default is false, pass a boolean to toggle
                * 
                *********************/

                value={this.props.value}

                /*********************
                * 
                * Use this prop to set the default value for the text input:
                * 
                * default is empty string, pass any string value
                * 
                *********************/

                textAlign={this.props.textAlign}

                /*********************
                 * 
                 * Use this prop to set the alignment of the text inside the text input:
                 * 
                 * default is Left, can be either of Left or Right
                 * 
                 *********************/

                {...(Platform.OS == "android" ?
                    { keyboardType: this.props.keyboardType }
                    : { _keyboardType: this.props.keyboardType })
                }

                /*********************
                 * 
                 * Use this prop to set the keyboard type for the text input:
                 * 
                 * default is android's default, can be of following types:
                 * 
                 * number-pad , date-time , email-address , password 
                 * 
                 *                  !!! IMPORTANT !!! 
                 * 
                 * The password property for the keyboard will conceal the input with default dots
                 * 
                 *********************/


                {...(Platform.OS == "android" ?
                    { returnKeyType: this.props.returnKeyType }
                    : { _returnKeyType: this.props.returnKeyType })
                }

                /*********************
                 * 
                 * Use this prop to set the returnKeyType of the keyboard for the text input:
                 * 
                 * default is done, can be of following types:
                 * 
                 * go , next , search , done ( default )
                 * 
                 *********************/

                maskType={this.props.maskType}

                /*********************
                 * 
                 * Use this prop to set the maskType for the text input:
                 * 
                 * default is none, can be of following types:
                 * 
                 * credit-card , phone-number , default 
                 * 
                 *********************/

                maskFormat={this.props.maskFormat}

                /*********************
                 * 
                 * Use this prop to set the maskFormat for the text input:
                 * 
                 * Use the following format to set the maskFormat:
                 * 
                 * use A where you want to show the alphabet and use D where you want to show a digit
                 * 
                 * For example:
                 * 
                 * To mask the input for credit-card following format is suitable:
                 * 
                 * DDDD-DDDD-DDDD-DDDD
                 * 
                 * To mask the input for id card following format is suitable:
                 * 
                 * AA-DDD
                 * 
                 * To mask the input for date following format is suitable:
                 * 
                 * DD/DD/DD
                 * 
                 * To mask the input for phone-number following format is suitable:
                 * 
                 * > for eg if UK's phone no. needed to be masked:
                 * 
                 * +44-DDDD-DDDDDD
                 * 
                 *          !!! IMPORTANT !!!
                 * 
                 * use default or no maskType if using for other than credit-card or phone-number
                 * 
                 *********************/


                {...(Platform.OS == "ios" ?
                    { fontType: this.props.fontFamily?.split(".")[0] }
                    : { fontFamily: this.props.fontFamily })
                }
                
            />
        </View>
    }


}

const styles = StyleSheet.create({
    field: {
        height: '100%',
        width: '100%',
    },
    fieldContainer: {
        height: 100,
        width: 100,
    }
})


RNInputMasking.propTypes = {

    onChangeText: PropTypes.func,

    onFocus: PropTypes.func,

    onErrorForMasking: PropTypes.func,

    onSubmitEditing: PropTypes.func,

    underlineColorAndroid: PropTypes.string,

    placeholder: PropTypes.string,

    placeholderTextColor: PropTypes.string,

    textColor: PropTypes.string,

    textSize: PropTypes.number,

    disabled: PropTypes.bool,

    value: PropTypes.string,

    textAlign: PropTypes.string,

    keyboardType: PropTypes.string,

    returnKeyType: PropTypes.string,

    maskType: PropTypes.string,

    maskFormat: PropTypes.string.isRequired,

    style: PropTypes.object,

    fontFamily: PropTypes.string,
}

export default RNInputMasking;