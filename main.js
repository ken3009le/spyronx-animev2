// Function to fetch anime images
function fetchAnime(category) {
    const apiUrl = `https://api.waifu.pics/nsfw/${category}`;
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

// Event listener for RAT.gif
const ratGif = document.getElementById('smallGif');
ratGif.addEventListener('click', function () {
    const nsfwCategories = ['waifu', 'neko', 'trap', 'blowjob'];
    const randomCategory = nsfwCategories[Math.floor(Math.random() * nsfwCategories.length)];
    fetchAnime(randomCategory);
});

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
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button");
    const gif = document.getElementById("smallGif");
    const animeContainer = document.getElementById("animeContainer");

    // Danh sách các nút NSFW
    const nsfwButtons = ["getWaifuBtn", "getNekoBtn", "getTrapBtn", "getBlowjobBtn"];

    // Ẩn tất cả các nút ngoại trừ NSFW khi nhấn vào RAT.gif
    gif.addEventListener("click", function () {
        buttons.forEach(button => {
            if (nsfwButtons.includes(button.id)) {
                button.style.display = "inline-block"; // Hiển thị các nút NSFW
            } else {
                button.style.display = "none"; // Ẩn các nút khác
            }
        });
    });

    // Hàm để tải ảnh từ API
    function fetchImage(endpoint) {
        fetch(`https://nekos.life/api/v2/img/${endpoint}`)
            .then(response => response.json())
            .then(data => {
                const img = document.createElement("img");
                img.src = data.url;
                img.alt = "Anime Image";
                img.style.maxWidth = "300px";
                img.style.margin = "10px";
                animeContainer.innerHTML = ''; // Xóa ảnh cũ
                animeContainer.appendChild(img);
            })
            .catch(error => console.error("Error fetching image:", error));
    }

    // Gán sự kiện cho các nút NSFW
    document.getElementById("getWaifuBtn").addEventListener("click", () => fetchImage("waifu"));
    document.getElementById("getNekoBtn").addEventListener("click", () => fetchImage("neko"));
    document.getElementById("getTrapBtn").addEventListener("click", () => fetchImage("trap"));
    document.getElementById("getBlowjobBtn").addEventListener("click", () => fetchImage("blowjob"));
});
