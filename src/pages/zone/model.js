/**
 * Created by zhangjing on 2017/10/16.
 */
import * as service from './service'
import { AsyncStorage } from 'react-native'
export default {
    namespace:'zone',
    state:{
        data: {},
        info: {},
        collects: [],
        other_data: {},
        setting: { draft: true, notic: true },
        loading: false,
        scanlogin:''
    },
    effects: {
        *init({payload = {}}, {select, call, put}) {
            const user = yield select(state => state.home.user);
            //select用于获取store的数据
            const accesstoken = yield select(state => state.home.accesstoken);
            if (Object.keys(user).length > 0) yield put({type: 'query', payload: {user}})
            var setting = yield AsyncStorage.getItem('setting')
            if (setting) yield put({type: 'config', payload: JSON.parse(setting)})
        },
        *login({payload = {}}, {call, put})
        {
            const {accesstoken}=payload
            yield put({type: 'loading', payload: true});
            const {data, err} = yield call(service.postToken, payload);
            yield put({type: 'loading', payload: false});
            if (err) return console.log(err);
            yield put({type: 'login/success', payload: data});
            //home model里面声明了这个action
            yield put({type: 'home/token', payload: accesstoken});
            const [,user]=data;
            yield put({type: 'query', payload: {user, login: true}})

        },
        *query({payload = {}}, {call, put}){
            const { user, login } = payload
            yield put({ type: 'loading', payload: true });
            yield put({ type: 'home/user', payload: user });
            const { data, err } = yield call(service.queryUser, { user: user.loginname });
            yield put({ type: 'loading', payload: false });
            if (err) return console.log(err)
            if (login) yield put({ type: 'notice/init', payload: true });    //重新登录聊天
            yield put({ type: 'home/isLogin', payload: true })
            yield put({ type: 'query/success', payload: data });
        },
        *otherInfo({ payload = {} }, { call, put }) {
            yield put({ type: 'loading', payload: true });
            const { data, err } = yield call(service.queryUser, payload);
            yield put({ type: 'loading', payload: false });
            if (err) return console.log(err)
            yield put({ type: 'otherInfo/success', payload: data });
        },
        *information({ payload = {} }, { call, put }) {
            yield put({ type: 'loading', payload: true });
            const { data, err } = yield call(service.queryInfo, payload);
            yield put({ type: 'loading', payload: false });
            if (err) return console.log(err)
            yield put({ type: 'information/success', payload: data });
        },
        *collects({ payload = {} }, { call, put }) {
            yield put({ type: 'loading', payload: true });
            const { data, err } = yield call(service.queryCollects, payload);
            yield put({ type: 'loading', payload: false });
            if (err) return console.log(err)
            yield put({ type: 'collects/success', payload: data });
        },
        *logout({ payload = {} }, { call, put }) {
            AsyncStorage.removeItem('user')
            AsyncStorage.removeItem('accesstoken')
            AsyncStorage.removeItem('webim_user')
            AsyncStorage.removeItem('webim_accesstoken')
            yield put({ type: 'home/isLogin', payload: false })
            yield put({ type: 'home/clean', payload: true });
            yield put({ type: 'home/token', payload: '' });
            yield put({ type: 'notice/clean', payload: true });
            yield put({ type: 'clean', payload: true });
            yield call(service.logout);
        },
    },
        reducers: {
            'login/success'(state, { payload }) {
                const [, data] = payload
                return { ...state, user: data };
            },
            'query/success'(state, { payload }) {
                const [, result] = payload
                const data = service.parseUser(result.data)
                AsyncStorage.setItem('user',JSON.stringify(data))
                return { ...state, data };
            },
            'otherInfo/success'(state, { payload }) {
                const [, result] = payload
                const data = service.parseUser(result.data)
                return { ...state, other_data: data };
            },
            'information/success'(state, { payload }) {
                const [, data] = payload
                const info = service.parseInfo(data)
                return { ...state, info };
            },
            'collects/success'(state, { payload }) {
                const [, data] = payload
                const collects = service.parseCollects(data.data)
                return { ...state, collects };
            },
            'de_collect'(state, { payload }) {
                const collects = state.collects.filter(collect => collect.id !== payload);
                return { ...state, collects };
            },
            'loading'(state, { payload: data }) {
                return { ...state, loading: data };
            },
            'config'(state, { payload: data = {} }) {
                AsyncStorage.setItem('setting', JSON.stringify(data));
                return { ...state, setting: data };
            },
            'clean'(state, { payload: data }) {
                return { ...state, data: {} };
            },
            'cleanInfo'(state) {
                return { ...state, info: {} };
            },

        },
        subscriptions: {

        }

}