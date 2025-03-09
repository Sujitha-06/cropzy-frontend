const video = document.getElementById('cameraFeed');
const canvas = document.getElementById('previewCanvas');
const captureButton = document.getElementById('captureButton');
const uploadImage = document.getElementById('uploadImage');
const analyzeButton = document.getElementById('analyzeButton');
const resultDiv = document.getElementById('result');

// Access the camera for live feed
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing camera:', error);
    });

// Capture image from live feed
captureButton.addEventListener('click', () => {
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Handle file upload from device
uploadImage.addEventListener('change', event => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Analyze the captured/uploaded image
analyzeButton.addEventListener('click', async () => {
    const dataURL = canvas.toDataURL('image/jpeg');
    const apiKey = 'wYVkdIi2iZcrgoGoB7z3fDu1zOsqACmCKm8UnvS0Xo3Ozk5weS'; // Replace with your Plant.id API key

    try {
        const response = await fetch('https://api.plant.id/v2/identify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                images: [dataURL],
                organs: ['leaf']
            })
        });

        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p style="color: red;">Error analyzing the image. Please try again.</p>`;
    }
});

function displayResult(data) {
    const plantName = data.suggestions[0]?.plant_name || "Unknown Plant";
    const disease = data.health_assessment?.disease?.name || "No disease detected";
    const treatment = data.health_assessment?.disease?.treatment || "No treatment available";

    resultDiv.innerHTML = `
        <h3>Plant: ${plantName}</h3>
        <p>Disease: ${disease}</p>
        <p>Treatment: ${treatment}</p>
    `;
}
