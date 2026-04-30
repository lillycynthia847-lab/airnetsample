/* ===========================================
   AIRNET BROADBAND - Admin Panel JavaScript
   =========================================== */

let adminContent = null;
let unsavedChanges = false;

// ---- Load Content ----
async function loadAdminContent() {
  try {
    const response = await fetch('data/content.json');
    if (!response.ok) throw new Error('Failed to load content');
    adminContent = await response.json();
    return adminContent;
  } catch (error) {
    console.error('Error loading content:', error);
    showToast('Failed to load content data', 'error');
    return null;
  }
}

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  // Only load if dashboard is visible (user is logged in)
  const dashboard = document.getElementById('admin-dashboard');
  if (dashboard && dashboard.style.display !== 'none') {
    await loadAdminContent();
    populateDashboard();
  }

  // Warn before leaving with unsaved changes
  window.addEventListener('beforeunload', (e) => {
    if (unsavedChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
});

// ---- Section Switching ----
function switchSection(sectionId) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));

  document.getElementById(`section-${sectionId}`).classList.add('active');
  document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// ---- Populate Dashboard ----
function populateDashboard() {
  renderPackageEditor('homeFibre', 'home-fibre-packages');
  renderPackageEditor('businessFibre', 'business-fibre-packages');
  populateContactInfo();
  renderCoverageEditor();
  populateCompanyInfo();
}

// ---- Package Editor ----
function renderPackageEditor(type, containerId) {
  const container = document.getElementById(containerId);
  const packages = adminContent[type];

  container.innerHTML = packages.map((pkg, index) => `
    <div class="admin-package-card" data-type="${type}" data-index="${index}">
      <div class="package-number">Package ${index + 1}</div>
      <button class="admin-btn-remove-package" onclick="removePackage('${type}', ${index})">✕ Remove</button>
      <div class="admin-package-grid">
        <div class="admin-input-group">
          <label>Plan Name</label>
          <input type="text" value="${pkg.name}" onchange="updatePackageField('${type}', ${index}, 'name', this.value)">
        </div>
        <div class="admin-input-group">
          <label>Speed (Mbps)</label>
          <input type="number" value="${pkg.speed}" onchange="updatePackageField('${type}', ${index}, 'speed', this.value)">
        </div>
        <div class="admin-input-group">
          <label>Price (KSh)</label>
          <input type="text" value="${pkg.price}" onchange="updatePackageField('${type}', ${index}, 'price', this.value)">
        </div>
      </div>
      <div class="admin-highlight-toggle">
        <input type="checkbox" id="highlight-${type}-${index}" ${pkg.highlighted ? 'checked' : ''} onchange="updatePackageField('${type}', ${index}, 'highlighted', this.checked)">
        <label for="highlight-${type}-${index}" style="font-weight: 500; color: var(--gray-600);">Mark as "Popular" (highlighted card)</label>
      </div>
      <div class="admin-input-group" style="margin-top: 1rem;">
        <label>Features</label>
        <div class="admin-features-list" id="features-${type}-${index}">
          ${pkg.features.map((f, fi) => `
            <div class="admin-feature-item">
              <input type="text" value="${f}" onchange="updateFeature('${type}', ${index}, ${fi}, this.value)">
              <button class="admin-btn-remove-feature" onclick="removeFeature('${type}', ${index}, ${fi})">✕</button>
            </div>
          `).join('')}
        </div>
        <button class="admin-btn-add" onclick="addFeature('${type}', ${index})" style="margin-top: 0.5rem; padding: 6px 16px; font-size: 0.8rem;">+ Add Feature</button>
      </div>
    </div>
  `).join('');
}

function updatePackageField(type, index, field, value) {
  adminContent[type][index][field] = value;
  markUnsaved();
}

function addPackage(type) {
  adminContent[type].push({
    name: 'New Package',
    speed: '10',
    price: '1,000',
    features: ['Feature 1'],
    highlighted: false
  });
  const containerId = type === 'homeFibre' ? 'home-fibre-packages' : 'business-fibre-packages';
  renderPackageEditor(type, containerId);
  markUnsaved();
  showToast('Package added', 'success');
}

function removePackage(type, index) {
  if (!confirm('Are you sure you want to remove this package?')) return;
  adminContent[type].splice(index, 1);
  const containerId = type === 'homeFibre' ? 'home-fibre-packages' : 'business-fibre-packages';
  renderPackageEditor(type, containerId);
  markUnsaved();
  showToast('Package removed', 'warning');
}

// ---- Feature Management ----
function updateFeature(type, pkgIndex, featureIndex, value) {
  adminContent[type][pkgIndex].features[featureIndex] = value;
  markUnsaved();
}

function addFeature(type, pkgIndex) {
  adminContent[type][pkgIndex].features.push('New Feature');
  const containerId = type === 'homeFibre' ? 'home-fibre-packages' : 'business-fibre-packages';
  renderPackageEditor(type, containerId);
  markUnsaved();
}

