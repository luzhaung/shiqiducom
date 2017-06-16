/**
 * Created by luzhuang on 2017/5/26.
 */
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FacebookTabBar = React.createClass({
	tabIcons: [],

	propTypes: {
		goToPage: React.PropTypes.func,
		activeTab: React.PropTypes.number,
		tabs: React.PropTypes.array,
		tabNames: React.PropTypes.array, // 保存Tab名称
	},

	componentDidMount() {
		this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
	},

	setAnimationValue({ value, }) {
		this.tabIcons.forEach((icon, i) => {
			const progress = Math.min(1, Math.abs(value - i));
			icon.setNativeProps({
				style: {
					color: this.iconColor(progress),
				},
			});
		});
	},

	//color between rgb(59,89,152) and rgb(204,204,204)
	iconColor(progress) {
		const red = 1 + (204 - 59) * progress;
		const green = 1 + (204 - 89) * progress;
		const blue = 1 + (204 - 152) * progress;
		return `rgb(${red}, ${green}, ${blue})`;
	},

	render() {
		return <View style={[styles.tabs, this.props.style, ]}>
			{this.props.tabs.map((tab, i) => {
				const activityTab = this.props.activeTab === i;
				const currentColor = activityTab ? '#000' : '#999';
				return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
					<Icon
						name={activityTab ? tab : tab+'-outline'}
						size={20}
						color={currentColor}
						ref={(icon) => { this.tabIcons[i] = icon; }}
					/>
					<Text style={styles.iconText}>{this.props.tabNames[i]}</Text>
				</TouchableOpacity>;
			})}
		</View>;
	},
});

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
	},
	tabs: {
		height: 50,
		flexDirection: 'row',
		paddingTop: 10,
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomColor: 'rgba(0,0,0,0.05)',
		borderTopColor: '#f3f3f3',
		backgroundColor: '#fff',
	},
	iconText: {
		fontSize: 12,
	}
});

export default FacebookTabBar;
