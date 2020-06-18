<div align="center">
  <img height="300" src="assets/auth-logo.png">
</div>

# Authentication API for MCH Plus

This API connects to the authentication of [MCH Plus](https://www.mch.plus/), the blockchain game publishing service of [doublejump.tokyo](https://www.doublejump.tokyo/).

Please read the documentation below for how to use the API and which endpoints are exposed. 

## Installation

### Npm

```bash
npm install mchplus-auth-js
```

### Yarn

```bash
yarn add mchplus-auth-js
```

## Usage

```js
import MchplusAuth from 'mchplus-auth-js'

const clientId = 'xxx'
const web3 = // your user's web3 instance
const lang = 'en' // set your user's language here

const auth = new MchplusAuth(clientId, web3, lang)

// call methods here
```

## Authentication API
### Authenticate a user with their Ethereum address
Users sign up and log into the game with their Ethereum address. The `signAuth` logs in the user (or creates a new account if first login) and signs a Ethereum transaction with the public key.

```js
await auth.signAuth()
```

## Verify Phone Number API
### Connect a user's phone number to their account
MCH Plus offers a phone number verification to protect our games from multiple accounts. The account verification has 2 steps: 

1. Type in a user's phone number to receive a text message or call with the Authentication Pin.

```js
const number = '+8108092624621'
const isCall = false // if true, user will get called instead of text message

await auth.submitNumber(number, isCall)
```

2. Type in the Authentication Pin and sign a transaction with the public key.

```js
const code = 'xxxxxx' // the frontend should have an input field

await auth.confirmNumber(code)
```

### Helper Functions
The API also provides some helper functions to make the frontend development easier:

Return a list of available regions and their country codes:
```js
await auth.getNumberRegions()
```

##  QR code generation API for login 
Generates a QR code for the user to log into the game. 

```js
await auth.getQRCode(callbackUrl, state)
```


##  Get Client Info API 
You can get the values of the terms of use and privacy policy associated with the client_id.

```js
await auth.getClientInfo()
```