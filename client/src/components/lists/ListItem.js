import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppText from "../../components/AppText";
import colors from "../../config/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";

function ListItem({ title, subTitle, image, IconComponent, onPress, renderRightActions, icon }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight underlayColor={colors.lightGrey} onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
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
});

export default ListItem;