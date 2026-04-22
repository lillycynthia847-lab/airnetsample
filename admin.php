<?php
session_start();

// Read current content to get password
$contentPath = __DIR__ . '/data/content.json';
$content = ['admin' => ['password' => 'airnet2024']]; // Fallback
if (file_exists($contentPath)) {
    $contentStr = file_get_contents($contentPath);
    if ($contentStr) {
        $decoded = json_decode($contentStr, true);
        if ($decoded) $content = $decoded;
    }
}
$correctPassword = $content['admin']['password'];

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Handle Login
$loginError = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === $correctPassword) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $loginError = 'Incorrect password. Please try again.';
    }
}

$isLoggedIn = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel | Airnet Broadband</title>
  <link rel="stylesheet" href="css/styles.css">
  <link rel="icon" type="image/png" href="assets/logo.png">
  <meta name="robots" content="noindex, nofollow">
</head>
<body>

  <?php if (!$isLoggedIn): ?>
  <!-- Login Screen -->
  <div class="admin-login" id="admin-login">
    <div class="admin-login-card">
      <img src="assets/logo.png" alt="Airnet Broadband" onerror="this.style.display='none'">
      <h2>Admin Panel</h2>
      <p class="subtitle">Enter your password to continue</p>
      
      <?php if ($loginError): ?>
      <div class="admin-login-error" style="display:block;"><?php echo htmlspecialchars($loginError); ?></div>
      <?php endif; ?>
      
      <form method="POST" action="admin.php">
        <div class="admin-input-group">
          <label for="admin-password">Password</label>
          <input type="password" id="admin-password" name="password" placeholder="Enter admin password" autocomplete="current-password" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">Log In</button>
      </form>
    </div>
  </div>
  <?php else: ?>

  <!-- Dashboard -->
  <div class="admin-dashboard" id="admin-dashboard" style="display:block;">

    <!-- Header -->
    <div class="admin-header">
      <div class="admin-header-left">
        <img src="assets/logo.png" alt="Airnet" onerror="this.style.display='none'">
        <h3>Admin Panel</h3>
      </div>
      <div class="admin-header-right">
        <button class="btn btn-primary" id="save-btn" onclick="saveContent()" style="padding: 10px 24px; font-size: 0.9rem;">
          💾 Save Changes
        </button>
        <a href="admin.php?action=logout" class="btn" style="color: var(--gray-500); font-size: 0.9rem; text-decoration: none;">
          Logout
        </a>
      </div>
    </div>

    <!-- Tabs -->
    <div class="admin-tabs" id="admin-tabs">
      <button class="admin-tab active" data-section="home-fibre" onclick="switchSection('home-fibre')">🏠 Home Fibre</button>
      <button class="admin-tab" data-section="business-fibre" onclick="switchSection('business-fibre')">🏢 Business Fibre</button>
      <button class="admin-tab" data-section="contact-info" onclick="switchSection('contact-info')">📞 Contact Info</button>
      <button class="admin-tab" data-section="coverage" onclick="switchSection('coverage')">📍 Coverage</button>
      <button class="admin-tab" data-section="company" onclick="switchSection('company')">ℹ️ Company Info</button>
      <button class="admin-tab" data-section="settings" onclick="switchSection('settings')">⚙️ Settings</button>
    </div>

    <!-- Content -->
    <div class="admin-content">

      <!-- Home Fibre Section -->
      <div class="admin-section active" id="section-home-fibre">
        <h3>Home Fibre Packages</h3>
        <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Manage your home fibre internet packages. Each package appears as a card on the website.</p>
        <div id="home-fibre-packages"></div>
        <button class="admin-btn-add" onclick="addPackage('homeFibre')">+ Add Package</button>
      </div>

      <!-- Business Fibre Section -->
      <div class="admin-section" id="section-business-fibre">
        <h3>Business Fibre Packages</h3>
        <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Manage your business fibre internet packages.</p>
        <div id="business-fibre-packages"></div>
        <button class="admin-btn-add" onclick="addPackage('businessFibre')">+ Add Package</button>
      </div>

      <!-- Contact Info Section -->
      <div class="admin-section" id="section-contact-info">
        <h3>Contact Information</h3>
        <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Update your phone numbers, emails, and social media links.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="admin-input-group">
            <label>Phone Number</label>
            <input type="text" id="contact-phone" placeholder="e.g. 0721515583">
          </div>
          <div class="admin-input-group">
            <label>WhatsApp Number (international format)</label>
            <input type="text" id="contact-whatsapp" placeholder="e.g. 254721515583">
          </div>
          <div class="admin-input-group">
            <label>Support Email</label>
            <input type="email" id="contact-support-email" placeholder="e.g. info@airnet.co.ke">
          </div>
          <div class="admin-input-group">
            <label>Sales Email</label>
            <input type="email" id="contact-sales-email" placeholder="e.g. sales@airnet.co.ke">
          </div>
        </div>
        <div class="admin-input-group">
          <label>Physical Address / Location</label>
          <input type="text" id="contact-location" placeholder="e.g. Gathii Hse Ground Floor...">
        </div>
        <h4 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--primary);">Social Media Links</h4>
        <p style="color: var(--gray-400); font-size: 0.85rem; margin-bottom: 1rem;">Leave blank if you don't have the account yet. Icons will only appear on the website when a URL is provided.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
          <div class="admin-input-group">
            <label>Facebook URL</label>
            <input type="url" id="social-facebook" placeholder="https://facebook.com/...">
          </div>
          <div class="admin-input-group">
            <label>Instagram URL</label>
            <input type="url" id="social-instagram" placeholder="https://instagram.com/...">
          </div>
          <div class="admin-input-group">
            <label>TikTok URL</label>
            <input type="url" id="social-tiktok" placeholder="https://tiktok.com/@...">
          </div>
        </div>
      </div>

      <!-- Coverage Section -->
      <div class="admin-section" id="section-coverage">
        <h3>Coverage Areas</h3>
        <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Manage the regions and areas you serve. Separate area names with commas.</p>
        <div id="coverage-regions"></div>
        <button class="admin-btn-add" onclick="addRegion()">+ Add Region</button>
      </div>

      <!-- Company Info Section -->
      <div class="admin-section" id="section-company">
        <h3>Company Information</h3>
        <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Update your company tagline, about text, vision and mission.</p>
        <div class="admin-input-group">
          <label>Tagline</label>
          <input type="text" id="company-tagline" placeholder="e.g. Fast. Reliable. Affordable Internet">
        </div>
        <div class="admin-input-group">
          <label>About Us</label>
          <textarea id="company-about" rows="4" placeholder="Company description..."></textarea>
        </div>
        <div class="admin-input-group">
          <label>Vision</label>
          <textarea id="company-vision" rows="3" placeholder="Company vision..."></textarea>
        </div>
        <div class="admin-input-group">
          <label>Mission</label>
          <textarea id="company-mission" rows="3" placeholder="Company mission..."></textarea>
        </div>
      </div>

      <!-- Settings Section -->
      <div class="admin-section" id="section-settings">
        <h3>Settings</h3>
        <p style="color: var(--gray-500); margin-bottom: 1.5rem;">Change your admin panel password.</p>
        <div style="max-width: 400px;">
          <div class="admin-input-group">
            <label>Current Password</label>
            <input type="password" id="current-password" placeholder="Enter current password">
          </div>
          <div class="admin-input-group">
            <label>New Password</label>
            <input type="password" id="new-password" placeholder="Enter new password">
          </div>
          <div class="admin-input-group">
            <label>Confirm New Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm new password">
          </div>
          <button class="btn btn-primary" onclick="changePassword()" style="margin-top: 0.5rem;">Update Password</button>
        </div>
      </div>

    </div>
  </div>

  <!-- Toast -->
  <div class="admin-toast" id="admin-toast"></div>

  <script src="js/admin.js"></script>
  <?php endif; ?>
</body>
</html>
