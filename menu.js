const profile = document.getElementById('profile');
const dropdown = document.getElementById('dropdown');

// Toggle dropdown visibility
profile.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown if clicked outside
window.addEventListener('click', (event) => {
    if (!profile.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Alert when a row is clicked
document.querySelectorAll('.row').forEach(row => {
    row.addEventListener('click', () => {
        alert(`You clicked on ${row.textContent}`);
    });
});
function openCamera() {
    window.location.href = 'camera.html';
}
function openLogout(){
    window.location.href = 'index.html';
}
function openInsurance(){
    window.location.href = 'cropinsurance.html';
}
function openCrops(){
    window.location.href = 'crops.html';
}
function openFertilizers(){
    window.location.href = 'fertilizers.html';
}
function openTools(){
    window.location.href = 'tools.html';
}
function openSeeds(){
    window.location.href = 'seeds.html';
}
function openOrganicProducts(){
    window.location.href = 'organicproducts.html';
}
