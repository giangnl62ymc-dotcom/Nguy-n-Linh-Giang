/**
 * Princess Royal Portfolio Magic Engine
 * Author: Antigravity for Nguyễn Linh Giang
 */

// ==========================================
// 1. PRINCESS INSTRUMENTAL MUSIC BOX ENGINE
// ==========================================
class PrincessMusicBox {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.timer = null;
    this.step = 0;
    this.volume = 0.22; // subtle, peaceful volume

    // Royal Princess Fairytale Waltz / Music Box Notes (Frequencies in Hz)
    // Dreamy C Major / Am9 / Fmaj7 / Gsus fairytale melody
    this.melody = [
      // Phrase 1 (The Palace Garden)
      { note: 523.25, duration: 0.4 }, // C5
      { note: 659.25, duration: 0.4 }, // E5
      { note: 783.99, duration: 0.8 }, // G5
      { note: 987.77, duration: 0.8 }, // B5
      { note: 880.00, duration: 1.2 }, // A5
      { note: 783.99, duration: 0.4 }, // G5
      { note: 659.25, duration: 0.8 }, // E5
      { note: 587.33, duration: 0.4 }, // D5

      // Phrase 2 (Cinderella Waltz)
      { note: 523.25, duration: 0.4 }, // C5
      { note: 698.46, duration: 0.4 }, // F5
      { note: 880.00, duration: 0.8 }, // A5
      { note: 1046.50, duration: 0.8 },// C6
      { note: 987.77, duration: 1.2 }, // B5
      { note: 783.99, duration: 0.4 }, // G5
      { note: 659.25, duration: 0.8 }, // E5
      { note: 523.25, duration: 0.4 }, // C5

      // Phrase 3 (Royal Starlight)
      { note: 440.00, duration: 0.4 }, // A4
      { note: 523.25, duration: 0.4 }, // C5
      { note: 659.25, duration: 0.8 }, // E5
      { note: 880.00, duration: 0.8 }, // A5
      { note: 783.99, duration: 1.2 }, // G5
      { note: 659.25, duration: 0.4 }, // E5
      { note: 587.33, duration: 0.8 }, // D5
      { note: 493.88, duration: 0.4 }, // B4

      // Phrase 4 (The Glass Slipper Lullaby)
      { note: 523.25, duration: 0.6 }, // C5
      { note: 783.99, duration: 0.6 }, // G5
      { note: 1046.50, duration: 1.4 },// C6
      { note: 987.77, duration: 0.4 }, // B5
      { note: 880.00, duration: 0.8 }, // A5
      { note: 783.99, duration: 0.8 }, // G5
      { note: 523.25, duration: 1.6 }, // C5
      { note: 0, duration: 0.8 }       // Rest
    ];

