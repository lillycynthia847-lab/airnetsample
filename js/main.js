/* ===========================================
   AIRNET BROADBAND - Main JavaScript
   =========================================== */

const ICONS = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.28 8.28 0 0 0 4.76 1.5v-3.5a4.84 4.84 0 0 1-1-.13z"/></svg>'
};

// Use embedded data from HTML, or try fetching from server
let siteContent = null;

async function loadContent() {
  // Try server fetch first (works when hosted)
  try {
    const response = await fetch('data/content.json');
    if (response.ok) {
      siteContent = await response.json();
      return siteContent;
    }
  } catch (e) {
    // Fetch failed (file:// protocol) — use embedded data
  }
  // Fallback: use data embedded in the HTML
  siteContent = window.AIRNET_DATA;
  return siteContent;
}

// ---- WhatsApp Links ----
function getWhatsAppLink(packageName, speed, type) {
  const phone = siteContent?.contact?.whatsapp || '254711859885';
  const message = encodeURIComponent(`Hi, I'd like to subscribe to the ${packageName} (${speed} Mbps) ${type} plan.`);
  return `https://wa.me/${phone}?text=${message}`;
}

function getWhatsAppGeneralLink() {
  const phone = siteContent?.contact?.whatsapp || '254711859885';
  const message = encodeURIComponent("Hello Airnet Broadband, I'd like to enquire about your internet services.");
  return `https://wa.me/${phone}?text=${message}`;
}

// ---- Navigation ----
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close menu on link click
  navLinks.querySelectorAll('a:not(.btn)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Navbar scroll shadow + active link
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-links a:not(.btn)').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ---- Populate Top Bar ----
function populateTopBar() {
  if (!siteContent) return;
  const c = siteContent.contact;

  const phoneEl = document.getElementById('topbar-phone');
  const phoneText = document.getElementById('topbar-phone-text');
  const emailEl = document.getElementById('topbar-email');
  const emailText = document.getElementById('topbar-email-text');

  if (phoneEl && phoneText) { phoneEl.href = `tel:${c.phone}`; phoneText.textContent = c.phone; }
  if (emailEl && emailText) { emailEl.href = `mailto:${c.supportEmail}`; emailText.textContent = c.supportEmail; }

  const socialContainer = document.getElementById('topbar-social');
  if (socialContainer) {
    socialContainer.innerHTML = '';
    const s = c.socialMedia;
    if (s.facebook) socialContainer.innerHTML += `<a href="${s.facebook}" target="_blank" title="Facebook">${ICONS.facebook}</a>`;
    if (s.instagram) socialContainer.innerHTML += `<a href="${s.instagram}" target="_blank" title="Instagram">${ICONS.instagram}</a>`;
    if (s.tiktok) socialContainer.innerHTML += `<a href="${s.tiktok}" target="_blank" title="TikTok">${ICONS.tiktok}</a>`;
  }
}

// ---- Populate Footer ----
function populateFooter() {
  if (!siteContent) return;
  const c = siteContent.contact;

  const fp = document.getElementById('footer-phone');
  const fe = document.getElementById('footer-email');
  const fl = document.getElementById('footer-location');
  if (fp) { fp.href = `tel:${c.phone}`; fp.textContent = c.phone; }
  if (fe) { fe.href = `mailto:${c.supportEmail}`; fe.textContent = c.supportEmail; }
  if (fl) fl.textContent = c.location;

  const footerSocial = document.getElementById('footer-social');
  if (footerSocial) {
    footerSocial.innerHTML = '';
    const s = c.socialMedia;
    if (s.facebook) footerSocial.innerHTML += `<a href="${s.facebook}" target="_blank">${ICONS.facebook}</a>`;
    if (s.instagram) footerSocial.innerHTML += `<a href="${s.instagram}" target="_blank">${ICONS.instagram}</a>`;
    if (s.tiktok) footerSocial.innerHTML += `<a href="${s.tiktok}" target="_blank">${ICONS.tiktok}</a>`;
  }

  const waFloat = document.getElementById('whatsapp-float');
  if (waFloat) waFloat.href = getWhatsAppGeneralLink();
  const navWa = document.getElementById('nav-whatsapp');
  if (navWa) navWa.href = getWhatsAppGeneralLink();
}

// ---- Packages ----
function renderPackageCards(packages, type, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !packages) return;

  container.innerHTML = packages.map(pkg => `
    <div class="package-card ${pkg.highlighted ? 'highlighted' : ''} fade-in">
      <span class="popular-badge">Popular</span>
      <div class="package-name">${pkg.name}</div>
      <div class="package-speed">${pkg.speed} <span>Mbps</span></div>
      <div class="package-price">
        <span class="currency">KSh</span> ${pkg.price}
        <span class="period">/month</span>
      </div>
      <div class="package-divider"></div>
      <ul class="package-features">
        ${pkg.features.map(f => `<li>${ICONS.check} ${f}</li>`).join('')}
      </ul>
      <a href="${getWhatsAppLink(pkg.name, pkg.speed, type)}" target="_blank" class="btn btn-whatsapp">
        ${ICONS.whatsapp} Book Now
      </a>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    container.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  });
}

function initPackages() {
  if (!siteContent) return;
  renderPackageCards(siteContent.homeFibre, 'Home Fibre', 'home-packages-grid');
  renderPackageCards(siteContent.businessFibre, 'Business Fibre', 'business-packages-grid');

  const homeGrid = document.getElementById('home-packages-grid');
  const bizGrid = document.getElementById('business-packages-grid');

  document.querySelectorAll('.package-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.package-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'home') {
        homeGrid.style.display = 'grid';
        bizGrid.style.display = 'none';
      } else {
        homeGrid.style.display = 'none';
        bizGrid.style.display = 'grid';
      }
    });
  });
}

// ---- About ----
function initAbout() {
  if (!siteContent) return;
  const a = document.getElementById('about-text');
  const v = document.getElementById('vision-text');
  const m = document.getElementById('mission-text');
  
  if (a) {
    const words = siteContent.company.about.split(' ');
    a.innerHTML = words.map((word, i) => 
      `<span class="reveal-word" style="transition-delay: ${i * 0.04}s">${word}</span>`
    ).join(' ');
  }
  
  if (v) v.textContent = siteContent.company.vision;
  if (m) m.textContent = siteContent.company.mission;
}

// ---- Coverage ----
function initCoverage() {
  const container = document.getElementById('coverage-grid');
  if (!container || !siteContent) return;

  // Change container class to wrapper for tabs
  container.className = 'coverage-tabs-wrapper reveal';

  // Build Tabs
  const tabsHTML = `
    <div class="coverage-tabs">
      ${siteContent.coverage.map((region, i) => `
        <button class="coverage-tab ${i === 0 ? 'active' : ''}" data-index="${i}">
          ${ICONS.mapPin} ${region.region}
        </button>
      `).join('')}
    </div>
  `;

  // Build Content Area (Pills)
  const contentHTML = `
    <div class="coverage-content-area">
      ${siteContent.coverage.map((region, i) => `
        <div class="coverage-panel ${i === 0 ? 'active' : ''}" id="coverage-panel-${i}">
          <div class="coverage-areas">
            ${region.areas.map(a => `<span class="coverage-area-tag">${a}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.innerHTML = tabsHTML + contentHTML;

  // Add event listeners
  const tabs = container.querySelectorAll('.coverage-tab');
  const panels = container.querySelectorAll('.coverage-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active to clicked
      tab.classList.add('active');
      const idx = tab.getAttribute('data-index');
      document.getElementById(`coverage-panel-${idx}`).classList.add('active');
    });
  });
}


