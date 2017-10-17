import React, { PureComponent } from 'react';
import { connect } from 'dva/mobile';
import Card from '../components/Card';
import Header from '../components/Header';
import { StyleSheet, View, ScrollView, RefreshControl, Text, Button, Image, StatusBar, FlatList, Dimensions, TouchableOpacity } from 'react-native'

const { width } = Dimensions.get('window');

class Zone extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerTitle: '空间',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.query(params)
  }

  render() {
    const { params } = this.props.navigation.state;
    const { other_user, other_data, loading } = this.props
    const { navigate } = this.props.navigation;
    const headerProps = { data: other_data, navigate }

    return (
      <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={() => { this.props.query(params) }} refreshing={loading} />}>
        <StatusBar barStyle="light-content" />
        <Header {...headerProps} />
        <View style={styles.rowList}>
          <TouchableOpacity onPress={() => { navigate('Dynamic', { title: '最近回复', data: other_data.recent_replies }) }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../../assets/images/comment.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>最近回复</Text>
                <Text style={styles.span}>{other_data.recent_replies ? other_data.recent_replies.length : '0'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Dynamic', { title: '最新发布', data: other_data.recent_topics }) }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../../assets/images/post.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>最新发布</Text>
                <Text style={styles.span}>{other_data.recent_topics ? other_data.recent_topics.length : '0'}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigate('Collect', { ...params }) }}>
            <View style={styles.row}>
              <Image style={styles.rowImg} source={require('../../../assets/images/collection.png')} resizeMode='contain' />
              <View style={styles.rowInner}>
                <Text style={styles.rowText}>话题收藏</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView >
    );
  }
}

function mapStateToProps(state) {
  const { other_data, loading } = state.zone;
  return { other_data, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    query(params) {
      dispatch({
        type: 'zone/otherInfo',
        payload: params,
      });
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
