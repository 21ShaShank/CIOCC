// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  // Mobile navigation toggle
  const mobileToggle = document.createElement("div");
  mobileToggle.className = "mobile-toggle";
  mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';

  const nav = document.querySelector("nav");
  const navUl = document.querySelector("nav ul");

  if (window.innerWidth <= 768) {
    nav.insertBefore(mobileToggle, navUl);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768 && !document.querySelector(".mobile-toggle")) {
      nav.insertBefore(mobileToggle, navUl);
    } else if (window.innerWidth > 768 && document.querySelector(".mobile-toggle")) {
      nav.removeChild(mobileToggle);
      navUl.classList.remove("show");
    }
  });

  if (document.querySelector(".mobile-toggle")) {
    document.querySelector(".mobile-toggle").addEventListener("click", () => {
      navUl.classList.toggle("show");
    });
  }

  // Churn prediction form submission
  const churnForm = document.getElementById('churnForm');
  if (churnForm) {
    churnForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const resultBox = document.getElementById('predictionResult');
      resultBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';

      const formData = new FormData(churnForm);
      const data = Object.fromEntries(formData.entries());

      fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((result) => {
          if (result.error) throw new Error(result.error);
          resultBox.innerHTML = '🔮 Predicted Churn Probability: ' + result.probability;
        })
        .catch((err) => {
          console.error('Error:', err);
          resultBox.innerHTML = '❌ Error predicting churn. Please ensure the server is running.';
        });
    });
  }
});

// Functions to open and close churn modal
function openChurnModal() {
  document.getElementById('churnModal').style.display = 'block';
}

function closeChurnModal() {
  document.getElementById('churnModal').style.display = 'none';
  document.getElementById('predictionResult').innerHTML = '';
}