function removeFeature(type, pkgIndex, featureIndex) {
  adminContent[type][pkgIndex].features.splice(featureIndex, 1);
  const containerId = type === 'homeFibre' ? 'home-fibre-packages' : 'business-fibre-packages';
  renderPackageEditor(type, containerId);
  markUnsaved();
}

// ---- Contact Info ----
function populateContactInfo() {
  const c = adminContent.contact;
  document.getElementById('contact-phone').value = c.phone || '';
  document.getElementById('contact-whatsapp').value = c.whatsapp || '';
  document.getElementById('contact-support-email').value = c.supportEmail || '';
  document.getElementById('contact-operations-email').value = c.operationsEmail || '';
  document.getElementById('contact-location').value = c.location || '';
  document.getElementById('social-facebook').value = c.socialMedia.facebook || '';
  document.getElementById('social-instagram').value = c.socialMedia.instagram || '';
  document.getElementById('social-tiktok').value = c.socialMedia.tiktok || '';

  // Add change listeners
  ['contact-phone', 'contact-whatsapp', 'contact-support-email', 'contact-operations-email',
   'contact-location', 'social-facebook', 'social-instagram', 'social-tiktok'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => markUnsaved());
  });
}

function gatherContactInfo() {
  adminContent.contact.phone = document.getElementById('contact-phone').value;
  adminContent.contact.whatsapp = document.getElementById('contact-whatsapp').value;
  adminContent.contact.supportEmail = document.getElementById('contact-support-email').value;
  adminContent.contact.operationsEmail = document.getElementById('contact-operations-email').value;
  adminContent.contact.location = document.getElementById('contact-location').value;
  adminContent.contact.socialMedia.facebook = document.getElementById('social-facebook').value;
  adminContent.contact.socialMedia.instagram = document.getElementById('social-instagram').value;
  adminContent.contact.socialMedia.tiktok = document.getElementById('social-tiktok').value;
}

// ---- Coverage Editor ----
function renderCoverageEditor() {
  const container = document.getElementById('coverage-regions');
  container.innerHTML = adminContent.coverage.map((region, index) => `
    <div class="admin-region-card">
      <button class="admin-btn-remove-package" onclick="removeRegion(${index})">✕ Remove</button>
      <div class="admin-input-group">
        <label>Region Name</label>
        <input type="text" value="${region.region}" onchange="updateRegionName(${index}, this.value)">
      </div>
      <div class="admin-input-group">
        <label>Areas (comma-separated)</label>
        <textarea class="admin-areas-input" rows="3" onchange="updateRegionAreas(${index}, this.value)">${region.areas.join(', ')}</textarea>
        <div class="admin-areas-help">Separate each area with a comma. Example: Nyeri Town, King'ong'o, Kamakwa</div>
      </div>
    </div>
  `).join('');
}

function updateRegionName(index, value) {
  adminContent.coverage[index].region = value;
  markUnsaved();
}

function updateRegionAreas(index, value) {
  adminContent.coverage[index].areas = value.split(',').map(a => a.trim()).filter(a => a);
  markUnsaved();
}

function addRegion() {
  adminContent.coverage.push({
    region: 'New Region',
    areas: ['Area 1']
  });
  renderCoverageEditor();
  markUnsaved();
  showToast('Region added', 'success');
}

function removeRegion(index) {
  if (!confirm('Are you sure you want to remove this region?')) return;
  adminContent.coverage.splice(index, 1);
  renderCoverageEditor();
  markUnsaved();
  showToast('Region removed', 'warning');
}

// ---- Company Info ----
function populateCompanyInfo() {
  const c = adminContent.company;
  document.getElementById('company-tagline').value = c.tagline || '';
  document.getElementById('company-about').value = c.about || '';
  document.getElementById('company-vision').value = c.vision || '';
  document.getElementById('company-mission').value = c.mission || '';

  ['company-tagline', 'company-about', 'company-vision', 'company-mission'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => markUnsaved());
  });
}

function gatherCompanyInfo() {
  adminContent.company.tagline = document.getElementById('company-tagline').value;
  adminContent.company.about = document.getElementById('company-about').value;
  adminContent.company.vision = document.getElementById('company-vision').value;
  adminContent.company.mission = document.getElementById('company-mission').value;
}

// ---- Password Change ----
function changePassword() {
  const current = document.getElementById('current-password').value;
  const newPass = document.getElementById('new-password').value;
  const confirm = document.getElementById('confirm-password').value;

  if (current !== adminContent.admin.password) {
    showToast('Current password is incorrect', 'error');
    return;
  }

  if (newPass.length < 4) {
    showToast('New password must be at least 4 characters', 'error');
    return;
  }

  if (newPass !== confirm) {
    showToast('Passwords do not match', 'error');
    return;
  }

  adminContent.admin.password = newPass;
  document.getElementById('current-password').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-password').value = '';
  markUnsaved();
  showToast('Password updated! Remember to save changes.', 'success');
}

