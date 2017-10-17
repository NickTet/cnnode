/**
 * Created by zhangjing on 2017/10/10.
 */
import * as service from './service';
import { AsyncStorage } from 'react-native'

export default {
    //global state的key名
    namespace: 'home',
    //global state初始化
    state: {
        page: 1,
        tab: 'all',
        data: [],
        user: {},
        accesstoken: '',
        webim_user: {},   // 因为home页面最先加载，因此把用户信息都存在home,其他页面从中提取
        webim_accesstoken: '',
        loading: false,
        isLogin: false
    },
    effects: {
        *init({payload = {}}, {call, put}){
            const user = yield AsyncStorage.getItem("user");
            const accesstoken = yield AsyncStorage.getItem("accesstoken");
            const webim_user = yield AsyncStorage.getItem("webim_user");
            const webim_accesstoken = yield AsyncStorage.getItem("webim_accesstoken");
            console.log(">>>>>>>>>>>>>"+accesstoken)
            if (user) yield put({type: 'user', payload: JSON.parse(user)});
            if (accesstoken) yield put({type: 'token', payload: accesstoken});
            if (user&&accesstoken){
                yield put({type:'isLogin',payload:true})
            }
            if (webim_user && webim_accesstoken) yield put({
                type: 'webim_user',
                payload: {user: JSON.parse(webim_user), access_token: webim_accesstoken}
            })
        },
        *query({payload = {}}, {call, put})
        {
            const { page = 1, tab } = payload
            yield put({type: 'tab', payload: tab});
            if (page==1)yield put({type: 'loading', payload: true});
            const {data, err}=yield call(service.queryTopics, payload);
            yield put({type: 'loading', payload: false});
            if (err)return console.log(err);
            yield put({type: 'page', payload: page});
            if (page == 1) yield put({type: 'query/success', payload: data});
            else yield put({type: 'more/success', payload: data})

        },
    },
    reducers:{
        'query/success'(state,{payload}){
            const [,data]=payload;
            const topics=service.parseTopics(data.data);
            return{...state,data:topics}
        },
        'more/success'(state,{payload}){
            const [,data]=payload;
            const topics=service.parseTopics(data.data);
            return {...state,data:[...state.data, ...topics]}
        },
        'tab'(state,{ payload: data }){
            return{...state,tab:data}
        },
        'page'(state,{payload:page}){
            return{...state,page}
        },
        'user'(state,{payload:data}){
            if (Object.keys(state.user).length==0)AsyncStorage.setItem('user',JSON.stringify(data));
            return {...state,user:data}
        },
        'token'(state,{payload:token}){
            if (state.accesstoken.length==0){
                AsyncStorage.setItem('accesstoken',token);
            }
            return {...state,accesstoken:token}
        },
        'webim_user'(state,{payload:data}){
            const {user,access_token}=data;
            if (Object.keys(state.webim_user).length==0)AsyncStorage.setItem('webim_user',user);
            if (!state.webim_accesstoken) AsyncStorage.setItem('webim_accesstoken', access_token);
            return {...state,webim_user:user,webim_accesstoken:access_token};
        },
        'loading'(state,{payload:data}){
            return {...state,loading:data};
        },
        'isLogin'(state,{payload:data}){
            return { ...state, isLogin: data };
        },
        'clean'(state,{payload:data}){
            return{...state,user:{},access_token:'',webim_user:{},webim_accesstoken:''}
        }

    }
}