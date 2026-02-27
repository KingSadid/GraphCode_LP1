/**
 * GraphCode - Contact Form Handler
 * @description Handles contact form validation and submission
 * @version 2.0.0
 */

class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.submitBtn = this.form.querySelector('button[type="submit"]');
    this.inputs = this.form.querySelectorAll('.form-input, .form-textarea, .form-select');
    this.originalBtnText = this.submitBtn ? this.submitBtn.innerHTML : '';

    this.init();
  }

  init() {
    this.setupValidation();
    this.setupSubmission();
    this.setupInputEffects();
  }

  /**
   * Setup form validation
   */
  setupValidation() {
    this.inputs.forEach(input => {
      // Real-time validation
      input.addEventListener('blur', () => this.validateInput(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateInput(input);
        }
      });
    });
  }

  /**
   * Validate single input
   */
  validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name;
    let isValid = true;
    let errorMessage = '';

    // Required check
    if (input.required && !value) {
      isValid = false;
      errorMessage = 'Este campo es requerido';
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Por favor ingresa un email válido';
      }
    }

    // Phone validation
    if (name === 'phone' && value) {
      const phoneRegex = /^[+]?[\d\s-]{8,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Por favor ingresa un teléfono válido';
      }
    }

    // Min length
    if (input.minLength && value.length < input.minLength) {
      isValid = false;
      errorMessage = `Mínimo ${input.minLength} caracteres`;
    }

    // Update UI
    this.updateInputUI(input, isValid, errorMessage);
    return isValid;
  }

  /**
   * Update input UI based on validation
   */
  updateInputUI(input, isValid, errorMessage) {
    const wrapper = input.closest('.form-group');
    let errorEl = wrapper.querySelector('.form-error');

    if (!isValid) {
      input.classList.add('error');
      input.style.borderColor = '#ef4444';

      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.style.cssText = 'color: #ef4444; font-size: 12px; margin-top: 4px; display: block;';
        wrapper.appendChild(errorEl);
      }
      errorEl.textContent = errorMessage;
    } else {
      input.classList.remove('error');
      input.style.borderColor = '';
      if (errorEl) {
        errorEl.remove();
      }
    }
  }

  /**
   * Validate entire form
   */
  validateForm() {
    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  /**
   * Setup form submission
   */
  setupSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!this.validateForm()) {
        this.shakeForm();
        return;
      }

      await this.submitForm();
    });
  }

  /**
   * Submit form
   */
  async submitForm() {
    this.setLoading(true);

    try {
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      // Simulate API call (replace with actual endpoint)
      await Utils.wait(1500);

      console.log('Form submitted:', data);
      this.showSuccess();
      this.form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      this.showError();
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Set loading state
   */
  setLoading(loading) {
    if (!this.submitBtn) return;

    if (loading) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" style="animation: spin 1s linear infinite; margin-right: 8px;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.416" stroke-dashoffset="10"/>
        </svg>
        Enviando...
      `;
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = this.originalBtnText;
    }
  }

  /**
   * Show success message
   */
  showSuccess() {
    this.showToast('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
  }

  /**
   * Show error message
   */
  showError() {
    this.showToast('Hubo un error al enviar el mensaje. Intenta de nuevo.', 'error');
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      border-radius: 12px;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 9999;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    // Remove after delay
    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /**
   * Shake form on error
   */
  shakeForm() {
    this.form.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      this.form.style.animation = '';
    }, 500);
  }

  /**
   * Setup input effects
   */
  setupInputEffects() {
    this.inputs.forEach(input => {
      // Focus effect
      input.addEventListener('focus', () => {
        input.style.borderColor = '#6366f1';
        input.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
      });

      input.addEventListener('blur', () => {
        if (!input.classList.contains('error')) {
          input.style.borderColor = '';
          input.style.boxShadow = '';
        }
      });
    });
  }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.contactForm = new ContactForm('contactForm');
});
