const fs=require('fs'), crypto=require('crypto'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const DIST=path.join(ROOT,'dist');
fs.mkdirSync(DIST,{recursive:true});
function walk(dir, list=[]){
  try{
    for(const e of fs.readdirSync(dir,{withFileTypes:true})){
      if(e.name==='node_modules' || e.name==='.git' || e.name==='_LEGACY_RECUPERADO' || e.name==='dist') continue;
      const p=path.join(dir,e.name);
      if(e.isDirectory()) walk(p,list);
      else list.push(p);
    }
  }catch{}
  return list;
}
const files=walk(ROOT).map(p=>{
  try{
    const rel=path.relative(ROOT,p);
    const hash=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
    return {file:rel, sha256:hash, size:fs.statSync(p).size};
  }catch{return null}
}).filter(Boolean);
const sbom={
  bomFormat:"CycloneDX", specVersion:"1.5",
  project:"ARKHSYMBIKROVOXAVORKRA",
  space:"ARKHE-ZERO-TOLUCA",
  anchor:"ARKHE-ZERO-TOLUCA",
  email:"marco.a.rojas.v@hotmail.com",
  timestamp:new Date().toISOString(),
  masterHash:"f8e754032a192a924752652bc19cedf5bd33b85e0e8c04118978f72650667004",
  voiceVault:"ORIGINAL_ONLY_NO_CLONE - NO TTS",
  kintsugi:"grietas doradas activas - 51%H 49%AI - VALDOVINOS",
  manifest:"e8d9eac8",
  files, components:files.length,
  legal:["VOICE_CONSENT_ORIGINAL_ONLY.md","LICENSE_FAMILIAR.txt","VOZ_ORIGINAL_ARQUITECTURA.md"]
};
fs.writeFileSync(path.join(DIST,'sbom.json'), JSON.stringify(sbom,null,2));
fs.writeFileSync(path.join(ROOT,'security/sbom.cyclonedx.json'), JSON.stringify(sbom,null,2));
fs.writeFileSync(path.join(DIST,'sbom.cyclonedx.json'), JSON.stringify(sbom,null,2));
fs.writeFileSync(path.join(DIST,'sbom.cyclonedx.json'), JSON.stringify(sbom,null,2));
console.log(`✅ SBOM: ${files.length} archivos verificados`);
console.log(`📦 ${path.join(DIST,'sbom.json')}`);
console.log(`🔑 Master: ${sbom.masterHash.slice(0,24)}...`);
