/**
 * Created by marno on 2017/4/13
 * Function:
 * Desc:
 */

'use strict';
import React, {Component} from "react";
import {Text, View,StyleSheet} from "react-native";
import {QRScannerView} from 'ac-qrcode';
import {connect} from 'dva/mobile'
import {ImageButton} from "../../../components/ImageButton";
import Colors from "../../../utils/Colors";


class ScanScreen extends Component {
    render() {
        return (

            < QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}

                renderTopBarView={() => this._renderTitleBar()}

                renderBottomMenuView={() => this._renderMenu()}
            />
        )
    }

    _renderTitleBar(){
        return(
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            ></Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{color:'white',textAlignVertical:'center', textAlign:'center',font:20,padding:12}}
            ></Text>
        )
    }
    _onLogin=(accesstoken)=>{
        if (!accesstoken)return
        this.props.login({accesstoken})
    }
    _ontoken=(accesstoken)=>{
        if (!accesstoken)return
        this.props.token(accesstoken)
    }

    barcodeReceived(e) {
         // this._ontoken(e.data)
        console.log("***********"+JSON.stringify(this.props))
        const {navigation}=this.props
        const {state}=navigation;
        const setToken=this.props.navigation.state.params.onGoBack();
        if (typeof setToken ==="function"){
            setToken(e.data)
        }

        navigation.goBack(null)
    }
}
function mapDispatchToProps(dispatch) {
    return{
        login(params){
            dispatch(
                {type: 'zone/login', payload: params}
            );
        },
        token(params){
            dispatch(
                {type: 'home/token', payload: params}
            );
        }
    }
}
function mapStateToProps(state) {
    const {scanlogin} =state.zone;
    return {scanlogin}
}
const Styles= StyleSheet.create({
    image_camera: {
        height: 30,
        width: 30,
        position:'absolute',
        right:16,
        bottom:16,
    },
    image_top_close: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        margin:16,
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(ScanScreen)