    // Background Harp Accompaniment Arpeggio Chords
    this.bassChords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66]  // G
    ];

    this.initElements();
  }

  initElements() {
    this.toggleBtn = document.getElementById('music-toggle-btn');
    this.toggleText = document.getElementById('music-status-text');
    this.waveContainer = document.getElementById('audio-waves');

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Generate a bell-like / celesta chime tone
  playNote(frequency, duration, delay = 0, isBass = false) {
    if (!this.audioCtx || frequency <= 0) return;

    const startTime = this.audioCtx.currentTime + delay;
    const osc = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();

    // Subtle harmonic warmth
    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(frequency, startTime);

    // Celeste / music box envelope: instant attack, exponential sparkling decay
    const peakVolume = isBass ? 0.08 : 0.16;
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(peakVolume, startTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.8);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration * 2);
  }

  scheduleNextBeat() {
    if (!this.isPlaying) return;

    const current = this.melody[this.step % this.melody.length];
    
    // Play melody tone
    if (current.note > 0) {
      this.playNote(current.note, current.duration);
    }

    // Play gentle harp harmony on every 4th step
    if (this.step % 4 === 0) {
      const chordIndex = Math.floor((this.step / 4) % this.bassChords.length);
      const chord = this.bassChords[chordIndex];
      chord.forEach((freq, idx) => {
        this.playNote(freq, 1.2, idx * 0.12, true);
      });
    }

    this.step++;
    const stepDuration = current.duration * 750; // Milliseconds per beat
    this.timer = setTimeout(() => this.scheduleNextBeat(), stepDuration);
  }

  play() {
    this.initContext();
    this.isPlaying = true;
    this.scheduleNextBeat();
    this.updateUI(true);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (this.waveContainer) {
      if (playing) {
        this.waveContainer.classList.remove('audio-muted');
        this.waveContainer.classList.add('audio-playing');
      } else {
        this.waveContainer.classList.remove('audio-playing');
        this.waveContainer.classList.add('audio-muted');
      }
    }

    if (this.toggleText) {
      const isVi = document.documentElement.lang === 'vi';
      if (playing) {
        this.toggleText.textContent = isVi ? 'Nhạc Hoàng Gia: Bật 🎶' : 'Royal Melody: Playing 🎶';
      } else {
        this.toggleText.textContent = isVi ? 'Nhạc Hoàng Gia: Tắt 🌙' : 'Royal Melody: Muted 🌙';
      }
    }
  }

  // Quick magical chime on interactive clicks
  playChime() {
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      [1046.50, 1318.51, 1567.98].forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        g.gain.setValueAtTime(0.001, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.08, now + i * 0.08 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.4);
        osc.connect(g);
        g.connect(this.audioCtx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.5);
      });
    } catch (e) {
      // Audio permission or unsupported
    }
  }
}

// ==========================================
// 2. MAGICAL CANVAS BACKGROUND PARTICLES
// ==========================================
class SparkleBackground {
  constructor() {
    this.canvas = document.getElementById('sparkle-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 55;
    this.enabled = true;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const types = ['star', 'petal', 'glow'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 3.5 + 1.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.6 + 0.2), // gentle upward float
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      type: type,
      color: type === 'star' ? '#f59e0b' : '#f472a1',
      angle: Math.random() * 360
    };
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.enabled) {
      for (let p of this.particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += 0.5;
        p.opacity += Math.sin(p.angle * 0.05) * p.pulseSpeed;

        if (p.opacity < 0.1) p.opacity = 0.1;
        if (p.opacity > 0.85) p.opacity = 0.85;

        // Reset if went above viewport
        if (p.y < -10) {
          p.y = this.canvas.height + 10;
          p.x = Math.random() * this.canvas.width;
        }
        if (p.x < -10) p.x = this.canvas.width + 10;
        if (p.x > this.canvas.width + 10) p.x = -10;

        this.drawParticle(p);
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  drawParticle(p) {
    this.ctx.save();
    this.ctx.globalAlpha = p.opacity;
    this.ctx.fillStyle = p.color;

    if (p.type === 'star') {
      // Draw 4-point sparkle star
      this.ctx.translate(p.x, p.y);
      this.ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        this.ctx.rotate(Math.PI / 2);
        this.ctx.lineTo(p.size * 2, 0);
        this.ctx.lineTo(p.size * 0.4, p.size * 0.4);
      }
      this.ctx.closePath();
      this.ctx.fill();
    } else if (p.type === 'petal') {
      // Soft Sakura petal
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.angle * Math.PI) / 180);
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.9, 0, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Soft glowing orb
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();
  }
}

// ==========================================
// 3. CURSOR SPARKLE TRAIL
// ==========================================
function initCursorSparkles() {
  const sparkleIcons = ['✨', '🌸', '💫', '💖', '⭐'];
  let lastTime = 0;

  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 60) return; // throttle
    lastTime = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'cursor-sparkle';
    sparkle.textContent = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;

    const tx = (Math.random() - 0.5) * 60;
    const ty = (Math.random() - 0.5) * 60 - 20;
    sparkle.style.setProperty('--tx', `${tx}px`);
    sparkle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  });
}

// ==========================================
// 4. BILINGUAL TRANSLATION DICTIONARY
// ==========================================
const translations = {
  vi: {
    // Nav
    navAbout: "Nàng Công Chúa",
    navSkills: "Kỹ Năng Hoàng Gia",
    navExperience: "Hành Trình Sự Nghiệp",
    navProjects: "Dự Án Tiêu Biểu",
    navLanguages: "Ngôn Ngữ",
    navContact: "Liên Hệ",
    musicStatusPlaying: "Nhạc Hoàng Gia: Bật 🎶",
    musicStatusMuted: "Nhạc Hoàng Gia: Tắt 🌙",

    // Hero
    heroGreeting: "Chào Mừng Đến Với Vương Quốc Sáng Tạo",
    heroRole: "Nhân viên Vận hành Sàn Thương Mại Điện Tử & Chuyên Viên Truyền Thông Tiếp Thị",
    heroIntro: "Sinh viên Đại học Ngoại thương (FTU) theo học Tiếng Pháp Thương Mại và Kinh Doanh Quốc Tế. Đam mê Marketing Communication, giàu kinh nghiệm thực tế về vận hành sàn TMĐT, chăm sóc khách hàng, sáng tạo nội dung và tổ chức sự kiện chuyên nghiệp.",
    btnContact: "Gửi Thư Hoàng Gia 💌",
    btnDownloadCV: "Tải Bản Chiếu Hoàng Gia (CV) 📜",
    badgeUniversity: "Đại học Ngoại thương (FTU)",
    badgeLanguages: "3 Ngôn Ngữ (Anh • Pháp • Trung)",
    badgeMOS: "Chứng chỉ MOS Văn Phòng",

    // Stats
    statTitle1: "Chuyên Ngành Kép",
    statDesc1: "Tiếng Pháp Thương Mại & Kinh Doanh Quốc Tế FTU",
    statTitle2: "Kinh Nghiệm Sàn",
    statDesc2: "Vận hành gian hàng, flash sale & tối ưu doanh số",
    statTitle3: "Nghệ Thuật & Nội Dung",
    statDesc3: "Quay dựng, thiết kế Canva, CapCut, AI, Photoshop",
    statTitle4: "Đa Ngôn Ngữ",
    statDesc4: "Tiếng Anh, Tiếng Trung & Tiếng Pháp",

    // About
    aboutTitle: "Chiếu Thư Hoàng Gia",
    aboutSubtitle: "Về Nàng Công Chúa Nguyễn Linh Giang",
    aboutText1: "Là sinh viên Ngoại thương theo học song song Tiếng Pháp thương mại và Kinh doanh quốc tế, em luôn mang trong mình niềm say mê mãnh liệt với Marketing Communication, thẩm mỹ sáng tạo và thế giới sôi động của Thương mại điện tử.",
    aboutText2: "Em sở hữu kinh nghiệm thực tiễn vững vàng trong việc quản lý gian hàng sàn TMĐT, xử lý đơn hàng, điều phối kho vận cũng như tư vấn chăm sóc khách hàng tận tâm. Bên cạnh đó, các hoạt động dẫn dắt sự kiện và sản xuất media tại CLB Truyền thông Ngoại thương đã rèn luyện tinh thần trách nhiệm, tư duy thẩm mỹ sắc sảo và khả năng phối hợp đội nhóm linh hoạt.",
    aboutGoalTitle: "Mục Tiêu Vương Quốc",
    aboutGoal: "Mong muốn phát triển trong môi trường năng động, được học hỏi và trau dồi sâu sắc về Marketing Communication, Marketing Event và Thương mại điện tử quốc tế.",

    // Skills
    skillsTitle: "Kho Tàng Tài Năng",
    skillsSubtitle: "Bộ kỹ năng chuyên môn & công cụ ma thuật",
    skillCat1: "Sáng Tạo & Đồ Họa Nghệ Thuật",
    skillCat2: "Thương Mại Điện Tử & Vận Hành",
    skillCat3: "Sự Kiện & Truyền Thông Tiếp Thị",
    skillCat4: "Công Cụ Chuyên Nghiệp & Kỹ Năng Mềm",

    // Experience
    expTitle: "Biên Niên Sử Hoàng Gia",
    expSubtitle: "Hành trình tích lũy kinh nghiệm và cống hiến",
    expRole1: "Nhân viên Vận hành Sàn Thương mại điện tử",
    expOrg1: "Sàn thương mại điện tử",
    expTime1: "Tháng 02/2026 – Tháng 09/2026",
    expRole2: "Sales Assistant & Warehouse Operations Executive",
    expOrg2: "IM FINE",
    expTime2: "Tháng 09/2025 – Tháng 01/2026",
    expRole3: "Thành viên Ban Tổ chức & Trưởng Ban Hậu cần / Truyền thông",
    expOrg3: "CLB Truyền thông Trường Đại học Ngoại thương",
    expTime3: "Tháng 11/2023 – Tháng 12/2024",

    // Projects
    projectsTitle: "Bảo Ngọc Tiêu Biểu",
    projectsSubtitle: "Các dự án và dấu ấn vận hành nổi bật",
    filterAll: "Tất Cả",
    filterEcommerce: "Vận Hành TMĐT",
    filterMedia: "Nội Dung & Media",
    filterEvent: "Tổ Chức Sự Kiện",

    // Languages
    langTitle: "Ngôn Ngữ Vương Triều",
    langSubtitle: "Cầu nối văn hóa và kinh doanh toàn cầu",
    langEn: "Tiếng Anh (English)",
    langEnLevel: "Giao tiếp thành thạo, làm việc chuyên nghiệp",
    langFr: "Tiếng Pháp (French)",
    langFrLevel: "Chuyên ngành Tiếng Pháp thương mại FTU",
    langZh: "Tiếng Trung (Chinese)",
    langZhLevel: "Giao tiếp thương mại, đọc hiểu tốt",

    // Contact
    contactTitle: "Bồ Câu Đưa Thư Hoàng Gia",
    contactSubtitle: "Sẵn sàng kết nối và đồng hành cùng quý doanh nghiệp",
    contactPhoneLabel: "Số Điện Thoại",
    contactEmailLabel: "Hòm Thư Điện Tử",
    contactAddressLabel: "Địa Chỉ Hiện Tại",
    contactFormName: "Tên Của Quý Vị",
    contactFormEmail: "Email Liên Hệ",
    contactFormMsg: "Nội Dung Thư Gửi Công Chúa Linh Giang...",
    btnSendMsg: "Niêm Phong & Gửi Thư 👑",
    copiedToast: "Đã sao chép vào bộ nhớ tạm! ✨"
  },
  en: {
    // Nav
    navAbout: "The Princess",
    navSkills: "Royal Talents",
    navExperience: "Royal Chronicles",
    navProjects: "Royal Jewels",
    navLanguages: "Imperial Tongues",
    navContact: "Royal Courier",
    musicStatusPlaying: "Royal Melody: Playing 🎶",
    musicStatusMuted: "Royal Melody: Muted 🌙",

    // Hero
    heroGreeting: "Welcome to the Royal Realm of Creativity",
    heroRole: "E-Commerce Specialist & Marketing Communication Muse",
    heroIntro: "Foreign Trade University (FTU) student double-majoring in Commercial French & International Business. Passionate about Marketing Communication with hands-on expertise in e-commerce store operations, customer experience, creative media, and high-impact event orchestration.",
    btnContact: "Send Royal Courier 💌",
    btnDownloadCV: "View Royal Decree (CV) 📜",
    badgeUniversity: "Foreign Trade University (FTU)",
    badgeLanguages: "3 Languages (English • French • Chinese)",
    badgeMOS: "MOS Certified Specialist",

    // Stats
    statTitle1: "Double Major",
    statDesc1: "Commercial French & International Business (FTU)",
    statTitle2: "E-Commerce Ops",
    statDesc2: "Store management, flash sales & revenue optimization",
    statTitle3: "Creative Media",
    statDesc3: "Filmmaking, Canva, CapCut, AI & Photoshop",
    statTitle4: "Multilingual",
    statDesc4: "Fluent in English, Chinese & French",

    // About
    aboutTitle: "The Royal Decree",
    aboutSubtitle: "About Princess Nguyễn Linh Giang",
    aboutText1: "As a Foreign Trade University scholar studying Commercial French and International Business, I have a deep passion for Marketing Communication, aesthetic visual storytelling, and the dynamic e-commerce landscape.",
    aboutText2: "I bring hands-on experience in managing online storefronts, order processing, warehouse inventory management, and delivering heartfelt customer care. Furthermore, my leadership roles in event organization and internal media production at the FTU Media Club have cultivated my keen aesthetic vision, leadership rigor, and proactive cross-functional collaboration.",
    aboutGoalTitle: "Royal Aspiration",
    aboutGoal: "Eager to thrive in dynamic environments where I can continuously learn and cultivate expertise in Marketing Communication, Marketing Events, and Global E-Commerce.",

    // Skills
    skillsTitle: "The Royal Treasury of Talents",
    skillsSubtitle: "Professional competencies & magical toolsets",
    skillCat1: "Creative & Visual Arts",
    skillCat2: "E-Commerce & Store Operations",
    skillCat3: "Events & Marketing Communication",
    skillCat4: "Professional Tools & Soft Skills",

    // Experience
    expTitle: "The Royal Chronicle",
    expSubtitle: "Milestones in leadership and professional excellence",
    expRole1: "E-Commerce Operations Specialist",
    expOrg1: "E-Commerce Marketplace",
    expTime1: "Feb 2026 – Sep 2026",
    expRole2: "Sales Assistant & Warehouse Operations Executive",
    expOrg2: "IM FINE",
    expTime2: "Sep 2025 – Jan 2026",
    expRole3: "Organizing Committee Member & Logistics / Media Lead",
    expOrg3: "Foreign Trade University Media Club (FTU)",
    expTime3: "Nov 2023 – Dec 2024",

    // Projects
    projectsTitle: "The Royal Jewels",
    projectsSubtitle: "Selected operational achievements & showcases",
    filterAll: "All Jewels",
    filterEcommerce: "E-Commerce Ops",
    filterMedia: "Media & Visuals",
    filterEvent: "Event Production",

    // Languages
    langTitle: "Court of Tongues",
    langSubtitle: "Bridging cultures and international commerce",
    langEn: "English",
    langEnLevel: "Fluent professional working proficiency",
    langFr: "French",
    langFrLevel: "Commercial French major at FTU",
    langZh: "Chinese",
    langZhLevel: "Business communication & literacy",

    // Contact
    contactTitle: "The Royal Courier",
    contactSubtitle: "Ready to connect and collaborate with your noble enterprise",
    contactPhoneLabel: "Royal Hotline",
    contactEmailLabel: "Electronic Parchment",
    contactAddressLabel: "Current Royal Residence",
    contactFormName: "Your Royal Name",
    contactFormEmail: "Your Contact Email",
    contactFormMsg: "Your message to Princess Linh Giang...",
    btnSendMsg: "Seal with Wax & Dispatch 👑",
    copiedToast: "Copied to clipboard with royal magic! ✨"
  }
};

