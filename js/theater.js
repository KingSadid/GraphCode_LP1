/**
 * GraphCode - Theater/Cinema Controller
 * @description Handles the 2D cinema experience with:
 * - Video player controls
 * - Custom video UI
 * - PDF preview integration
 * - Modal management
 * @version 2.0.0
 */

class TheaterController {
  constructor() {
    this.cinemaContainer = document.getElementById('cinemaContainer');
    this.showCinemaBtn = document.getElementById('showCinemaBtn');
    this.video = document.getElementById('cinemaVideo');
    this.playOverlay = document.getElementById('playOverlay');
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.playIcon = document.getElementById('playIcon');
    this.pauseIcon = document.getElementById('pauseIcon');
    this.muteBtn = document.getElementById('muteBtn');
    this.volumeIcon = document.getElementById('volumeIcon');
    this.muteIcon = document.getElementById('muteIcon');
    this.fullscreenBtn = document.getElementById('fullscreenBtn');
    this.progressContainer = document.getElementById('progressContainer');
    this.progressBar = document.getElementById('progressBar');
    this.timeDisplay = document.getElementById('timeDisplay');
    
    this.pdfModal = document.getElementById('pdfModal');
    this.pdfModalBackdrop = document.getElementById('pdfModalBackdrop');
    this.pdfModalClose = document.getElementById('pdfModalClose');
    this.pdfModalTitle = document.getElementById('pdfModalTitle');
    this.pdfViewer = document.getElementById('pdfViewer');

    this.isPlaying = false;
    this.isMuted = false;
    this.isCinemaVisible = false;

    this.init();
  }

  init() {
    if (!this.cinemaContainer) return;

    this.setupShowCinemaButton();
    this.setupVideoControls();
    this.setupPDFCards();
    this.setupPDFModal();
    this.setupKeyboardControls();
  }

  /**
   * Setup show cinema button
   */
  setupShowCinemaButton() {
    if (!this.showCinemaBtn) return;

    this.showCinemaBtn.addEventListener('click', () => {
      if (this.isCinemaVisible) {
        this.hideCinema();
      } else {
        this.showCinema();
      }
    });
  }

  /**
   * Show cinema with animation
   */
  showCinema() {
    this.cinemaContainer.style.display = 'grid';
    
    // Use requestAnimationFrame to ensure display change is applied
    requestAnimationFrame(() => {
      this.cinemaContainer.style.opacity = '1';
      this.cinemaContainer.style.transform = 'translateY(0)';
    });

    this.isCinemaVisible = true;
    this.showCinemaBtn.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-right: 8px;">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <span class="magnetic-btn-content">Cerrar Sala</span>
    `;

    // Scroll to cinema
    this.cinemaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /**
   * Hide cinema with animation
   */
  hideCinema() {
    this.cinemaContainer.style.opacity = '0';
    this.cinemaContainer.style.transform = 'translateY(30px)';

    setTimeout(() => {
      this.cinemaContainer.style.display = 'none';
      if (this.video) {
        this.video.pause();
        this.updatePlayPauseUI(false);
      }
    }, 500);

    this.isCinemaVisible = false;
    this.showCinemaBtn.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-right: 8px;">
        <rect x="2" y="2" width="20" height="20" rx="2.18"/>
        <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>
      </svg>
      <span class="magnetic-btn-content">Ver Sala de Cine</span>
    `;
  }

  /**
   * Setup video controls
   */
  setupVideoControls() {
    if (!this.video) return;

    // Play overlay click
    if (this.playOverlay) {
      this.playOverlay.addEventListener('click', () => {
        this.togglePlay();
        this.playOverlay.style.opacity = '0';
        this.playOverlay.style.pointerEvents = 'none';
      });
    }

    // Play/Pause button
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    }

