import React from 'react';
import { useFormikContext } from "formik";
import DropDownPicker from 'react-native-dropdown-picker';
import ErrorMessage from "./ErrorMessage";

function AppFormSelect({ name, ...otherProps }) {
    const { setFieldTouched, setFieldValue, errors, touched } = useFormikContext();

    return (
        <>
            <DropDownPicker
                onBlur={() => setFieldTouched(name)}
                onChangeItem={({ value }) => {
                    setFieldValue(name, value, true);
                }}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormSelect;