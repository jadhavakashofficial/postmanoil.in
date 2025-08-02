/**
 * Postman Oil Contact Form Handler
 * Handles form submission with security features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add honeypot field to all contact forms
    const forms = document.querySelectorAll('form[data-contact-form]');
    
    forms.forEach(form => {
        // Add honeypot field (hidden from users, visible to bots)
        const honeypot = document.createElement('div');
        honeypot.style.position = 'absolute';
        honeypot.style.left = '-9999px';
        honeypot.innerHTML = '<input type="text" name="website_url" tabindex="-1" autocomplete="off">';
        form.appendChild(honeypot);
        
        // Handle form submission
        form.addEventListener('submit', handleFormSubmit);
    });
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Get form data
    const formData = new FormData(form);
    formData.append('action', 'handle_contact_form');
    formData.append('nonce', window.contactFormNonce || '');
    
    try {
        const response = await fetch('/blog/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success message
            showMessage(form, 'success', result.data.message);
            form.reset();
            
            // Track conversion if analytics is available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
        } else {
            // Show error message
            if (result.data.errors) {
                const errorList = result.data.errors.map(err => `• ${err}`).join('\n');
                showMessage(form, 'error', `${result.data.message}\n${errorList}`);
            } else {
                showMessage(form, 'error', result.data || 'An error occurred. Please try again.');
            }
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage(form, 'error', 'Network error. Please check your connection and try again.');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

function showMessage(form, type, message) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type} p-4 rounded-lg mb-4`;
    messageDiv.style.whiteSpace = 'pre-line';
    
    if (type === 'success') {
        messageDiv.className += ' bg-green-100 text-green-800 border border-green-200';
    } else {
        messageDiv.className += ' bg-red-100 text-red-800 border border-red-200';
    }
    
    messageDiv.textContent = message;
    
    // Insert message before form
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.5s';
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add form validation
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const phone = form.querySelector('input[type="tel"]');
    
    // Email validation
    if (email && !isValidEmail(email.value)) {
        email.setCustomValidity('Please enter a valid email address');
        return false;
    }
    
    // Phone validation (optional)
    if (phone && phone.value && !isValidPhone(phone.value)) {
        phone.setCustomValidity('Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\d\s()+-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Add loading state styles
const style = document.createElement('style');
style.textContent = `
    button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .form-message {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);