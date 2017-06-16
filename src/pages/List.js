/**
 * Created by luzhuang on 2017/5/26.
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	Alert,
	FlatList,
	ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Detail from './Detail';
import Item from '../component/ListCell';
import {ListUrl} from '../def/Api';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	icon: {
	},
	row: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	loading: {
		marginTop: 100,
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#ffffff',
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	empty: {
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	},
	flex:{
		flex: 1,
	},
	list_item:{
		height:40,
		marginLeft:10,
		marginRight:10,
		borderBottomWidth:1,
		borderBottomColor: '#ddd',
		justifyContent: 'center'
	},
	list_item_font:{
		fontSize:16
	},
});
const api_url = ListUrl;
export default class List extends Component{
	static navigationOptions = {
		tabBarLabel: '发现',
		headerStyle: {
			backgroundColor:'#fafafa',
			height:50
		},
		headerTitleStyle: {
			color: '#000'
		},
		tabBarIcon: ({ tintColor, focused }) => (
			focused
				?
				<Icon name="ios-aperture" size={22} color={tintColor} style={styles.icon} />
				:
				<Icon name="ios-aperture-outline" size={22} color={tintColor} style={styles.icon} />
		),
	};
	state = {
		article: [],
		refreshing: false,
		ready: false,
		childrenData: ''
	};
	refreshing = false;
	page = 1;
	rows = 20;

	fetData = (page = 1,rows = 20) => {
		if (this.refreshing){
			return;
		}
		this.setState({
			refreshing: true,
		});
		this.refreshing = true;
		return fetch(`${api_url}?page=${page}&rows=${rows}`)
			.then((response) => response.text())
			.then((responseText)=>{
				const json =  JSON.parse(responseText);
				if (json.status === -1){
					Alert.alert('', json.info);
					this.setState({
						refreshing: false,
					});
					return [];
				}
				this.setState({
					refreshing: false,
				});
				this.refreshing = false;
				return json;
			})
			.catch((error)=>{
				console.log(error);
			})
	};

	freshData = async () => {
		const json = await this.fetData();
		this.setState({
			article: json,
		})
	};

	fetchMore = async () => {
		const json = await this.fetData(this.page, this.rows);
		if (json){
			this.page += 1;
			this.setState({
				article: this.state.article.concat(json),
			});
		}
	};

	async componentDidMount(){
		await this.fetchMore();
		this.setState({
			ready: true,
		});
	}

	componentWillUnmount(){
	}

	render() {
		const { navigate } = this.props.navigation;
		const { article,refreshing,ready,childrenData } = this.state;
		return (
			<View style={styles.row}>
		{
			ready ?
				<FlatList
					numColumns={1}
					keyExtractor={item => item.id}
					data={article}
					onRefresh={this.freshData}
					onEndReached={this.fetchMore}
					onEndReachedThreshold={0}
					refreshing = {refreshing}
					ListFooterComponent={()=>{
						return refreshing && <ActivityIndicator size="large" />
					}}
					renderItem={
						({item}) => <Item
							title={item.title}
							image={item.top_pic_mobile !== null ? item.top_pic_mobile : undefined}
							avatar={'https://www.shiqidu.com'+item.athor_avatar_src}
							author_name={item.author_username}
							post_time={item.create_time}
							comments_num={item.total_comment_num !== null ? parseInt(item.total_comment_num) : 0}
							onPress={()=>navigate('Detail',{
								id: item.id,
								title: item.title,
								isVisible: false,
								callback: (data)=>{
									this.setState({
										childrenData: data,
									});
									this.props.navigation.setParams({title:item.title})
								}
							})}
						/>
					}
				/>
				:
				<ActivityIndicator size="large" style={styles.loading} />
		}
	</View>
		);
	}
	goTo(){
		this.props.navigator.push({
			component: Detail,
			title: '详情',
			rightButtonTitle: '收藏',
			onRightButtonPress: function(){
				alert('点击了收藏按钮。');
			}
		});
	}
}