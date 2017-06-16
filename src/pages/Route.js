/**
 * Created by luzhuang on 2017/5/27.
 */
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity
} from 'react-native';


import List from './List';
import Collect from './Collect';
import Mine from './Mines';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import FacebookTabBar from './FacebookTabBar';


class shiqidu extends Component {

	state = {
		tabNames: ['发现', '收藏', '我的'],
	};
	render() {
		let tabNames = this.state.tabNames;
		return(
			<ScrollableTabView
				style={{marginTop: 20, }}
				initialPage={0}
				renderTabBar={() => <FacebookTabBar tabNames={tabNames} />}
				tabBarPosition='bottom'
				tabBarBackgroundColor={{backgroundColor:'#fff'}}
			>
				<List tabLabel="ios-aperture" style={styles.tabView}>
				</List>
				<Collect tabLabel="ios-book" style={styles.tabView}>
				</Collect>
				<Mine tabLabel="ios-contact" style={styles.tabView}>
				</Mine>
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flex:1,
	},
	tabView: {
		flex: 1,
		padding: 10,
		backgroundColor: 'rgba(0,0,0,0.01)',
	},
	card: {
		borderWidth: 1,
		backgroundColor: '#fff',
		borderColor: 'rgba(0,0,0,0.1)',
		margin: 5,
		height: 150,
		padding: 15,
		shadowColor: '#ccc',
		shadowOffset: { width: 2, height: 2, },
		shadowOpacity: 0.5,
		shadowRadius: 3,
	},
});

export default shiqidu;