// ---- Contact ----
function initContact() {
  if (!siteContent) return;
  const c = siteContent.contact;

  const grid = document.getElementById('contact-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="contact-card fade-in">
        <div class="icon-circle">${ICONS.phone}</div>
        <h3>Phone</h3>
        <a href="tel:${c.phone}">${c.phone}</a>
      </div>
      <div class="contact-card fade-in">
        <div class="icon-circle">${ICONS.email}</div>
        <h3>Support Email</h3>
        <a href="mailto:${c.supportEmail}">${c.supportEmail}</a>
      </div>
      <div class="contact-card fade-in">
        <div class="icon-circle">${ICONS.email}</div>
        <h3>Sales Email</h3>
        <a href="mailto:${c.salesEmail}">${c.salesEmail}</a>
      </div>
      <div class="contact-card fade-in">
        <div class="icon-circle">${ICONS.location}</div>
        <h3>Location</h3>
        <p>${c.location}</p>
      </div>
    `;
    requestAnimationFrame(() => {
      grid.querySelectorAll('.fade-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 100);
      });
    });
  }

  const waCta = document.getElementById('contact-whatsapp-cta');
  if (waCta) {
    waCta.innerHTML = `
      <a href="${getWhatsAppGeneralLink()}" target="_blank" class="btn btn-whatsapp" style="font-size: 1.1rem; padding: 16px 40px;">
        ${ICONS.whatsapp} Chat on WhatsApp
      </a>
    `;
  }
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  // Handle legacy .fade-in elements
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'about-text') {
          entry.target.querySelectorAll('.reveal-word').forEach(word => {
            word.classList.add('revealed');
          });
        }
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Handle new .reveal, .reveal-left, .reveal-right elements
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Small delay so animation feels intentional
        const delay = entry.target.classList.contains('reveal-delay-1') ? 100 :
                      entry.target.classList.contains('reveal-delay-2') ? 200 :
                      entry.target.classList.contains('reveal-delay-3') ? 300 :
                      entry.target.classList.contains('reveal-delay-4') ? 400 : 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, #about-text').forEach(el => fadeObserver.observe(el));
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
}


// ---- Initialize ----
document.addEventListener('DOMContentLoaded', async () => {
  // Preloader Logic
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Lock screen for exactly 3 seconds, then fade out
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      // Remove from DOM after the CSS transition finishes
      setTimeout(() => preloader.remove(), 800);
    }, 3000);
  }

  await loadContent();
  if (!siteContent) return;

  initNavigation();
  populateTopBar();
  populateFooter();
  initPackages();
  initAbout();
  initCoverage();
  initContact();
  initScrollAnimations();
  initCounters();
});

// ---- Counter Animation ----
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 100; // Lower is faster

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  };

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

