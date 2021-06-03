import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from "../config/Colors";
import AppButton from "../components/AppButton";
import AddProduct from '../components/AddProduct';
import SearchableDropdown from 'react-native-searchable-dropdown';
import API from '../API';
import { RoleContext } from '../provider/RoleProvider';

function AddProductScreen({ navigation, route }) {
    const { user } = useContext(RoleContext);
    const email = user.email;
    const { title, type } = route.params;

    const [productItems, setProductItems] = useState([]);
    const [products, setProducts] = useState([]);

    const changeProductItemAmount = (id, amount) => {
        setProductItems(productItems.map(item => ({
            ...item,
            amount: item.id === id ? amount : item.amount
        })))
    }

    const handleAddProduct = (selectedItem) => {
        Keyboard.dismiss();
        setProducts(products.filter(item => item.id !== selectedItem.id))
        setProductItems([...productItems, { ...selectedItem, amount: '' }])
    }

    const saveMeal = () => {
        API.saveMeal(
            {
                email,
                type,
                products: productItems.map(({ amount, id }) => ({ amount: +amount, id }))
            },
            ({ carbs, sex }) => navigation.navigate('Dienos įrašai', {
                carbs,
                sex,
                openModal: type !== 'SNACK'

            }),
            (err) => { console.log(err) },
        )
    }

    useEffect(() => {
        API.getProducts(
            ({ products }) => setProducts(products.map(({ id, name }) => ({ id, name }))),
            (errMsg) => console.log('klaida: ', errMsg)
        )
    }, [])

    return (
        <View style={{ marginBottom: 70 }}>
            <View style={styles.inputContainer}>
                <Icon name="search" size={28} style={{ marginTop: 10 }} />
                <SearchableDropdown
                    onItemSelect={(selectedItem) => handleAddProduct(selectedItem)}
                    containerStyle={{ padding: 5, width: '90%' }}
                    textInputStyle={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                    }}
                    itemTextStyle={{
                        color: '#222',
                    }}
                    items={products}
                    placeholder="Ieškoti produkto"
                    resetValue={false}
                    textInputProps={{ onTextChange: text => { } }}
                />
            </View>

            <View alignItems="center">
                <Text>*Kiekį įveskite gramais arba mililitrais</Text>
            </View>
            <ScrollView>
                <View style={styles.tasksWrapper}>
                    <View style={styles.items}>
                        {
                            productItems.map((item) => {
                                return (
                                    <TouchableOpacity key={item.id}>
                                        <AddProduct
                                            {...item}
                                            changeAmount={changeProductItemAmount} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <AppButton
                    title={title}
                    onPress={saveMeal}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: colors.light,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginBottom: 5,
        justifyContent: "space-between",
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {
        fontSize: 30,
        color: colors.white,
        paddingBottom: 3,
    },
    totalCount: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: colors.light,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        justifyContent: "space-between",
    },
    subTitle: {
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 10,
    },
    saveButton: {
        position: "absolute",
        bottom: 0,
        alignSelf: "flex-end",
    },
    tasksWrapper: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    items: {
        marginTop: 30,
    },
});

export default AddProductScreen;