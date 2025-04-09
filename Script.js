// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      navLinks.classList.remove('active');
      menuBtn.classList.remove('active');
    }
  });
});

// Navbar scroll effect
const navbar = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Profile image hover effect
const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
  profilePic.addEventListener('mouseenter', () => {
    profilePic.style.transform = 'scale(1.05)';
  });
  
  profilePic.addEventListener('mouseleave', () => {
    profilePic.style.transform = 'scale(1)';
  });
}

// Project gallery functionality with improved transitions
document.querySelectorAll('.project-gallery').forEach(gallery => {
  const mainImage = gallery.querySelector('.main-image img');
  const thumbnails = gallery.querySelectorAll('.thumbnail');
  
  // Preload images to prevent flickering
  const preloadImages = () => {
    thumbnails.forEach(thumb => {
      const imgSrc = thumb.querySelector('img').src;
      if (imgSrc) {
        const img = new Image();
        img.src = imgSrc;
      }
    });
  };
  
  // Initialize preloading
  preloadImages();
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const imgSrc = thumb.querySelector('img').src;
      if (!imgSrc) return;
      
      // Add fade-out effect
      mainImage.style.opacity = '0';
      
      // Wait for fade-out to complete before changing image
      setTimeout(() => {
        mainImage.src = imgSrc;
        mainImage.alt = thumb.querySelector('img').alt;
        
        // Update active state
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        // Fade in the new image
        mainImage.style.opacity = '1';
      }, 300);
    });
  });
});

// Add animation to navigation links
const navItems = document.querySelectorAll('.nav-links li');
navItems.forEach((item, index) => {
  item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
});

// Define fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
