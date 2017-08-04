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
    AsyncStorage,
    Alert,
    TextInput,
	WebView,
    Platform,
	ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ActionSheet from 'react-native-actionsheet'
import {uploadImage} from '../def/Api';
const {height, width} = Dimensions.get('window');
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = [ '取消上传', '选择单张', '选择多张', '裁剪图片', '打开相机' ];
const title = '上传图片';
const styles = StyleSheet.create({
    container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#ffffff',
		height: height,
	},
    richText: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
		height: 500,
    },
	empty: {
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	},
    textContent: {
		width: width - 20,
		height: 70,
        textAlignVertical: 'top',
		fontSize: 14,
	},
    bottomBar: {
		flexDirection: 'row',
	},
    camera: {
		/*width: 40,*/
	},
    thumbImages: {
		/*width: width - 20,*/
		height: 50,
		flex: 1,
	},
    thumbImagesView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
	},
    TextToolbar: {
		backgroundColor: '#dedede',
	},
    icon: {
    },
});
export default class Create extends Component{
	static navigationOptions = {
		title: '发表',
		headerStyle: {backgroundColor:'#ffffff',height:50},
		tabBarIcon: ({ tintColor, focused }) => (
			focused
				?
			<Icon name="ios-add-circle" size={22} color={tintColor} />
				:
			<Icon name="ios-add-circle-outline" size={22} color={tintColor} />
		),
	};

	/*state = {

	};*/
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            images: null,
            textContent: '',
        };
        this.showActionSheet = this.showActionSheet.bind(this);
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    handlePress(i) {
        switch (i){
            case 1:
                this.selectPhoto();
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
    }


    renderImage(image) {
        return <Image style={{width: 50, height: 50, resizeMode: 'center'}} source={image} />
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }

    uploadImage(uri){
        let formData = new FormData();
        let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};

        formData.append("images",file);

         fetch(`${uploadImage}`,{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
         })
		 .then((response) => response.text() )
		 .then((responseData)=>{
		  	 console.log('responseData',responseData);
		 })
		 .catch((error)=>{console.error('error',error)});
    }

	selectPhoto(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            console.log('received image: '+image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                images: null
            });
            // 发送到服务器保存图片
            this.uploadImage(image.path);
            // this.uploadImage(image.path).catch(e=>{console.log('服务器错误：'+e.message ? e.message : e);});
        }).catch(e => {

            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
	}

    selectMultiPhoto(){
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
        });
	}
    selectCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
	}

	cropPhoto(){
        ImagePicker.openCropper({
            path: 'my-file-path.jpg',
            width: 300,
            height: 400
        }).then(image => {
            console.log(image);
        });
	}

    async componentDidMount(){
    	// 判断是否已经登录
		const access_token = await AsyncStorage.getItem('access_token');
		if (!access_token){
            const { navigate } = this.props.navigation;
			Alert.alert('提示信息', '请先登录!');
            navigate('Login');
		}else{
            console.log(access_token);
		}
	}

	render() {
		return (
			<View style={styles.container}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
				<ScrollView style={styles.thumbImages}>
					<View style={styles.thumbImagesView}>
						{this.state.image ? this.renderAsset(this.state.image) : null}
						{this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
					</View>
				</ScrollView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
                {Platform.OS === 'ios' && <KeyboardSpacer/>}
				{/*<View style={styles.bottomBar}>
					<TouchableOpacity
						style={styles.camera}
						onPress={this.selectPhoto.bind(this)}
					>
						<Icon name="ios-crop" size={50} color={'gray'} style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.camera}
						onPress={this.selectMultiPhoto.bind(this)}
					>
						<Icon name="ios-images" size={50} color={'gray'} style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.camera}
						onPress={this.selectCamera.bind(this)}
					>
						<Icon name="ios-camera" size={50} color={'gray'} style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.camera}
						onPress={this.cropPhoto.bind(this)}
					>
						<Text>裁剪照片</Text>
					</TouchableOpacity>
				</View>*/}
			</View>
		)
	}
}