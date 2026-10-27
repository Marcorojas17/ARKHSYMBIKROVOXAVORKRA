import express from 'express';
import { promptInjectionShield } from '../../src/defense/prompt_injection_shield.js';
const app = express();
app.use(express.json());
app.use((req,res,next)=>{console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);next();});
app.use(promptInjectionShield);

app.get('/api/wallet/:address', async (req,res)=>{
  const {address} = req.params;
  console.log(`  -> consultando: ${address}`);
  // mock 【entity-vitalik¦canonical_name=Vitalik Buterin】
  res.json({address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", resolvedFrom: address, chains: [{chain:"ethereum",balance:"5.77 ETH"}]});
});

app.listen(3000, ()=>{console.log('\n◯_● WALLET · http://localhost:3000\n◯_● WALLET · http://127.0.0.1:3000\n');});
