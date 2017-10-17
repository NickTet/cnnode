/**
 * Created by zhangjing on 2017/10/10.
 */
import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native'
export default class Notice extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = ({ navigation }) => {
        const { state, setParams, navigate } = navigation;
        return {
            headerLeft: (
                <Image style={styles.headerLeft} source={require('../../assets/images/logo.png')} resizeMode='contain' />
            ),
            headerRight: (
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerTouch} onPress={() => { navigate('Contact') }}>
                        <Image style={styles.headerBtn} source={require('../../assets/images/group.png')} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerTouch} onPress={() => { navigate('AddFriend') }}>
                        <Image style={styles.headerBtn} source={require('../../assets/images/search.png')} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            ),
            tabBarIcon: ({ focused, tintColor }) => (
                <Image
                    resizeMode="contain"
                    style={styles.iconBtn}
                    source={!focused ? require('../../assets/images/notic_0.png') : require('../../assets/images/notic_1.png')} />
            ),
            tabBarLabel: '通知',
        };
    };
    render(){
        return(<Text>涉及即时通讯，功能正在开发中</Text>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },

    headerLeft: {
        height: 44,
        width: 80,
        marginLeft: 15
    },

    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    headerTouch: {
        height: 30
    },

    headerBtn: {
        flex: 1,
        width: 30,
        height: 30,
        marginRight: 15
    },

    rowList: {
        marginTop: 10,
    },

    row: {
        paddingLeft: 27,
        paddingRight: 27,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },

    rowImg: {
        width: 20,
        height: 20,
        marginRight: 20,
    },

    avatar: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
    },

    rowInner: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: '#F0F0F0',
    },

    rowText: {
        fontSize: 16,
        fontWeight: '400',
    },

    iconBtn: {
        width: 25,
        height: 25,
    },

    span: {
        color: '#999',
        fontSize: 14,
    }
});