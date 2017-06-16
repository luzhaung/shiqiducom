/**
 * Created by luzhuang on 2017/5/26.
 */
import React, { Component } from 'react';
import {
	StackNavigator,
	TabNavigator,
} from 'react-navigation';

import List from './pages/List';
import Detail from './pages/Detail';
import Create from './pages/Create';
import Mines from './pages/Mines';
import Login from './pages/Login';

const Mytab = TabNavigator({
	List: {screen: List},
	Create: {screen: Create},
	Mines: {screen: Mines},
},{
	tabBarPosition: 'bottom',
	tabBarOptions: {
		activeTintColor: '#000',
		inactiveTintColor: '#666',
		translucent: true,
		labelStyle: {
			/*fontSize: 18,
			 marginBottom: 13,*/
		},
		style: {
			backgroundColor: '#fafafa',
		},
	}

});

const shiqiducom = StackNavigator({
	Mytab: {screen: Mytab},
	Detail: {screen: Detail},
    Login: {screen: Login},
}, {
	headerMode: 'screen',
	translucent: true,
	style: {
		backgroundColor: '#ffffff',
	}
});

export default shiqiducom;