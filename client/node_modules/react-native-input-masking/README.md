# [react-native-input-masking](https://www.npmjs.com/package/react-native-input-masking)
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
![Supports Android and iOS](https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg?style=flat-square)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
[![NPM](https://img.shields.io/npm/dm/react-native-input-masking)](https://www.npmjs.com/package/react-native-input-masking)
[![Version](https://img.shields.io/npm/v/react-native-input-masking)](https://www.npmjs.com/package/react-native-input-masking)

React-Native-Input-Masking is an open source package which is developed natively, to provide the input masking feature to the developers. It is pretty easy to use, go through the documentation to help you get started.

### Installation
If you prefer **npm**,
```sh
$ npm install react-native-input-masking --save
```
#### On Android:
No additional steps are required.

#### On Ios:
Run the following command from the root of your project:
```sh
$ cd ios
$ pod install
```

## Usage:
Following is the basic example of using **react-native-input-masking** in your app. See the **example** folder for more implementation.
```sh
import RNInputMasking from 'react-native-input-masking'
import {Text, TouchableOpacity} from 'react-native'


class ExampleApp extends React.Component {

  state = {
    value: ''
  }

  onChangeText = ({ nativeEvent }) => {
    this.setState({ value: nativeEvent.text })
  }
  
  

  render() {
    return ( 
        <RNInputMasking
          style={{
            borderColor: 'black',
            borderWidth: 1,
            height: 50,
            alignSelf: 'center',
            marginTop: 5
          }}
          value={this.state.value}
          onChangeText={this.onChangeText}
          maskFormat="DD-DD-DD"
        /> 
        
    );
  };
}

export default ExampleApp;
```

### More Props
| Name      | Description | Accepted Values | Platform (ios or android) |
| :----:       |    :----:   |     :----: |     :----: |
| style      | The style property to set the height, width and so on.       | -  | both |
| onChangeText   | This callback function is helpful if you want to get access to the values changing while typing the text.| A call back function  | both |
| onFocus   | This callback function is helpful when you want to know when the input field is focus or blurred. | A call back function | both |
| onErrorForMasking (Required)   | This callback function is helpful when you want to know why the typing is stopped. (The typing is stopped when the user types a character that doesn't match the given format.) | A call back function | both |
| onSubmitEditing   | This callback function is helpful when you want to know when the user has pressed the return key.         | A call back function | both |
| underlineColorAndroid   | Use this prop to set the underline color of the text input.  | Any hex color, default: #cccccc| android |
| placeholder   | Use this prop to set the placeholder for the text input. | Any string | both |
| placeholderTextColor   | Use this prop to set the placeholder text color for the text input. | Any hex color, default: #cccccc | both |
| textColor   | Use this prop to set the text color for the text input. | Any hex color, default: Os's default | both |
| textSize   | Use this prop to set the text size for the text input | Any number, default: Os's default | both |
| disabled   | Use this prop to disable the editing for the text input. | Any boolean, default: false | both |
| value   | Use this prop to set the default value for the text input. | Any String, default: "" | both |
| textAlign   | Use this prop to set the alignment of the text inside the text input. |"Left" or "Right", default: "Left" | both |
| keyboardType   | Use this prop to set the keyboard type for the text input. | "number-pad" , "date-time" , "email-address" , "password" , default: Os's default | both |
| returnKeyType   | Use this prop to set the returnKeyType of the keyboard for the text input. | "go" , "next" , "search" , "done" , default: "done" | both |
| maskType (Required)   | Use this prop to set the maskType for the text input. | "credit-card" , "phone-number" , "default" | android |
| maskFormat (Required)   | Use this prop to set the maskFormat for the text input. | Use A where you want to show the alphabet and use D where you want to show a digit. Eg: DD-AA-DD | both |
| fontFamily   | Use this prop to set the font-family for the text input. | Pass the name of the font which you have in your project. (for eg: Poppins-Bold.otf ) | both |
| focus   | You can use this method by creating a ref of the text input. | - | both |
| blur   | You can use this method by creating a ref of the text input. | - | both |

### Important Note
Following is the elaborated example on how to use the **maskFormat** prop:
> Use the following format to set the maskFormat:
>
>**For android**:
>use A where you want to show the alphabet and use D where you want to show a digit
>For example:
>To mask the input for credit-card following format is suitable:
> DDDD-DDDD-DDDD-DDDD
>To mask the input for id card following format is suitable:
> AA-DDD
>To mask the input for date following format is suitable:
> DD/DD/DD
>To mask the input for phone-number following format is suitable:
>for eg if UK's phone no. needed to be masked:
> +44-DDDD-DDDDDD
> **!!! IMPORTANT !!!**
>use default or no maskType if using for other than credit-card or phone-number
>
>**For ios**:
>use A where you want to show the alphabet and use D where you want to show a digit.
>For example:
>AA-DDD
> **!!! IMPORTANT !!!** 
>To mask the input for phone-number following format is suitable:
>for eg if UK's phone no. needed to be masked:
> +44-DDDD-DDDDDD

License 
----

MIT