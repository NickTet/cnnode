/**
 * Created by zhangjing on 2017/10/10.
 */
import React from 'react';
import dva from 'dva/mobile';
import Navigation from './Navigation';
import models from './models';
import logger from 'redux-logger';
import devToolsEnhancer from 'remote-redux-devtools';
const app=dva({
    onAction:logger,
    extraEnhancers:[devToolsEnhancer({ realtime: true })],
});
Object.keys(models).map(key=>app.model(models[key]));
app.router(()=><Navigation />);
export default app.start();