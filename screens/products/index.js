import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, LogBox, Image, TouchableOpacity } from 'react-native';
import { getProduct, getProductsList, logoutUser, productAvailability } from '../../apis';
import CartBox from '../../components/CartBox';
import Product from '../../components/Product';
import TabView from '../../components/TabView';
import { cartCount } from '../../utils';

const ProductListingScreen = ({ navigation, route }) => {
	const [ productsList, setProductsList ] = useState([]);
	const [ productQuantity, setProductQuantity ] = useState('0');

	const handleProducts = async () => {
		const products = await getProductsList().catch((error) => console.log('error: ', error));
		var productList = [];
		let i = 0;
		while (i < products.length) {
			const product = await getProduct(products[i].url).catch((error) => console.log('error: ', error));
			const availability = await productAvailability(product.availability).catch((error) =>
				console.log('error: ', error)
			);
			product.availability_status = availability;
			productList.push(product);
			i += 1;
		}
		setProductsList(productList);
	};

	useEffect(() => {
		handleProducts();
		const cartProducts = async () => {
			await cartCount().then((res) => setProductQuantity(res)).catch((err) => console.log('Error: ', err));
		};
		cartProducts();
	}, []);

	const handleLogout = async () => {
		await logoutUser()
			.then(async(res) => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userID');
				navigation.navigate('login');
			})
			.catch((err) => console.log('Error: ', err));
	};

	LogBox.ignoreLogs([ 'Require cycle: node_modules/' ]);

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<TabView tabTitles={[ 'All', 'Best Products' ]} selected={0} />
				<CartBox navigation={navigation} quantity={productQuantity} />
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
	productImage: { height: 20, width: 20, resizeMode: 'contain' }
});

export default ProductListingScreen;
