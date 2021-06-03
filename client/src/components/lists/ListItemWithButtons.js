import React from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppText from "../../AppText";
import colors from "../../../config/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Divider } from 'react-native-paper';

function ListItemWithButtons({ title, subTitle, image, IconComponent, onPress, renderRightActions, icon, submitButton, deleteButton }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight underlayColor={colors.lightGrey}>
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
                        <Divider style={{ backgroundColor: "#f5d5cb", height: 3, marginTop: 6 }}></Divider>
                        <View style={styles.buttonsContainer}>
                            <Button title="SUTIKTI PERŽIŪRĖTI" onPress={onPress}>{submitButton}</Button>
                            <Button title="IŠTRINTI" onPress={() => console.log("Delete button", item)}>{deleteButton}</Button>
                        </View>
                    </View>
                    {icon && <MaterialCommunityIcons color={colors.medium} name="eye" size={25} />}
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
        marginBottom: 5
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontWeight: "500",
    },
    subTitle: {
        color: colors.medium,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 0,
    },
});

export default ListItemWithButtons;