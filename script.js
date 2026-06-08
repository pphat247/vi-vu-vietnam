// Mở/đóng menu trên mobile
function toggleMenu() {
  const menu = document.getElementById("mainMenu");
  menu.classList.toggle("active");
}

// Hiệu ứng cuộn hiện các phần tử
function handleScrollAnimation() {
  const destinations = document.querySelectorAll(".destination");
  const triggerPoint = window.innerHeight - 100;

  destinations.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerPoint) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

// Debounce giúp giới hạn số lần gọi hàm search
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Tìm kiếm địa điểm
function searchDestinations() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const destinations = document.querySelectorAll(".destination");

  destinations.forEach(dest => {
    const title = dest.querySelector("h3")?.textContent.toLowerCase() || "";
    const description = dest.querySelector("p")?.textContent.toLowerCase() || "";

    if (title.includes(input) || description.includes(input)) {
      dest.style.display = "block";
    } else {
      dest.style.display = "none";
    }
  });
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", debounce(searchDestinations, 300));
}

function showSection(id) {
  document.querySelectorAll('main section').forEach(section => {
    section.style.display = 'none';
  });

  const section = document.getElementById(id);
  if (section) section.style.display = 'block';

  const menu = document.getElementById('mainMenu');
  menu.classList.remove('active');
}

// Lọc theo vùng miền
function filterRegion(region) {
  const festivals = document.querySelectorAll('.festival-item');
  festivals.forEach(item => {
    if (region === 'all' || item.classList.contains(region)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Xem trước ảnh chia sẻ
function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('imagePreview');

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
    preview.classList.add('hidden');
  }
}

// Tạo bài viết chia sẻ mới
function createPost(text, imageFile) {
  const postContainer = document.getElementById('postsContainer');

  const newPostElement = document.createElement('div');
  newPostElement.className = 'shared-post';

  const textElement = document.createElement('p');
  textElement.textContent = text;
  newPostElement.appendChild(textElement);

  // Thêm ngày giờ
  const timeElement = document.createElement('p');
  const now = new Date();
  timeElement.textContent = `🕒 Đăng lúc: ${now.toLocaleString('vi-VN')}`;
  timeElement.style.fontSize = '13px';
  timeElement.style.color = '#777';
  timeElement.style.marginTop = '8px';
  newPostElement.appendChild(timeElement);

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.marginTop = '10px';
      img.style.borderRadius = '8px';
      img.style.maxWidth = '100%';
      newPostElement.appendChild(img);

      postContainer.prepend(newPostElement);
    };
    reader.readAsDataURL(imageFile);
  } else {
    postContainer.prepend(newPostElement);
  }
}

// Xử lý sự kiện gửi form chia sẻ
const form = document.getElementById('shareForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('textInput').value.trim();
    const image = document.getElementById('imageInput').files[0];

    if (text || image) {
      createPost(text, image);
      form.reset();
      document.getElementById('imagePreview').classList.add('hidden');
    }
  });
}
