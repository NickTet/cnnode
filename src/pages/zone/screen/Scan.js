/**
 * Created by zhangjing on 2017/10/18.
 */
import React,{PureComponent} from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {connect} from 'dva/mobile'
import {
    AppRegistry,
    StyleSheet,
    Text,
    NavigatorIOS,
    TouchableOpacity,
    Linking,
} from 'react-native';
class Scan extends PureComponent{
    constructor(props){
        super(props);
        this.state={}
    }
    onSuccess(e) {
        // Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        // const {}=e.data
        this._onLogin(e.data)
        const {navigation}=this.props
        navigation.goBack("Tabs")
    }
    render(){
       return(
           <QRCodeScanner style={{flex:1}}
                          onRead={this.onSuccess.bind(this)}/>
       )
    }
    _onLogin=(accesstoken)=>{
        if (!accesstoken)return
        this.props.login({accesstoken})
    }
}
function mapStateToProps(state) {
    const {scanlogin}=state.zone;
    return {scanlogin}
}

function mapDispatchToProps(dispatch) {
    return{
        login(params){
            dispatch({
                type: 'zone/login',
                payload: params,
            })
        },

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Scan)