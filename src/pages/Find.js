/**
 * Created by luzhuang on 2017/5/26.
 */
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	NavigatorIOS,
	Text,
	View,
	ScrollView,
} from 'react-native';

class List extends Component {
	render() {
		return (
			<ScrollView style={styles.flex}>
				<View style={styles.list_item}>
					<Text style={styles.list_item_font} onPress={this.goTo.bind(this)}>
						Swift - 滑块（UISlider）的用法
					</Text>
				</View>
				<View style={styles.list_item}>
					<Text style={styles.list_item_font} onPress={this.goTo.bind(this)}>
						Swift - 告警框（UIAlertView）的用法
					</Text>
				</View>
				<View style={styles.list_item}>
					<Text style={styles.list_item_font} onPress={this.goTo.bind(this)}>
						Swift - 选择框（UIPickerView）的用法
					</Text>
				</View>
			</ScrollView>
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

class Detail extends Component {
	render() {
		return (
			<ScrollView>
				<Text>这个是详情页。欢迎访问hangge.com</Text>
			</ScrollView>
		);
	}
}

class NV extends Component {
	render() {
		return(
			<NavigatorIOS
				style={{flex:1}}
				initialRoute={{
					component: List,
					title: '列表',
					passProps: {},
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('HelloWorld', () => NV);