// ==========================================
// 5. BILINGUAL CONTROLLER
// ==========================================
class BilingualController {
  constructor(musicBox) {
    this.currentLang = localStorage.getItem('linhgiang_lang') || 'vi';
    this.musicBox = musicBox;
    this.langToggleBtn = document.getElementById('lang-toggle-btn');

    if (this.langToggleBtn) {
      this.langToggleBtn.addEventListener('click', () => this.toggleLanguage());
    }

    this.applyLanguage(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('linhgiang_lang', this.currentLang);
    this.applyLanguage(this.currentLang);
    if (this.musicBox) this.musicBox.playChime();
  }

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    const t = translations[lang];

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update toggle button display
    const flagEl = document.getElementById('current-lang-flag');
    const labelEl = document.getElementById('current-lang-label');
    if (flagEl) flagEl.textContent = lang === 'vi' ? '🇻🇳' : '🇬🇧';
    if (labelEl) labelEl.textContent = lang === 'vi' ? 'VI' : 'EN';

    // Update music text
    if (this.musicBox) {
      this.musicBox.updateUI(this.musicBox.isPlaying);
    }
  }
}

// ==========================================
// 6. PROJECT SHOWCASE MODAL & FILTERS
// ==========================================
const projectData = {
  ecom1: {
    titleVi: "Tối Ưu Gian Hàng & Chiến Dịch Flash Sale Sàn TMĐT",
    titleEn: "Marketplace Store Optimization & Mega Flash Sale Campaign",
    categoryVi: "Vận Hành TMĐT",
    categoryEn: "E-Commerce Ops",
    descVi: "Phụ trách quản trị toàn diện gian hàng thương mại điện tử: tối ưu hóa SEO hình ảnh và thông tin sản phẩm, thiết lập hệ thống voucher, điều phối các khung giờ Flash Sale định kỳ. Xử lý triệt để tỉ lệ đơn hủy, tối ưu phản hồi chat dưới 5 phút, đưa chỉ số đánh giá của gian hàng đạt mốc 4.9/5 sao.",
    descEn: "Led end-to-end marketplace store operations: optimized product titles, SEO descriptions, and visual merchandising. Configured complex discount vouchers and flash sale schedules. Maintained a <5-minute chat response SLA and elevated store satisfaction rating to 4.9/5 stars.",
    highlightsVi: [
      "Quản lý danh mục hơn 150+ SKU sản phẩm",
      "Giảm tỉ lệ hoàn/đổi hàng 25% nhờ tư vấn kỹ thuật chính xác",
      "Tăng trưởng doanh số 35% trong các ngày hội mua sắm siêu sale"
    ],
    highlightsEn: [
      "Catalog management of 150+ active SKUs",
      "Reduced return & exchange rate by 25% through proactive customer counseling",
      "Delivered 35% sales revenue surge during monthly mega sale campaigns"
    ],
    tags: ["Shopee / Lazada Ops", "Canva Merchandising", "Chatbot & SLA", "Inventory Sync"]
  },
  ecom2: {
    titleVi: "Hệ Thống Kho Vận & Kiểm Kê Xuất Nhập Tồn IM FINE",
    titleEn: "IM FINE Warehouse Inventory & Fulfillment Optimization",
    categoryVi: "Kho Vận & Sales",
    categoryEn: "Warehouse & Sales Ops",
    descVi: "Tại IM FINE, em chịu trách nhiệm đồng bộ số liệu kho thực tế và hệ thống quản trị nội bộ. Phối hợp nhịp nhàng giữa đội ngũ sản xuất và các đơn vị giao hàng hàng đầu (GHN, GHTK, Viettel Post) để đảm bảo thời gian đóng gói và giao hàng nhanh chóng không tắc nghẽn.",
    descEn: "At IM FINE, oversaw real-time inventory reconciliation between physical warehouse stocks and cloud ERP. Synchronized fulfillment operations with leading logistics carriers to guarantee zero-backlog dispatch during peak order spikes.",
    highlightsVi: [
      "Kiểm kê định kỳ & xử lý chênh lệch tồn kho đạt độ chuẩn xác 99.4%",
      "Cải tiến quy trình đóng gói giảm 30% thời gian xử lý đơn hàng",
      "Thiết lập checklist bảo quản hàng hóa khoa học theo hạn sử dụng"
    ],
    highlightsEn: [
      "Maintained 99.4% stock accuracy across periodic inventory audits",
      "Streamlined packing workflow, trimming order fulfillment time by 30%",
      "Implemented rigorous shelf-life monitoring and categorization standards"
    ],
    tags: ["Warehouse Control", "MOS Excel", "Carrier Logistics", "Customer Support"]
  },
  media1: {
    titleVi: "Chuỗi Video Truyền Thông Tuyển Thành Viên Mới CLB Ngoại Thương",
    titleEn: "FTU Media Club Recruitment Creative Video Campaign",
    categoryVi: "Nội Dung & Media",
    categoryEn: "Creative Media",
    descVi: "Nghiên cứu insight sinh viên thế hệ mới, trực tiếp viết kịch bản phân cảnh (storyboard), quay phim và hậu kỳ video trên CapCut/Premiere. Kết hợp cùng việc thiết kế key visuals trên Canva và Photoshop, chiến dịch đã thu hút hàng trăm đơn đăng ký tham gia.",
    descEn: "Conducted audience insight research on FTU freshmen, scripted storyboards, directed filming, and executed dynamic post-production editing using CapCut & Adobe tools. Produced complementary social banners on Canva and Photoshop.",
    highlightsVi: [
      "Đạt hơn 50,000+ lượt tiếp cận tự nhiên trên Fanpage CLB",
      "Thu hút hơn 300+ đơn ứng tuyển tham gia các ban chuyên môn",
      "Phong cách visual trẻ trung, bố cục thẩm mỹ chuẩn brand guidelines"
    ],
    highlightsEn: [
      "Generated 50,000+ organic video views and reach on the Club's Fanpage",
      "Attracted 300+ applicant submissions across departments",
      "Crafted aesthetic visual guidelines adhering to modern typography standards"
    ],
    tags: ["CapCut Editing", "Canva Graphics", "Scriptwriting", "Adobe Illustrator"]
  },
  event1: {
    titleVi: "Điều Phối Hậu Cần & Trải Nghiệm Khách Mời Chuỗi Sự Kiện FTU",
    titleEn: "FTU Major Event Logistics Blueprint & Guest Experience",
    categoryVi: "Tổ Chức Sự Kiện",
    categoryEn: "Event Orchestration",
    descVi: "Lãnh đạo team hậu cần phụ trách toàn bộ kế hoạch triển khai: lập dự trù và quyết toán ngân sách thu chi chi tiết, khảo sát mặt bằng, quản trị checklist trang thiết bị kỹ thuật âm thanh/ánh sáng, và điều phối hiện trường đón tiếp khách mời VIP.",
    descEn: "Led the logistics committee in orchestrating full event lifecycle: drafting comprehensive financial budgets, site inspections, technical checklist validation (AV/lighting), and seamless on-site guest concierge management.",
    highlightsVi: [
      "Quản lý ngân sách sự kiện tối ưu chi phí hơn 15% so với dự kiến ban đầu",
      "Điều phối trơn tru chương trình với hơn 500+ sinh viên tham dự",
      "Xử lý kịp thời 100% tình huống phát sinh tại hiện trường"
    ],
    highlightsEn: [
      "Optimized event operational budget by 15% under initial estimates",
      "Managed smooth on-site operations for 500+ attendees",
      "Resolved 100% of unforeseen venue challenges with zero disruptions"
    ],
    tags: ["Event Logistics", "Budgeting", "Guest Protocol", "Crisis Resolution"]
  }
};

