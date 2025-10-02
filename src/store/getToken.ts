import {store} from './store';
export const getToken = () => store.getState()?.onBoarding?.accessToken;
export const getToken1 = () => store.getState()?.onBoarding?.accessToken1;
