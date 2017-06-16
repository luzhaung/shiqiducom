/**
 * Created by luzhuang on 2017/5/21.
 */
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	Platform,
	ScrollView,
    Button,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../def/Color';
import {getAccessToken} from '../def/Api';
import Login from './Login';
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ebebeb',
		height: height,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	icon: {
		/*height: 25,*/
	},
	button: {
		backgroundColor: PRIMARY_COLOR,
		width: width - 20,
		height: 42,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginNoticle: {
		marginTop: 10,
		paddingHorizontal: 10,
		width: width,
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 50,
	},
	toLogin: {
		justifyContent: 'center',
		marginLeft: 5,
	},
	toLoginText: {
		color: '#666'
	},
	myRelation: {
		marginTop: 10,
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 30,
	},
	myFollow: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: '#dfdfdf'
	},
	myFans: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	FollowText: {
		fontSize: 14,
	},
	myNotify: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	points: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	create: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	myNotifyIco: {
		marginTop: 4,
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	myNotifyText: {
		marginLeft: 10,
		justifyContent: 'center',
	},
	myNotifyRight: {
		justifyContent: 'center',
		right: 10,
		position: 'absolute',
		marginTop: 10,
		flexDirection: 'row',
	},
    mynotifys: {
		color: '#999',
		marginRight: 5,
	},
	tags: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	setting: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 10,
	},
	reback: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	articles: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
	comments: {
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 2,
	},
    avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		alignSelf: 'center',
	},
    sign: {
		position: 'absolute',
		right: 5,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
	},
    signButton: {
		width: 50,
		height: 25,
		backgroundColor: '#31b0d5',
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderTopColor: '#269abc',
		borderRightColor: '#269abc',
		borderBottomColor: '#269abc',
		borderLeftColor: '#269abc',
		borderRadius: 3,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},
	signText: {
		fontSize: 12,
		color: '#fff',
	}
});

export default class Mines extends Component{
	static navigationOptions = {
		title: '我的',
		headerStyle: {backgroundColor:'#ffffff',height:50},
		tabBarIcon: ({ tintColor, focused }) => (
			focused
				?
			<Icon name="ios-contact" size={22} color={tintColor} style={styles.icon} />
				:
			<Icon name="ios-contact-outline" size={22} color={tintColor} style={styles.icon} />
		),
	};

	state = {
		loading: false,
		isLogin: false,
		userInfo: false,
	};

	// 判断是否登录
    async componentDidMount(){
        // 接收登录界面传递来的值[会员信息]
        const { params,goBack } = this.props.navigation.state;
    	if (params){
			this.setState({
				isLogin: true,
				userInfo: params.userInfo,
			})
		}else{
    		// 判断是否登录[getAccessToken]
            const access_token = await AsyncStorage.getItem('access_token');
            if (access_token){
                const comments = await fetch(`${getAccessToken}?sess_id=${access_token}`);
                textData = await comments.text();
                jsonData = JSON.parse(textData);
                if (jsonData.status === 1){
                    this.setState({
                        isLogin: true,
                        userInfo: jsonData.data,
                    })
				}
            }
		}
	}
	onPress (){
        Alert.alert('签到提示','签到成功，积分+9999999');
	}
	render() {
        const { navigate } = this.props.navigation;
		const {loading, isLogin, userInfo} = this.state;

		let buttonBorderRadius = 0;
		if (Platform.OS === 'ios'){
			buttonBorderRadius = 5;
		}
		return (
			<View style={styles.container}>
				{
					loading
					?
					<View style={[styles.button,{borderRadius: buttonBorderRadius}]}>
					<ActivityIndicator/>
					</View>
					:
						<ScrollView>
							{
								isLogin
								?
                                <TouchableOpacity
									style={styles.loginNoticle}
								>
									<Image
										source={{uri:'https://www.shiqidu.com'+userInfo.avatar_src_50}}
										style={styles.avatar}
									/>
									<View style={styles.toLogin}>
										<Text>{userInfo.username}</Text>
									</View>
									<View style={styles.sign}>
										<TouchableOpacity
											onPress={this.onPress.bind(this)}
											style={styles.signButton}
										>
											<Text style={styles.signText}>签到</Text>
										</TouchableOpacity>
									</View>
								</TouchableOpacity>

								:
								<TouchableOpacity
									style={styles.loginNoticle}
									onPress={()=>navigate('Login',{
									})}
								>
									<Icon name="md-contact" size={50} color={'#999'} />
									<View style={styles.toLogin}>
										<Text style={styles.toLoginText}>立即登录/注册</Text>
									</View>
								</TouchableOpacity>
							}


							<View style={styles.myRelation}>
								<TouchableOpacity style={styles.myFollow}>
									<Text style={styles.FollowText}>我的关注</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.myFans}>
									<Text style={styles.FollowText}>我的粉丝</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity style={styles.myNotify}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-star" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的收藏</Text>
								</View>
								<View style={styles.myNotifyRight}>
                                    {isLogin && <Text style={styles.mynotifys}>{3}</Text>}
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.create}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-notifications" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的消息</Text>
								</View>
								<View style={styles.myNotifyRight}>
                                    {isLogin && <Text style={styles.mynotifys}>{5}</Text>}
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.points}>
								<View style={styles.myNotifyIco}>
									<Icon name="logo-yen" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的积分</Text>
								</View>
								<View style={styles.myNotifyRight}>
                                    {isLogin && <Text style={styles.mynotifys}>{userInfo.point}</Text>}
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.tags}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-pricetags" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>所有Tag</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.articles}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-paper" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的文章</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.comments}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-redo" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>我的评论</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.setting}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-cog" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>设置</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

							<TouchableOpacity style={styles.reback}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-bug" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}>反馈</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.points}>
								<View style={styles.myNotifyIco}>
									<Icon name="ios-bulb" size={14} color={'#555'} />
								</View>
								<View style={styles.myNotifyText}>
									<Text style={{fontSize:14}}> 关于</Text>
								</View>
								<View style={styles.myNotifyRight}>
									<Icon name="ios-arrow-forward" size={20} color={'#999'} />
								</View>
							</TouchableOpacity>

					{/*<TouchableOpacity
						onPress={this.onPress.bind(this)}
						style={[styles.button, {borderRadius: buttonBorderRadius}]}
					>
						<Text style={{color: '#fff'}}>立即登录</Text>
					</TouchableOpacity>*/}
						</ScrollView>
				}
			</View>
		)
	}
}