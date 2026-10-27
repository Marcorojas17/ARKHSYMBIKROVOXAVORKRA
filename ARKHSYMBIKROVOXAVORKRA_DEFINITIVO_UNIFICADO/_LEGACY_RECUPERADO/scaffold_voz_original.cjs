const fs = require('fs');
const path = require('path');
const ROOT = './ARKHSYMBIKROVOXAVORKRA_DEFINITIVO_UNIFICADO';
function ensure(p){ fs.mkdirSync(p, {recursive:true}); }
function write(p, content){ ensure(path.dirname(p)); if(!fs.existsSync(p)) fs.writeFileSync(p, content); }
console.log('Creando BOVEDA DE VOZ ORIGINAL');
write(path.join(ROOT, 'apps/portal/voice-capture.js'), `
// BOVEDA DE VOZ ORIGINAL - NO CLONACION
export class VoiceVaultOriginal {
  constructor(){ this.chunks=[]; this.vault=[]; }
  async startRecording(){
    const stream = await navigator.mediaDevices.getUserMedia({audio:{sampleRate:44100, channelCount:1, echoCancellation:false}});
    this.recorder = new MediaRecorder(stream, {mimeType:'audio/webm'});
    this.recorder.ondataavailable = e => this.chunks.push(e.data);
    this.recorder.start();
  }
  async stopAndSeal(question, ownerId){
    return new Promise(resolve=>{
      this.recorder.onstop = async ()=>{
        const blob = new Blob(this.chunks, {type:'audio/webm'});
        const arrayBuffer = await blob.arrayBuffer();
        const hash = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashHex = Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
        const record = { id: crypto.randomUUID(), ownerId, question, timestamp: new Date().toISOString(), hash: hashHex, type: 'ORIGINAL_RECORDING', blob, consent: 'ORIGINAL_ONLY_NO_CLONE' };
        this.vault.push(record); this.chunks=[]; resolve(record);
      };
      this.recorder.stop();
    });
  }
  playOriginal(id){
    const rec = this.vault.find(r=>r.id===id);
    if(!rec || rec.type!=='ORIGINAL_RECORDING') throw new Error('No es grabacion original');
    const url = URL.createObjectURL(rec.blob); const audio = new Audio(url); audio.play(); return rec;
  }
}
`);
write(path.join(ROOT, 'src/core/voice_vault.js'), `
export const VOICE_VAULT_RULES = { ALLOWED: ['ORIGINAL_RECORDING'], FORBIDDEN: ['TTS_CLONE','VOICE_SYNTHESIS'], SEALING: 'SHA256 + RFC3161' };
export function validateIsOriginal(record){ if(record.type !== 'ORIGINAL_RECORDING') throw new Error('CLONACION BLOQUEADA'); return true; }
`);
write(path.join(ROOT, 'src/core/identity_voice_binding.js'), `
export function bindVoiceToIdentity(voiceHash, identityId, pqcSignature){
  return { bindingId: identityId+':'+voiceHash, proof: 'Solo reproduccion', pqcSignature, soulbound:true, created: new Date().toISOString() };
}
`);
write(path.join(ROOT, 'legal/VOICE_CONSENT_ORIGINAL_ONLY.md'), `# Consentimiento Voz Original
Autorizo: Reproduccion de mis audios originales
NO autorizo: Clonacion, sintesis, entrenamiento IA
Tipo: ORIGINAL_ONLY_NO_CLONE
Anclaje: ARKHE-ZERO-TOLUCA
`);
write(path.join(ROOT, 'docs/VOZ_ORIGINAL_ARQUITECTURA.md'), `# Arquitectura Voz Original
Clon: genera lo que nunca dijiste (riesgo legal)
Original: solo reproduce lo que SI dijiste (legal + emocional real)
`);
console.log('✅ Boveda voz creada');
