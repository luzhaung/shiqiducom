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
	TouchableOpacity
} from 'react-native';
import {
	StackNavigator,
	TabNavigator,
} from 'react-navigation';

import List from './List';
import Icon from 'react-native-vector-icons/Ionicons';


class App extends Component {
	render() {
		let tabNames = this.state.tabNames;
		let tabIconNames = this.state.tabIconNames;
		return(

			<NavigatorIOS
				style={{flex:1}}
				initialRoute={{
					component: List,
					title: '发现',
					passProps: {},
				}}
			  barTintColor={'#fafafa'}
				translucent={true}
				shadowHidden={true}
			/>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flex:1,
	}
});

export default App;