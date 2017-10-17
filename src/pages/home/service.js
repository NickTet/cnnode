/**
 * Created by zhangjing on 2017/10/11.
 */
import {get} from '../../utils/request'
import {moment} from '../../utils/tool'

export async function queryTopics(params) {
    const {page=1,tab='all',limit=20,mdrender=true}=params;
    return get(`/topics?page=${page}&limit=${limit}&tab=${tab}&mdrender=${mdrender}`);
}


export function parseTopics(data) {
    const tabs={ 'top': '置顶', 'ask': '问答', 'good': '精华', 'share': '分享', 'job': '招聘', 'dev': '测试', 'default': '暂无' }
    const topics=data.map(topic=>{
        const create_at=moment(topic.create_at).startOf('minute').fromNow();
        const last_reply_at=moment(topic.last_reply_at).startOf('minute').fromNow();
        const avatar_url=topic.author.avatar_url;
        if(avatar_url&&!avatar_url.startsWith('https'))topic.author.avatar_url = 'https:' + avatar_url;
        let tab=topic.tab?topic.tab:'default'
        if (topic.top) tab='top';
        if (topic.goog) tab='good';
        const sort=tabs[tab];
        const title=topic.title.replace(/[\r\n]/g, '');
        return {...topic,create_at,last_reply_at,tab,title,sort}
    });
    return topics;
}