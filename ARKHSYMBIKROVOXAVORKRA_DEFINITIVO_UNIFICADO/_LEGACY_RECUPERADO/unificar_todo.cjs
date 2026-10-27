const fs=require('fs');const path=require('path');
const ROOT=process.cwd();const DEST=path.join(ROOT,'ARKHSYMBIKROVOXAVORKRA_DEFINITIVO_UNIFICADO');
function ensureDir(p){fs.mkdirSync(p,{recursive:true});}
function copyFileSafe(src,dest){
  ensureDir(path.dirname(dest));
  if(fs.existsSync(dest)){
    const ext=path.extname(dest);const base=dest.slice(0,-ext.length);
    let i=1;let nd=`${base}_DUPLICADO_${i}${ext}`;while(fs.existsSync(nd)){i++;nd=`${base}_DUPLICADO_${i}${ext}`;}
    fs.copyFileSync(src,nd);
  } else fs.copyFileSync(src,dest);
}
function walk(current){
  for(const it of fs.readdirSync(current,{withFileTypes:true})){
    if(it.name==='node_modules'||it.name==='.git'||it.name.includes('DEFINITIVO')||it.name==='unificar_todo.js')continue;
    const full=path.join(current,it.name);
    if(it.isDirectory()) walk(full);
    else{
      const rel=path.relative(ROOT,full);
      const dest = (rel.startsWith('apps/')||rel.startsWith('src/')||rel.startsWith('legal/')) ? path.join(DEST,rel) : path.join(DEST,'_LEGACY_RECUPERADO',rel);
      copyFileSafe(full,dest);
    }
  }
}
ensureDir(DEST);ensureDir(path.join(DEST,'_LEGACY_RECUPERADO'));
walk(ROOT);
["legal/international","compliance/AUDIT_TRAIL","apps/portal/components","src/core","src/unknown","security/code_signing","data-room/IP_ASSIGNMENT_AGREEMENTS","dist",".arkh",".github/workflows"].forEach(f=>ensureDir(path.join(DEST,f)));
console.log('✅ UNIFICADO - NADA BORRADO en',DEST);
