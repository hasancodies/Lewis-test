// authScript.js

const ethers = require('ethers');
const axios = require('axios');

// Step 1: Wallet Initialization
const WALLET_PRIV_KEY = 'Enter your private key here';
const ethersWallet = new ethers.Wallet(WALLET_PRIV_KEY);

async function main() {
  try {
    // Step 2: Request Signing Message
    const { data } = await axios.get(  
      'https://api.riseworks.io/auth/api/siwe', {  
        params: { wallet: ethersWallet.address }  
      }  
    );
    const { message } = data.data;

    // Step 3: Sign Message
    const signature = await ethersWallet.signMessage(message);

    // Step 4: Pass the Signature Back to the API
    const { data: postData } = await axios.post(
      'https://api.riseworks.io/auth/api/siwe', {
        wallet: ethersWallet.address,
        message,
        signature
      }
    );
    const bearerToken = postData.data.token;
    return bearertoken;
  } catch (error) {
    console.error('Error:', error.message || error);
  }
}

// Execute the main function
main();
