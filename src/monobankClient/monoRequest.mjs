import fetch from 'node-fetch';
// import {monoUrls} from '../constants.mjs'
import { myConst } from '../../myConsts';

export async function monobankRequest(url, method = 'GET') {
    try {
        const options = {
            method: method,
            headers: {
                'X-token': myConst.monoToken //monoUrls.monoToken
            }
        };
        
        let response = await fetch(url, options);
        let result = await response.json();
        return result;
    } catch (err){
        console.log('Mono request error >> ' + err);
    }   
};

