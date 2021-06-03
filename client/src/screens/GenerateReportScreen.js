import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import CustomDatePicker from "../components/DatePicker";
import colors from "../config/Colors";
import AppButton from "../components/AppButton";
import { Divider } from 'react-native-paper';
import API from '../API';


const GenerateReportScreen = () => {
    const scrollViewRef = useRef();
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    const generateReport = () => {
        const cp = new Date(dateTo.getTime())
        API.generateReport(
            {
                dateFrom: +dateFrom / 1000,
                dateTo: +cp.setDate(cp.getDate() + 1) / 1000
            },
            (data) => { console.log(data) },
            (err) => { console.log(err) },
        )
    }

    console.log({
        dateFrom,
        dateTo
    })
    return (
        <View style={{ flex: 1, marginTop: 30 }}>
            <SafeAreaView>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.title}>Pasirinkite dienų intervalą</Text>
                    <View style={styles.inputContainer}>
                        <CustomDatePicker
                            value={dateFrom}
                            onChange={setDateFrom}
                            maximumDate={dateTo}
                        />
                        <Text>———–</Text>
                        <CustomDatePicker
                            value={dateTo}
                            onChange={setDateTo}
                            minimumDate={dateFrom}
                            maximumDate={new Date()}
                        />
                    </View>
                    <AppButton title="Generuoti ataskaitą" onPress={generateReport} />
                </View>
            </SafeAreaView>
            <Divider style={{ backgroundColor: "#FFC8A2", height: 6, marginBottom: 10 }}></Divider>
            <ScrollView
                marginBottom={4}
                DEPRECATED_sendUpdatedChildFrames="true"
                alwaysBounceHorizontal="true"
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                automaticallyAdjustContentInsets="true"
                decelerationRate="fast">
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    subTitle: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 50,
    },
    title: {
        fontFamily: "Avenir",
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        alignSelf: "center",
        marginTop: 0,
        marginBottom: 15,
    },
});


export default GenerateReportScreen;