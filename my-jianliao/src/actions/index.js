import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import * as types from '../constants/actionTypes'

import config from '../constants/config'

const parseJSON = (res)=> res.json();

export const onEmailSignup = (data,options={})=>(dispatch,getState)=>{
	const oldState = getState();
	const url = `/account/signup`
	fetch(url,{
		method: 'POST',
		headers: {
		    'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
  		credentials: 'include'
	})
	.then(parseJSON)
	.then(res=>{
		if (res.status >= 400) throw new Error("Bad response from server");

        if(res.status===201){
        	if(options.success) options.success(res)
        }else{
        	if(options.error) options.error(res)
        }
	}).catch(err=>{
		console.log(err);
	})
}