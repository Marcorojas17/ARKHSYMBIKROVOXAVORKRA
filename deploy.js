const { ethers } = require('ethers');
const fs = require('fs');
const os = require('os');

const walletData = JSON.parse(fs.readFileSync(os.homedir()+'/.arkh-wallet.json'));
const { abi, bytecode } = JSON.parse(fs.readFileSync('build.json'));
const provider = new ethers.JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');
const wallet = new ethers.Wallet(walletData.privateKey, provider);

(async () => {
  const bal = await provider.getBalance(wallet.address);
  console.log('Deployer:', wallet.address);
  console.log('Balance:', ethers.formatEther(bal), 'SepoliaETH');

  if (bal === 0n) {
    console.error('❌ Sin ETH. Ve al faucet primero.');
    process.exit(1);
  }

  console.log('Desplegando...');
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  const tx = contract.deploymentTransaction();

  console.log('');
  console.log('=== ✅ DEPLOY EXITOSO ===');
  console.log('Contract:', address);
  console.log('TX:      ', tx.hash);
  console.log('Etherscan: https://sepolia.etherscan.io/tx/' + tx.hash);
})();
