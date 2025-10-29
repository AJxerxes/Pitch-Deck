// Enhanced JavaScript for DuoWeave Pitch Deck

class PitchDeckEnhancements {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 13; // Updated to 13 slides
    this.isAnimating = false;
    this.observers = [];
    
    this.init();
  }

  init() {
    this.setupProgressBar();
    this.setupAnimations();
    this.setupKeyboardShortcuts();
    this.setupIntersectionObserver();
    this.setupCounterAnimations();
    this.setupHoverEffects();
    this.setupImageLazyLoading();
    this.setupMarketCirclesInteractions();
  }

  setupProgressBar() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    // Update progress bar
    this.updateProgressBar();
  }

  setupMarketCirclesInteractions() {
    const tamCircle = document.querySelector('.tam-circle');
    const samCircle = document.querySelector('.sam-circle');
    const somCircle = document.querySelector('.som-circle');
    const container = document.querySelector('.market-container');
    
    if (!tamCircle || !samCircle || !somCircle || !container) return;
    
    const circles = [tamCircle, samCircle, somCircle];
    const classes = ['show-tam', 'show-sam', 'show-som'];
    
    // Mobile: tap toggles text visibility
    circles.forEach((circle, index) => {
      circle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          // Remove all active classes
          classes.forEach(cls => container.classList.remove(cls));
          // Add the specific class for this circle
          container.classList.add(classes[index]);
          // Auto-hide after 3s
          setTimeout(() => container.classList.remove(classes[index]), 3000);
        }
        e.stopPropagation();
      });
      
      // Focus/blur for accessibility
      circle.addEventListener('focus', () => {
        circle.classList.add('active');
      });
      
      circle.addEventListener('blur', () => {
        circle.classList.remove('active');
      });
    });
    
    // Click outside to hide on mobile
    document.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        classes.forEach(cls => container.classList.remove(cls));
      }
    });
  }

  updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }

  setupAnimations() {
    // Add entrance animations to slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
      slide.style.opacity = '0';
      slide.style.transform = 'translateY(30px)';
      slide.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Animate current slide
    this.animateSlide(0);
  }

  animateSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[slideIndex];
    
    if (currentSlide) {
      // Reset all slides
      slides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(30px)';
        slide.classList.remove('active');
      });

      // Animate current slide
      setTimeout(() => {
        currentSlide.style.opacity = '1';
        currentSlide.style.transform = 'translateY(0)';
        currentSlide.classList.add('active');
        
        // Animate slide content
        this.animateSlideContent(currentSlide);
      }, 100);
    }
  }

  animateSlideContent(slide) {
    // Animate headings
    const headings = slide.querySelectorAll('h1, h2, h3');
    headings.forEach((heading, index) => {
      heading.style.opacity = '0';
      heading.style.transform = 'translateY(20px)';
      setTimeout(() => {
        heading.classList.add('animate-fade-in-up');
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Animate cards and metrics
    const cards = slide.querySelectorAll('.data-card, .metric-3d, .glass-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.9)';
      setTimeout(() => {
        card.classList.add('animate-scale-in');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, (index + headings.length) * 150);
    });

    // Animate lists
    const listItems = slide.querySelectorAll('li');
    listItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        item.classList.add('animate-slide-in');
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, (index + cards.length + headings.length) * 100);
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.goToSlide(this.totalSlides - 1);
      } else if (e.key === '?') {
        e.preventDefault();
        this.showKeyboardShortcuts();
      } else if (e.key === 'Escape') {
        this.hideKeyboardShortcuts();
      }
    });
  }

  showKeyboardShortcuts() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-8 max-w-md mx-4 animate-scale-in">
        <h3 class="text-2xl font-bold mb-4">Keyboard Shortcuts</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Next slide:</span>
            <kbd class="bg-gray-200 px-2 py-1 rounded">→</kbd>
          </div>
          <div class="flex justify-between">
            <span>Previous slide:</span>
            <kbd class="bg-gray-200 px-2 py-1 rounded">←</kbd>
          </div>
          <div class="flex justify-between">
            <span>First slide:</span>
            <kbd class="bg-gray-200 px-2 py-1 rounded">Home</kbd>
          </div>
          <div class="flex justify-between">
            <span>Last slide:</span>
            <kbd class="bg-gray-200 px-2 py-1 rounded">End</kbd>
          </div>
          <div class="flex justify-between">
            <span>Space:</span>
            <kbd class="bg-gray-200 px-2 py-1 rounded">Space</kbd>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" 
                class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  hideKeyboardShortcuts() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) modal.remove();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.data-card, .metric-3d, .glass-card');
    animatedElements.forEach(el => observer.observe(el));
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.metric-counter');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
      if (target) {
        this.animateCounter(counter, target);
      }
    });
  }

  animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for 1 second
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  setupHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.data-card, .metric-3d');
    cards.forEach(card => {
      card.classList.add('card-hover');
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.classList.add('button-hover');
    });
  }

  setupImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('loading-skeleton');
          img.classList.add('animate-fade-in-up');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      img.classList.add('loading-skeleton');
      imageObserver.observe(img);
    });
  }

  nextSlide() {
    if (this.isAnimating) return;
    if (this.currentSlide < this.totalSlides - 1) {
      this.isAnimating = true;
      this.currentSlide++;
      this.animateSlide(this.currentSlide);
      this.updateProgressBar();
      this.updateSlideCounter();
      setTimeout(() => { this.isAnimating = false; }, 800);
    }
  }

  prevSlide() {
    if (this.isAnimating) return;
    if (this.currentSlide > 0) {
      this.isAnimating = true;
      this.currentSlide--;
      this.animateSlide(this.currentSlide);
      this.updateProgressBar();
      this.updateSlideCounter();
      setTimeout(() => { this.isAnimating = false; }, 800);
    }
  }

  goToSlide(slideIndex) {
    if (this.isAnimating) return;
    if (slideIndex >= 0 && slideIndex < this.totalSlides) {
      this.isAnimating = true;
      this.currentSlide = slideIndex;
      this.animateSlide(this.currentSlide);
      this.updateProgressBar();
      this.updateSlideCounter();
      setTimeout(() => { this.isAnimating = false; }, 800);
    }
  }

  updateSlideCounter() {
    const counter = document.getElementById('slide-counter');
    if (counter) {
      counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }
  }

  // Public methods for external use
  getCurrentSlide() {
    return this.currentSlide;
  }

  getTotalSlides() {
    return this.totalSlides;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.pitchDeck = new PitchDeckEnhancements();
  
  // Update existing navigation
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => window.pitchDeck.prevSlide());
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => window.pitchDeck.nextSlide());
  }
});

// Utility functions
function addFloatingElements() {
  // Add floating elements to specific slides
  const solutionSlide = document.querySelector('.slide:nth-child(3)');
  if (solutionSlide) {
    const floatingIcon = document.createElement('div');
    floatingIcon.className = 'absolute top-10 right-10 text-6xl opacity-20 animate-float';
    floatingIcon.innerHTML = '🛡️';
    solutionSlide.appendChild(floatingIcon);
  }
}

function addParticleEffect() {
  // Add subtle particle effect to cover slide
  const coverSlide = document.querySelector('.slide:first-child');
  if (coverSlide) {
    const particles = document.createElement('div');
    particles.className = 'absolute inset-0 pointer-events-none';
    particles.innerHTML = Array.from({length: 20}, () => 
      `<div class="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float" 
            style="left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; 
                   animation-delay: ${Math.random() * 3}s; animation-duration: ${3 + Math.random() * 2}s;"></div>`
    ).join('');
    coverSlide.appendChild(particles);
  }
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', () => {
  addFloatingElements();
  addParticleEffect();
});
