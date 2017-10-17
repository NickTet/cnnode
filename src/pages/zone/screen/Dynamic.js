/**
 * Created by zhangjing on 2017/10/16.
 */
import React,{PureComponent} from 'react'
import { connect } from 'dva/mobile';
import  Tip from '../../../components/Tip';
import { StyleSheet, View, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'
const { width } = Dimensions.get('window');
import Card from '../components/Card'
class Dynamic extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {}
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            headerTitle: title,
        };
    };
    render(){
        const { navigate, state } = this.props.navigation;
        const { data = [] } = state.params
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                {
                    data.length > 0 ?
                        <FlatList
                            style={{ width: width }}
                            data={data}
                            extraData={this.state}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => <Card navigate={navigate} item={item} />}
                        />
                        : <Tip message={{ text: '暂无消息' }} />
                }
            </View >
        );
    }
}

function mapStateToProps(state) {
    const {loading}=state.zone;
    const {isLogin}=state.home;
    return{loading,isLogin}
}
function mapDispatchToProps(dispatch) {
    return {
        query(params) {
            dispatch({
                type: 'zone/query',
                payload: params,
            });
        },
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dynamic);