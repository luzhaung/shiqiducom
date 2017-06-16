/**
 * Created by luzhuang on 2017/6/11.
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
    TextInput,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../def/Color';
import {LoginlUrl} from '../def/Api';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
   container: {
       paddingVertical: 10,
       backgroundColor: '#ebebeb',
       height: height,
       alignItems: 'center',
       justifyContent: 'center',
   },
    input: {
        height: 40,
        backgroundColor: '#fff',
        borderBottomColor: '#fafafa',
        borderBottomWidth: 1,
        padding: 10,
    },
    inputWapper: {
        width: width - 20,
        margin: 10,
    },
    LoginButton: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: width - 20,
    },
    loginText: {
       color: '#fff',

    }
});


export default class Login extends Component{
    static navigationOptions = {
        title: '登录',
        headerStyle: {backgroundColor:'#ffffff',height:50},
    };
    state = {
        username: '',
        password: '',
        ready: false,
        loading: false,
    };



    async onPress (){
        this.setState({loading:true});
        let username = this.state.username;
        let password = this.state.password;
        if (username !== '' && password !== ''){
            const loginRes = await fetch(`${LoginlUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'username='+username+'&password='+password
            });
            textData = await loginRes.text();
            jsonData = JSON.parse(textData);
            if (jsonData.status === 1){
                AsyncStorage.setItem('access_token', jsonData.data);
                AsyncStorage.setItem('user_info', JSON.stringify(jsonData.user_info));
                this.setState({
                    ready: true,
                });
                const { navigate } = this.props.navigation;
                Alert.alert('提示信息', jsonData.info);
                navigate('Mines',{userInfo: jsonData.user_info});
            }else{
                Alert.alert('提示信息', jsonData.info);
            }
            this.setState({loading:false});
        }else{
            Alert.alert('请输入用户名和密码!');
            this.setState({loading:false});
        }
    }

    render(){
        const { username, password, ready, loading } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.inputWapper}>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="输入您的用户名或者邮箱"
                            autoCorrect={false}
                            maxLength={20}
                            onChangeText={(text) => this.setState({username:text})}
                        />
                    </View>
                    <View style={styles.inputWapper}>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            placeholder="输入您的登录密码"
                            autoCorrect={false}
                            keyboardType="ascii-capable"
                            maxLength={20}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({password:text})}
                        />
                    </View>
                    <View style={styles.LoginButton}>
                        {
                            loading ?
                                <View style={styles.button}>
                                    <ActivityIndicator/>
                                </View>
                                :
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.onPress.bind(this)}
                                >
                                    <Text style={styles.loginText}>立即登录</Text>
                                </TouchableOpacity>
                        }

                    </View>
                </ScrollView>

            </View>
        )
    }
}