    // Mute button
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', () => this.toggleMute());
    }

    // Fullscreen button
    if (this.fullscreenBtn) {
      this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    // Progress bar
    if (this.progressContainer) {
      this.progressContainer.addEventListener('click', (e) => this.seek(e));
    }

    // Video events
    this.video.addEventListener('timeupdate', () => this.updateProgress());
    this.video.addEventListener('loadedmetadata', () => this.updateTimeDisplay());
    this.video.addEventListener('play', () => this.updatePlayPauseUI(true));
    this.video.addEventListener('pause', () => this.updatePlayPauseUI(false));
    this.video.addEventListener('ended', () => {
      this.updatePlayPauseUI(false);
      if (this.playOverlay) {
        this.playOverlay.style.opacity = '1';
        this.playOverlay.style.pointerEvents = 'auto';
      }
    });

    // Double click for fullscreen
    const cinemaScreen = document.getElementById('cinemaScreen');
    if (cinemaScreen) {
      cinemaScreen.addEventListener('dblclick', () => this.toggleFullscreen());
    }
  }

  /**
   * Toggle play/pause
   */
  togglePlay() {
    if (this.video.paused) {
      this.video.play();
      this.isPlaying = true;
    } else {
      this.video.pause();
      this.isPlaying = false;
    }
  }

  /**
   * Update play/pause UI
   */
  updatePlayPauseUI(playing) {
    this.isPlaying = playing;
    if (this.playIcon && this.pauseIcon) {
      this.playIcon.style.display = playing ? 'none' : 'block';
      this.pauseIcon.style.display = playing ? 'block' : 'none';
    }
  }

  /**
   * Toggle mute
   */
  toggleMute() {
    this.video.muted = !this.video.muted;
    this.isMuted = this.video.muted;
    
    if (this.volumeIcon && this.muteIcon) {
      this.volumeIcon.style.display = this.isMuted ? 'none' : 'block';
      this.muteIcon.style.display = this.isMuted ? 'block' : 'none';
    }
  }

  /**
   * Toggle fullscreen
   */
  toggleFullscreen() {
    const cinemaScreen = document.getElementById('cinemaScreen');
    if (!cinemaScreen) return;

    if (!document.fullscreenElement) {
      if (cinemaScreen.requestFullscreen) {
        cinemaScreen.requestFullscreen();
      } else if (cinemaScreen.webkitRequestFullscreen) {
        cinemaScreen.webkitRequestFullscreen();
      } else if (cinemaScreen.msRequestFullscreen) {
        cinemaScreen.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  /**
   * Seek video
   */
  seek(e) {
    const rect = this.progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.video.currentTime = percent * this.video.duration;
  }

  /**
   * Update progress bar
   */
  updateProgress() {
    if (!this.progressBar || !this.video.duration) return;
    
    const percent = (this.video.currentTime / this.video.duration) * 100;
    this.progressBar.style.width = `${percent}%`;
    this.updateTimeDisplay();
  }

  /**
   * Update time display
   */
  updateTimeDisplay() {
    if (!this.timeDisplay) return;

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const current = formatTime(this.video.currentTime || 0);
    const duration = formatTime(this.video.duration || 0);
    this.timeDisplay.textContent = `${current} / ${duration}`;
  }

  /**
   * Setup PDF cards
   */
  setupPDFCards() {
    const pdfCards = document.querySelectorAll('.pdf-card');

    pdfCards.forEach(card => {
      const pdfPath = card.dataset.pdf;
      const pdfTitle = card.dataset.title;

      // Preview button
      const previewBtn = card.querySelector('.preview-pdf-btn');
      if (previewBtn) {
        previewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openPDFModal(pdfPath, pdfTitle);
        });
      }

      // Download button
      const downloadBtn = card.querySelector('.download-pdf-btn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.downloadPDF(pdfPath, pdfTitle);
        });
      }

      // Card click
      card.addEventListener('click', () => {
        this.openPDFModal(pdfPath, pdfTitle);
      });
    });
  }

  /**
   * Setup PDF modal
   */
  setupPDFModal() {
    if (!this.pdfModal) return;

    // Close button
    if (this.pdfModalClose) {
      this.pdfModalClose.addEventListener('click', () => this.closePDFModal());
    }

    // Backdrop click
    if (this.pdfModalBackdrop) {
      this.pdfModalBackdrop.addEventListener('click', () => this.closePDFModal());
    }

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.pdfModal.classList.contains('active')) {
        this.closePDFModal();
      }
    });
  }

  /**
   * Open PDF modal
   */
  openPDFModal(pdfPath, title) {
    if (!this.pdfModal || !this.pdfViewer) return;

    this.pdfModalTitle.textContent = title || 'Documento PDF';
    this.pdfViewer.src = pdfPath;
    
    this.pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Animation
    if (typeof AnimationsController !== 'undefined') {
      AnimationsController.openModal(this.pdfModal);
    }
  }

  /**
   * Close PDF modal
   */
  closePDFModal() {
    if (!this.pdfModal) return;

    if (typeof AnimationsController !== 'undefined') {
      AnimationsController.closeModal(this.pdfModal);
    } else {
      this.pdfModal.classList.remove('active');
    }

    setTimeout(() => {
      this.pdfViewer.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  /**
   * Download PDF
   */
  downloadPDF(pdfPath, title) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = title ? `${title}.pdf` : 'documento.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Setup keyboard controls
   */
  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (!this.isCinemaVisible || !this.video) return;

      // Don't trigger if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.video.currentTime -= 10;
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.video.currentTime += 10;
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.video.volume = Math.min(1, this.video.volume + 0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.video.volume = Math.max(0, this.video.volume - 0.1);
          break;
        case 'm':
          this.toggleMute();
          break;
        case 'f':
          this.toggleFullscreen();
          break;
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.theaterController = new TheaterController();
});
