// Function to fetch anime images
function fetchAnime(category) {
    const apiUrl = `https://api.waifu.pics/sfw/${category}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.url) {
                const imgUrl = data.url;
                const animeContainer = document.getElementById('animeContainer');

                // Create an image element
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = 'Anime Image';
                imgElement.classList.add('animeImage');

                // Add click event to open image in modal
                imgElement.addEventListener('click', function () {
                    const modal = document.getElementById('myModal');
                    const modalImg = document.getElementById('modalImg');
                    modal.style.display = "block";
                    modalImg.src = imgElement.src;
                });

                // Add image to the container
                animeContainer.insertBefore(imgElement, animeContainer.firstChild);
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
}

// Event listeners for each category button
const categories = [
    'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo',
    'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave',
    'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick',
    'happy', 'wink', 'poke', 'dance', 'cringe'
];

categories.forEach(category => {
    const buttonId = `get${category.charAt(0).toUpperCase() + category.slice(1)}Btn`;
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function () {
            fetchAnime(category);
        });
    }
});

// Clear all images
document.getElementById('clearBtn').addEventListener('click', function () {
    const animeContainer = document.getElementById('animeContainer');
    animeContainer.innerHTML = ''; // Xóa tất cả ảnh trong container
});

// Modal close functionality
document.getElementById('closeBtn').addEventListener('click', function () {
    document.getElementById('myModal').style.display = "none";
});

// Close modal when clicking outside of the image
window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
});

// Toggle dark mode
document.getElementById('menuBtn').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode'); // Toggle dark mode on body
    const menuBtn = document.getElementById('menuBtn');

    // Change menu icon based on dark mode state
    if (body.classList.contains('dark-mode')) {
        menuBtn.innerHTML = '&#x2630;'; // Change to dark mode icon
    } else {
        menuBtn.innerHTML = '&#x2630;'; // Change to light mode icon (or modify as desired)
    }
});
