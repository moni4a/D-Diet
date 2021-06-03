import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from "../config/Colors";

const AddProductAmount = ({ name, id, amount, changeAmount }) => {
    return (
        <View>
            <View style={[styles.item, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                <View style={[styles.itemLeft]}>
                    <View style={styles.circle}></View>
                    <Text style={styles.itemText}>{name}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{ marginRight: 5, alignSelf: "center" }}>KIEKIS:</Text>
                    <TextInput style={styles.textInput}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={(newAmount) => changeAmount(id, newAmount)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    circle: {
        width: 24,
        height: 24,
        backgroundColor: Colors.primary,
        opacity: 0.4,
        borderRadius: 60,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    textInput: {
        width: 50,
        height: 30,
        backgroundColor: Colors.lightGrey,
    },
});

export default AddProductAmount;