import React, { useState } from 'react';
import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../config/Colors';

const DatePicker = ({ value, onChange, ...rest }) => {
    const [show, setShow] = useState(false);

    const handleChange = (event, selectedDate) => {
        const currentDate = selectedDate || value;
        setShow(Platform.OS === 'ios');
        onChange(currentDate);
    };

    return (
        <TouchableOpacity onPress={() => setShow(true)} style={styles.root}>
            <DateTimePicker
                show={show}
                testID="dateTimePicker"
                value={value}
                mode={'date'}
                display="default"
                onChange={handleChange}
                {...rest}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        width: 120,
        backgroundColor: colors.white,
        borderRadius: 4,
        padding: 4,
    }
});

export default DatePicker;