function initProjectShowcase(musicBox) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active', 'btn-royal-primary'));
      filterBtns.forEach((b) => b.classList.add('bg-white/80', 'text-gray-700'));
      btn.classList.add('active', 'btn-royal-primary');
      btn.classList.remove('bg-white/80', 'text-gray-700');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.classList.add('animate-royal-glow');
          setTimeout(() => card.classList.remove('animate-royal-glow'), 600);
        } else {
          card.style.display = 'none';
        }
      });
      if (musicBox) musicBox.playChime();
    });
  });

  // Modal open
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      const data = projectData[id];
      if (!data) return;

      const isVi = document.documentElement.lang === 'vi';
      document.getElementById('modal-title').textContent = isVi ? data.titleVi : data.titleEn;
      document.getElementById('modal-category').textContent = isVi ? data.categoryVi : data.categoryEn;
      document.getElementById('modal-desc').textContent = isVi ? data.descVi : data.descEn;

      const listEl = document.getElementById('modal-highlights');
      listEl.innerHTML = '';
      const highlights = isVi ? data.highlightsVi : data.highlightsEn;
      highlights.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-gray-700 text-sm';
        li.innerHTML = `<span class="text-pink-500 font-bold">👑</span> <span>${item}</span>`;
        listEl.appendChild(li);
      });

      const tagsEl = document.getElementById('modal-tags');
      tagsEl.innerHTML = '';
      data.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-semibold border border-pink-200';
        span.textContent = tag;
        tagsEl.appendChild(span);
      });

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (musicBox) musicBox.playChime();
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  // Click outside to close
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}

