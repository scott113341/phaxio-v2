import request from 'superagent';

import { BASE_URL } from './constants.js';

export default class Client {

  constructor (apiKey, apiSecret) {
    this.key = apiKey;
    this.secret = apiSecret;
    this._request = minWait(this.__request.bind(this), 2000);
  }

  async __request (path, method = 'GET') {
    return () => request[method.toLowerCase()](BASE_URL + path)
      .auth(this.key, this.secret);
  }

  get Fax () {
    return {
      send: async ({ file, ...body }) => {
        const req = (await this._request('/faxes', 'POST'))();
        req.field(body);
        if (Array.isArray(file)) file.forEach(f => req.attach(`file[]`, f));
        else req.attach('file', file);
        return req;
      }
    };
  }

}

function pause (ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function minWait (fn, between) {
  let last = 0;

  return (...args) => {
    const now = Date.now();
    const wait = Math.max(0, between - now + last);
    last = now + wait;
    return pause(wait).then(() => fn(...args));
  };
}
