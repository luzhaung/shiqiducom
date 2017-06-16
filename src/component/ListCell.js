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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
// const imgWidth = width - 20;
const imgWidth = 100;
const styles = StyleSheet.create({
	root: {
		marginTop: 15,
		paddingBottom: 15,
		borderBottomColor: '#eee',
		borderBottomWidth: 1,
		flexDirection: 'row',
		paddingHorizontal: 10,
	},
	img: {
		width: imgWidth,
		height: imgWidth / 1.5,
		marginRight: 5,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	mainRight: {
		flex: 1,
		marginRight: 0,
		alignSelf: 'center',
	},
	title: {
		fontSize: 16,
		/*fontWeight: '500',*/
		lineHeight: 20,
		// 阴影
		textShadowOffset:{width:0.5, height:0.5},
		// 阴影颜色
		textShadowColor:'#fff'
	},
	ar_bottom: {
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
	},
	avatar: {
		width: 20,
		height: 20,
		borderRadius: 10,
		flexDirection: 'row',
	},
	author_name: {
		marginLeft: 5,
		lineHeight: 20,
		fontSize: 12,
	},
	post_time: {
		lineHeight: 20,
		marginLeft: 5,
		fontSize: 12,
		color: '#666'
	},
	comments_ico: {
		right: 15,
		position: 'absolute',
		lineHeight: 20,
	},
	comments_num: {
		lineHeight: 20,
		right: 0,
		fontSize: 12,
		position: 'absolute',
		color: '#666',
		alignItems: 'center'
	}
});

const renderImg = (img) => {
	if(img !== undefined){
		img = 'https://www.shiqidu.com' + img;
		return <Image source={{uri: img}} style={styles.img}/>;
	}else{
		return null;
	}
};
const ListCell = (props) =>{
	const { title, image, avatar, author_name, post_time, comments_num, onPress } = props;
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.root}>
				{renderImg(image)}
				<View style={styles.mainRight}>
					<Text numberOfLines={2} style={styles.title}>
						{title}
					</Text>
					<View style={styles.ar_bottom}>
						<Image source={{uri: avatar}} style={styles.avatar}/>
						<Text style={[styles.fonts, styles.author_name]}>{author_name}</Text>
						<Text style={[styles.fonts, styles.post_time]}>{post_time}</Text>
						<Text style={[styles.fonts, styles.comments_num]}>{comments_num} 评论</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)

};

export default ListCell;