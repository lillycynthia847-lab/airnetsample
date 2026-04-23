<?php 
$pageTitle = "Airnet Broadband | Fast. Reliable. Affordable Internet";
include 'includes/header.php'; 
?>

<!-- ===== HERO ===== -->
<section class="hero" id="hero">
  <div class="container">
    <div class="hero-content fade-in">
      <h1>Fast. Reliable.<br><span class="highlight">Affordable Internet</span></h1>
      <p>Experience high-speed fiber internet connectivity for your home and business. 100% fiber optic, free installation across all plans.</p>
      <div class="hero-buttons">
        <a href="#packages" class="btn btn-accent">View Our Plans</a>
        <a href="#contact" class="btn btn-outline-white">Contact Us</a>
      </div>
    </div>
  </div>
</section>

<!-- ===== PACKAGES ===== -->
<section class="section" id="packages">
  <div class="container">
    <div class="section-title">
      <h2>Internet Packages</h2>
      <p>Get connected to fast, reliable and affordable internet</p>
    </div>
    <div class="package-tabs">
      <button class="package-tab active" data-tab="home" id="tab-home">Home Fibre</button>
      <button class="package-tab" data-tab="business" id="tab-business">Business Fibre</button>
    </div>
    <div class="packages-grid" id="home-packages-grid"></div>
    <div class="packages-grid" id="business-packages-grid" style="display:none;"></div>
  </div>
</section>

<!-- ===== ABOUT TEASER ===== -->
<section class="section" id="about" style="background: var(--gray-50);">
  <div class="container">
    <div class="about-teaser-grid">
      <div class="about-teaser-image fade-in">
         <img src="assets/about-1.png" alt="Airnet Connection">
      </div>
      <div class="about-teaser-text">
        <h3 class="about-subtitle">Who We Are</h3>
        <h2 class="about-title">Connecting Kenya with world-class connectivity.</h2>
        <p>AirNet Broadband Limited is a privately owned Kenyan Internet Service Provider (ISP) dedicated to bridging the digital divide through fast, reliable, and affordable fiber internet services.</p>
        <a href="about.php" class="btn btn-primary">Read Our Story</a>
      </div>
    </div>
  </div>
</section>

<!-- ===== COVERAGE ===== -->
<section class="section" id="coverage">
  <div class="container">
    <div class="section-title">
      <h2>Coverage Areas</h2>
      <p>Our fiber network covers the following areas</p>
    </div>
    <div class="coverage-grid" id="coverage-grid"></div>
  </div>
</section>

<!-- ===== CONTACT ===== -->
<section class="section" id="contact" style="background: var(--gray-50);">
  <div class="container">
    <div class="section-title">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you — get in touch today</p>
    </div>
    <div class="contact-grid" id="contact-grid"></div>
    <div class="contact-whatsapp-cta" id="contact-whatsapp-cta"></div>
  </div>
</section>

<?php include 'includes/footer.php'; ?>