// ---- Save Content ----
async function saveContent() {
  // Gather latest data from inputs
  gatherContactInfo();
  gatherCompanyInfo();

  try {
    const response = await fetch('api/save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminContent)
    });

    if (response.ok) {
      unsavedChanges = false;
      updateSaveButton();
      showToast('Changes saved successfully!', 'success');
    } else {
      if (response.status === 401) {
        showToast('Session expired. Please reload and login again.', 'error');
      } else {
        throw new Error('Server error');
      }
    }
  } catch (error) {
    console.error('Save failed:', error);
    showToast('Failed to save to server. Check your cPanel file permissions.', 'error');
  }
}

// ---- Unsaved Changes Tracking ----
function markUnsaved() {
  unsavedChanges = true;
  updateSaveButton();
}

function updateSaveButton() {
  const saveBtn = document.getElementById('save-btn');
  if (unsavedChanges) {
    saveBtn.textContent = '💾 Save Changes *';
    saveBtn.style.background = 'linear-gradient(135deg, var(--accent), var(--purple))';
  } else {
    saveBtn.textContent = '💾 Save Changes';
    saveBtn.style.background = '';
  }
}

// ---- Toast Notification ----
function showToast(message, type = 'success') {
  const toast = document.getElementById('admin-toast');
  toast.textContent = message;
  toast.className = `admin-toast ${type} show`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ==============================
// CAREERS MANAGEMENT
// ==============================

async function loadAdminCareers() {
  const container = document.getElementById('admin-careers-list');
  if (!container) return;
  try {
    const res  = await fetch('api/get-careers.php');
    const jobs = await res.json();
    if (!jobs || jobs.length === 0) {
      container.innerHTML = '<p style="color:var(--gray-500); padding: 1rem 0;">No job openings posted yet.</p>';
      return;
    }
    container.innerHTML = jobs.map(job => `
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--white); border:1px solid var(--gray-200); border-radius:10px; padding:1rem 1.25rem; margin-bottom:0.75rem;">
        <div>
          <strong style="font-size:1rem;">${job.title}</strong>
          <span style="margin-left:10px; font-size:0.8rem; color:var(--gray-500);">${job.department || ''} ${job.type ? '· ' + job.type : ''} ${job.location ? '· ' + job.location : ''}</span>
          ${job.deadline ? `<br><small style="color:var(--gray-400);">Deadline: ${job.deadline}</small>` : ''}
        </div>
        <button onclick="deleteJob('${job.id}')" style="background:#fee2e2; color:#dc2626; border:none; padding:8px 16px; border-radius:8px; cursor:pointer; font-size:0.85rem; font-weight:600;">🗑 Delete</button>
      </div>
    `).join('');
  } catch (e) {
    container.innerHTML = '<p style="color:red;">Failed to load careers.</p>';
  }
}

async function postJob() {
  const title    = document.getElementById('career-title').value.trim();
  const dept     = document.getElementById('career-dept').value.trim();
  const location = document.getElementById('career-location').value.trim();
  const type     = document.getElementById('career-type').value;
  const desc     = document.getElementById('career-desc').value.trim();
  const deadline = document.getElementById('career-deadline').value;
  const feedback = document.getElementById('career-feedback');

  if (!title) { alert('Please enter a job title.'); return; }

  try {
    const res    = await fetch('api/save-careers.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add', title, department: dept, location, type, description: desc, deadline })
    });
    const result = await res.json();
    feedback.style.display = 'block';
    if (result.success) {
      feedback.style.color = 'green';
      feedback.textContent = '✅ Job posted successfully!';
      // Clear form
      ['career-title','career-dept','career-location','career-desc','career-deadline'].forEach(id => document.getElementById(id).value = '');
      loadAdminCareers();
    } else {
      feedback.style.color = 'red';
      feedback.textContent = '❌ ' + (result.message || 'Failed to post job.');
    }
  } catch (e) {
    feedback.style.display = 'block';
    feedback.style.color = 'red';
    feedback.textContent = '❌ Network error. Try again.';
  }
}

async function deleteJob(id) {
  if (!confirm('Are you sure you want to delete this job opening?')) return;
  try {
    const res    = await fetch('api/save-careers.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
    const result = await res.json();
    if (result.success) {
      showToast('Job deleted successfully');
      loadAdminCareers();
    }
  } catch (e) {
    showToast('Failed to delete job', 'error');
  }
}

// Load careers when the tab is opened
const origSwitchSection = typeof switchSection === 'function' ? switchSection : null;
document.addEventListener('DOMContentLoaded', () => {
  // Patch tab switching to load careers on demand
  document.querySelectorAll('[data-section="careers"]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(loadAdminCareers, 100));
  });
});