// ==========================================
// 7. ROYAL COURIER & CLIPBOARD ACTIONS
// ==========================================
function initRoyalCourier(musicBox) {
  // Copy buttons
  document.querySelectorAll('.copy-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(document.documentElement.lang === 'vi' ? 'Đã sao chép vào bộ nhớ tạm! ✨' : 'Copied with royal magic! ✨');
          if (musicBox) musicBox.playChime();
        });
      }
    });
  });

  // Contact Form
  const form = document.getElementById('royal-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const isVi = document.documentElement.lang === 'vi';
      showToast(
        isVi
          ? 'Thư đã được niêm phong bằng sáp hoàng gia và gửi đi thành công! 👑'
          : 'Your letter was sealed with royal wax and dispatched! 👑'
      );
      if (musicBox) musicBox.playChime();
      form.reset();
    });
  }
}

// Toast helper
function showToast(message) {
  let toast = document.getElementById('royal-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'royal-toast';
    toast.className = 'fixed bottom-8 right-8 z-50 bg-white/95 backdrop-blur-md border border-amber-300 text-pink-800 px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-12 opacity-0 font-medium text-sm';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-xl">✨</span> <span>${message}</span>`;
  toast.classList.remove('translate-y-12', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
  }, 3200);
}

// ==========================================
// 8. CUSTOM PHOTO UPLOADER (LOCAL STORAGE)
// ==========================================
function initCustomAvatar() {
  const fileInput = document.getElementById('avatar-upload-input');
  const avatarImg = document.getElementById('royal-avatar-img');
  const savedAvatar = localStorage.getItem('linhgiang_custom_avatar');

  if (savedAvatar && avatarImg) {
    avatarImg.src = savedAvatar;
  }

  if (fileInput && avatarImg) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          avatarImg.src = evt.target.result;
          localStorage.setItem('linhgiang_custom_avatar', evt.target.result);
          showToast(
            document.documentElement.lang === 'vi'
              ? 'Chân dung hoàng gia đã được cập nhật thành công! 👑'
              : 'Royal portrait updated successfully! 👑'
          );
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// ==========================================
// MAIN INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const musicBox = new PrincessMusicBox();
  new SparkleBackground();
  initCursorSparkles();
  new BilingualController(musicBox);
  initProjectShowcase(musicBox);
  initRoyalCourier(musicBox);
  initCustomAvatar();

  // Gentle welcome chime on first user click anywhere if music isn't started yet
  const firstClickListener = () => {
    // Attempt auto-subtle start on first click if user desires
    document.removeEventListener('click', firstClickListener);
  };
  document.addEventListener('click', firstClickListener);
});
