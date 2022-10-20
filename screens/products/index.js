import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, LogBox, Image, TouchableOpacity, Text } from 'react-native';
import { logoutUser, productAvailability } from '../../apis';
import CartBox from '../../components/CartBox';
import Product from '../../components/Product';
import TabView from '../../components/TabView';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
const ProductListingScreen = ({ navigation, route }) => {
	const [productsList, setProductsList] = useState([]);
	const [productQuantity, setProductQuantity] = useState('0');
	const [isLoading, setIsLoading] = useState(false);
	// @ts-ignore
	const cartItems = useSelector(state => state?.ecommerce?.cartItems);

	useEffect(() => {
		setProductQuantity(cartItems)
	}, [cartItems])
	
	const handleLogout = async () => {
		await logoutUser()
			.then(async (res) => {
				await AsyncStorage.removeItem('token');
				await AsyncStorage.removeItem('userID');
				navigation.navigate('login');
			})
			.catch((err) => console.log('Error: ', err));
	};


	const updateProductsList = async (products) => {
		setIsLoading(true)
		const newState = await products.filter(async product => {

			const availability = await productAvailability(product.id).catch((error) => { console.log('error: ', error); setIsLoading(false) });

			product.availability_status = availability;

			return product;
		});
		setProductsList(newState);
		setIsLoading(false)
	};


	useEffect(() => {
		LogBox.ignoreLogs(['Require cycle: node_modules/']);
		if (route?.params) {
			const { products } = route?.params
			updateProductsList(products || []);
		}
	}, [route?.params]);

	return (
		<View style={styles.container}>

			{isLoading ? (
				<Loader />
			) : (
				<View>
					<View style={styles.topContainer}>
						<TabView tabTitles={['All Products']} selected={0} />
						<CartBox navigation={navigation} quantity={productQuantity} />
						<TouchableOpacity onPress={() => navigation.navigate("ordersList")}>
							<Image
								// @ts-ignore
								source={require("../../assets/orderIcon.png")}
								style={styles.orderImage}
							/>
						</TouchableOpacity>
						<View>
							<TouchableOpacity onPress={handleLogout}>
								<Image
									source={{ uri: 'https://www.iconsdb.com/icons/preview/gray/logout-xxl.png' }}
									style={styles.productImage}
								/>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.productsContainer}>
						<FlatList
							data={productsList}
							numColumns={2}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => <Product product={item} navigation={navigation} />}
							columnWrapperStyle={{
								justifyContent: 'space-around'
							}}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</View>
			)}
			{productsList.length === 0 && !isLoading && <Text style={styles.noProduct}>No Products Found</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	productsContainer: {
		paddingLeft: 15,
		marginBottom: 50
	},
	topContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 },
	productImage: { height: 20, width: 20, resizeMode: 'contain' },
	orderImage: { height: 24, width: 24, resizeMode: 'contain' },
	noProduct: { fontSize: 18, textAlign: 'center', fontWeight: 'bold', color: "#7d8087" }
});

export default ProductListingScreen;
