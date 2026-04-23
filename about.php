<?php 
$pageTitle = "About Us | Airnet Broadband";
include 'includes/header.php'; 
?>

<!-- ===== ABOUT HERO ===== -->
<section class="hero-sub" style="background: linear-gradient(rgba(27, 31, 75, 0.9), rgba(27, 31, 75, 0.9)), url('assets/hero-bg.png'); padding: 120px 0 60px; text-align: center; color: white;">
  <div class="container">
    <h1 class="fade-in">Our Story</h1>
    <p class="fade-in" style="max-width: 700px; margin: 20px auto 0; opacity: 0.9;">Connecting communities and empowering businesses with world-class fiber connectivity.</p>
  </div>
</section>

<!-- ===== ABOUT SECTION ===== -->
<section class="section" id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-images fade-in">
        <img src="assets/about-1.png" alt="Family streaming movie" class="about-img-main">
        <img src="assets/about-2.png" alt="Professional working" class="about-img-float">
        <div class="about-experience-badge">
          <span class="badge-number">100%</span>
          <span class="badge-text">Fiber Optic<br>Network</span>
        </div>
      </div>
      <div class="about-text-content">
        <h3 class="about-subtitle">Who We Are</h3>
        <h2 class="about-title">Experience the future of connectivity.</h2>
        <div class="about-text-wrapper" id="about-text">
          <!-- Text will be populated by main.js with word-reveal animation -->
        </div>
        
        <div class="about-cards">
          <div class="about-card fade-in" style="transition-delay: 0.2s;">
            <div class="about-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div class="about-card-text">
              <h4>Our Vision</h4>
              <div id="vision-text"></div>
            </div>
          </div>
          <div class="about-card fade-in" style="transition-delay: 0.4s;">
            <div class="about-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div class="about-card-text">
              <h4>Our Mission</h4>
              <div id="mission-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
