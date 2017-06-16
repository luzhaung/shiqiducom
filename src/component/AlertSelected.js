'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [width-28, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];

export default class AlertSelected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            title: "",
            choose0: "",
            choose1: "",
            hide: true,
        };
        this.entityList = [];//数据源
        this.callback=function(){};//回调方法
    }

    render() {
        if(this.state.hide){
            return (<View />)
        } else {
            return (
                <View style={styles.container} >
                    <Animated.View style={ styles.mask } >
                    </Animated.View>

                    <Animated.View style={[styles.tip , {transform: [{
                        translateY: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [height, (height-aHeight -34)]
                        }),
                    }]
                    }]}>
                        <View style={styles.tipTitleView}>
                            <Text style={styles.tipTitleText}>{this.state.title}</Text>
                        </View>
                        {
                            this.entityList.map((item,i)=>this._renderItem(item,i))
                        }

                        <View style={styles.gap}/>

                        <TouchableHighlight style={styles.button} underlayColor='#f0f0f0' onPress={this.iknow.bind(this)}>
                            <Text style={styles.buttonText}>取消</Text>
                        </TouchableHighlight>
                    </Animated.View>
                </View>
            );
        }
    }

    _renderItem(item , i) {
        return (
            <TouchableHighlight key={i} style={styles.tipContentView} underlayColor='#f0f0f0' onPress={this.choose.bind(this,i)}>
                <Text style={styles.tipText} >{item}</Text>
            </TouchableHighlight>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,//一个用于定义曲线的渐变函数
                    duration: 500,//动画持续的时间（单位是毫秒），默认为500。
                    toValue: 0.8,//动画的最终值
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            )
        ]).start((finished) => this.setState({hide: true}));

        // this.timer = setTimeout(
        //   () => this.setState({hide: true}),
        //   500
        // );
    }

    //取消
    iknow(event) {
        if(!this.state.hide){
            this.out();
        }
    }

    //选择
    choose(i) {
        if(!this.state.hide){
            this.out();
            this.callback(i);
        }
    }

    /**
     * 弹出控件，最多支持3个选项
     * titile: 标题
     * entityList：选择项数据   数组
     * callback：回调方法
     */
    show(title: string, entityList:Array,callback:Object) {
        this.entityList = entityList;
        this.callback=callback;

        if(this.state.hide){
            if(entityList && entityList.length > 0){
                var len = entityList.length;
                if(len == 1){
                    this.setState({title: title, choose0: entityList[0], hide: false}, this.in);
                }else if (len == 2) {
                    this.setState({title: title, choose0: entityList[0], choose1: entityList[1], hide: false}, this.in);
                }
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    mask: {
        justifyContent:"center",
        backgroundColor:"#383838",
        opacity:0.8,
        position:"absolute",
        width:width,
        height:height,
        left:left,
        top:top,
    },
    tip: {
        width:aWidth,
        height:aHeight,
        left:middleLeft,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"space-between",
    },
    tipTitleView: {
        height:55,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    tipTitleText:{
        color:"#999999",
        fontSize:14,
    },
    tipContentView: {
        width:aWidth,
        borderTopWidth:0.5,
        borderColor:"#f0f0f0",
        height:45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    tipText:{
        color:"#e6454a",
        fontSize:17,
        textAlign:"center",
    },
    button: {
        height: 45,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize:17,
        color:"#e6454a",
        textAlign:"center",
    },
    gap:{
        height:10,
        width:aWidth,
        backgroundColor:'#383838',
        opacity:0.8,
    },
});
