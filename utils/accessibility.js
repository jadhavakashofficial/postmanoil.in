// utils/accessibility.js
export const skipToContent = () => {
  const content = document.getElementById('main-content');
  if (content) {
    content.focus();
    content.scrollIntoView();
  }
};

export const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    
    if (e.key === 'Escape') {
      element.dispatchEvent(new Event('close'));
    }
  });
};

// Add ARIA labels for better screen reader support
export const addAriaLabels = () => {
  // Add labels to navigation
  const nav = document.querySelector('nav');
  if (nav && !nav.getAttribute('aria-label')) {
    nav.setAttribute('aria-label', 'Main navigation');
  }
  
  // Add labels to forms
  const forms = document.querySelectorAll('form');
  forms.forEach((form, index) => {
    if (!form.getAttribute('aria-label')) {
      form.setAttribute('aria-label', `Contact form ${index + 1}`);
    }
  });
  
  // Add alt text to images without it
  const images = document.querySelectorAll('img:not([alt])');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      img.setAttribute('alt', 'Postman Oils product image');
    }
  });
};