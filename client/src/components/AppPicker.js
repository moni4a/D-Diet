import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/Styles";
import AppText from './AppText';
import Screen from "./Screen";
import { FlatList } from 'react-native-gesture-handler';

function AppPicker({ icon, items, onSelectItem, placeholder, selectedItem, width = "100%" }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width }]}>
                    {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />}
                    <AppText style={styles.text}>{selectedItem ? selectedItem.label : placeholder}</AppText>
                    <MaterialCommunityIcons name="chevron-down" size={20} color={defaultStyles.colors.medium} />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    <FlatList
                        data={items}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({ item }) => (
                            <PickerItem
                                label={item.label}
                                onPress={() => {
                                    setModalVisible(false);
                                    onSelectItem(item);
                                }}
                            />)}
                    />
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.lightGrey,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
    },
});

export default AppPicker;