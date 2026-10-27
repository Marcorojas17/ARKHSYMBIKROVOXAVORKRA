// Lógica de grabación del portal
const startBtn = document.getElementById('start-record');
const stopBtn = document.getElementById('stop-record');
const statusDiv = document.getElementById('status');
let mediaRecorder;
let chunks = [];

startBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            console.log('Audio grabado:', blob);
            statusDiv.style.display = 'block';
            statusDiv.textContent = '✅ Audio cifrado y guardado localmente (Simulación).';
            startBtn.disabled = false;
            stopBtn.disabled = true;
        };

        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        statusDiv.style.display = 'block';
        statusDiv.textContent = '🎙️ Grabando...';
    } catch (err) {
        statusDiv.style.display = 'block';
        statusDiv.textContent = '❌ Error: ' + err.message;
    }
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
});
