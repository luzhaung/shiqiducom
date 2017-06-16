/**
 * Created by luzhuang on 2017/5/31.
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

	root: {
		marginTop: 15,
		paddingBottom: 15,
		borderBottomColor: '#eee',
		borderBottomWidth: 1,
		flexDirection: 'row',
		width: width
	},
	icon: {
		marginLeft:5,
	},
	avatar: {
		height: 20,
		width: 20,
		borderRadius: 10,
		justifyContent: 'flex-start'
	},
	right: {
		marginLeft: 5,
	},
	rightTop: {
		flexDirection: 'row',
		width: width-45
	}
	,
	username: {
		color: '#406599',
		fontWeight: '500',
	},
	flow_number: {
		flexDirection: 'row',
		position: 'absolute',
		right: 0,
	},
	flow_number_text: {
		color: 'gray',
		fontSize: 12,
	},
	rightMiddle: {
		marginVertical: 5,
	},
	rightBottom: {
		flexDirection: 'row'
	},
	cm_detail: {
		width : width-40,
	},
	up_text: {
		marginLeft:2,
		fontSize:12,
		color: 'gray'
	},
	time_text: {
		fontSize:12,
		color: 'gray'
	},
	emoji: {
		height: 14,
		width: 14,
	},
});

const content_detail = StyleSheet.create({


});
function renderNode(node, index, siblings, parent, defaultRenderer) {
	if (node.name === 'img') {
		const img = node.attribs;
		const imgContent = "https://www.shiqidu.com" + img.src;
		console.log(imgContent);
		return (
			<Image source={{uri: imgContent}} style={styles.emoji} />
		);
	}
}

const Comments = (props)=>{
	const { username, avatar, post_time, contents, up, flow_number } = props;
	return (
		<TouchableOpacity>
			<View style={styles.root}>
				<View style={styles.left}>
					<Image source={{uri: avatar}} style={styles.avatar} />
				</View>
				<View style={styles.right}>
					<View style={styles.rightTop}>
						<Text style={styles.username}>{username}</Text>
						<View style={styles.flow_number}>
							<Icon name="ios-thumbs-up-outline" size={14} color={'gray'} style={styles.icon} />
							<Text style={styles.up_text}>{up}</Text>
						</View>
					</View>
					<View style={[styles.rightMiddle,styles.cm_detail]}>
						<HTMLView
							value={contents}
							renderNode={renderNode}
							stylesheet={content_detail}
						/>
					</View>
					<View style={styles.rightBottom}>
						<Text style={styles.flow_number_text}>{flow_number}楼 · </Text>
						<Text style={styles.time_text}>{post_time} </Text>
						<Icon name="ios-redo" size={14} color={'gray'} style={styles.icon} />
						<Text style={styles.up_text}>回复</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Comments;