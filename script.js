function card() {
    document.querySelector('.card-bg').style.display = 'flex';
}

document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('.card-bg').style.display = 'none';
});

document.querySelector('.check-title').addEventListener('click', function () {      
    document.querySelector('.check-hide').style.display = 'flex';
    document.querySelector('.check-title').style.display = 'none';
    document.querySelector('.check-buttons').style.display = 'none';
    document.querySelector('.save-check').style.display = 'flex';
});

document.getElementById('check-close').addEventListener('click', function () {
    document.querySelector('.check-hide').style.display = 'none';
    document.querySelector('.check-title').style.display = 'flex';
    document.querySelector('.check-buttons').style.display = 'flex';
    document.querySelector('.save-check').style.display = 'none';
})