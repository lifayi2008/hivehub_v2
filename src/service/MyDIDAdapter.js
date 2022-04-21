import { DefaultDIDAdapter } from '@elastosfoundation/did-js-sdk';

export default class MyDIDAdapter extends DefaultDIDAdapter {
  // eslint-disable-next-line class-methods-use-this
  createIdTransaction(payload, memo) {
    const assistAPIKey = 'IdSFtQosmCwCB9NOLltkZrFy5VqtQn8QbxBKQoHPw7zp3w0hDOyOYjgL53DO3MDH';
    const assistAPIEndpoints = {
      mainnet: 'https://assist.trinity-tech.io/v2',
      testnet: 'https://assist-testnet.trinity-tech.io/v2'
    };

    const requestBody = {
      did: '',
      memo: memo || '',
      requestFrom: 'Did Tools',
      didRequest: JSON.parse(payload)
    };

    fetch(`${assistAPIEndpoints.mainnet}/didtx/create`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization: assistAPIKey
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => {
        response.json();
      })
      .then(console.log);
  }
}
