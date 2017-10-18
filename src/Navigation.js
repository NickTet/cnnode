/**
 * Created by zhangjing on 2017/10/10.
 */
import Home from './pages/home/Home'
import Notice from './pages/notice/Notice'
import Zone from './pages/zone/Zone'
import Recruit from './pages/recruit/Recruit'
import Detail from './pages/detail/Detail'
import Publish from './pages/publish/Publish'
import Login from './pages/zone/screen/Login'
import Dynamic from './pages/zone/screen/Dynamic'
import Setting from './pages/zone/screen/Setting'
import Collect from './pages/zone/screen/Collect'
import Credits from './pages/zone/screen/Credits'
import Personal from './pages/zone/screen/Personal'
import Center from './pages/zone/screen/Center'
import Scan from './pages/zone/screen/Scan'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const Tabs=TabNavigator({
    Home:{screen:Home},
    Recruit:{screen:Recruit},
    Notice:{screen:Notice},
    Zone:{screen:Zone}
},{
    tabBarOptions:{
        activeTintColor:'#7a86a2',
        style:{
            backgroundColor:'#fff'
        },

    },
    lazy:true,//懒加载
    swipeEnabled:false,
    animationEnabled:false ,  //关闭安卓底栏动画
    tabBarPosition:'bottom',
    tabBarComponent:TabBarBottom  //解决安卓底栏不显示图标问题
});

const Navigation=StackNavigator({
    Tabs: { screen: Tabs },
    Detail: { screen: Detail },
    Publish: { screen: Publish },
    Login:{screen:Login},
    Dynamic:{screen:Dynamic},
    Setting:{screen:Setting},
    Collect:{screen:Collect},
    Credits:{screen:Credits},
    Personal:{screen:Personal},
    Publish:{screen:Publish},
    Center:{screen:Center},
    Scan:{screen:Scan},

},{
    initialRouteName:'Tabs',
    navigationOptions:{
        headerStyle: {
            backgroundColor: '#2D2D2D',
        },
        headerBackTitle: null,
        headerTintColor: '#FFFFFF',
    },
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal, // 安卓导航进入 左右方式
    }),
    headerMode:'screen'// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
})

export default Navigation;