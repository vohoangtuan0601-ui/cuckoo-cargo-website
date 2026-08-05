/**
 * Cuckoo Cargo — Role-Based Auth Guard
 * Usage: pageInit('admin' | 'any').then(({ user, role }) => { ... })
 * Roles: 'admin' | 'staff'
 */

async function pageInit(requiredRole) {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) { location.href = 'index.html'; return; }

      let role = 'staff';
      try {
        const ref  = db.collection('users').doc(user.uid);
        const snap = await ref.get({ source: 'server' });
        if (snap.exists) {
          role = snap.data().role || 'staff';
        } else {
          // First login — create user doc as staff
          await ref.set({
            email:     user.email,
            role:      'staff',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      } catch(e) { console.warn('Auth role error:', e); }

      window._currentUser = user;
      window._currentRole = role;

      _applyNavbar(role, user);

      if (requiredRole === 'admin' && role !== 'admin') {
        // Allow access if NO admin exists yet (first-time bootstrap)
        try {
          const adminSnap = await db.collection('users')
            .where('role','==','admin').limit(1).get();
          if (!adminSnap.empty) {
            // Admins exist but this user isn't one → deny
            _showDenied();
            return;
          }
          // No admins yet → allow through for bootstrap setup
          const notice = document.getElementById('bootstrapNotice');
          if (notice) notice.style.display = '';
        } catch(e) {
          _showDenied();
          return;
        }
      }

      resolve({ user, role });
    });
  });
}

function _applyNavbar(role, user) {
  // Hide admin-only nav items for non-admins
  document.querySelectorAll('.nav-admin-only').forEach(el => {
    el.style.display = role === 'admin' ? '' : 'none';
  });
  // Show badge: role + email
  const badge = document.getElementById('navRoleBadge');
  if (badge) {
    badge.textContent  = role === 'admin' ? '👑 Admin' : '👤 Staff';
    badge.style.cssText = `
      font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;
      background:${role === 'admin' ? '#fde68a' : '#e0e7ff'};
      color:${role === 'admin' ? '#92400e' : '#3730a3'};
    `;
  }

  // ── HAMBURGER MENU (mobile) ──
  const navbar = document.querySelector('.navbar');
  const navNav = document.querySelector('.navbar-nav');
  if (navbar && navNav && !document.getElementById('navHamburger')) {
    const ham = document.createElement('button');
    ham.id = 'navHamburger';
    ham.className = 'hamburger';
    ham.setAttribute('aria-label', 'Menu');
    ham.innerHTML = '<span></span><span></span><span></span>';
    ham.addEventListener('click', () => {
      navNav.classList.toggle('mob-open');
      ham.classList.toggle('open');
    });
    // Close when any link or logout button is tapped
    navNav.addEventListener('click', e => {
      if (e.target.matches('.nav-link, .btn-logout')) {
        navNav.classList.remove('mob-open');
        ham.classList.remove('open');
      }
    });
    // Close when tapping outside
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navNav.classList.remove('mob-open');
        ham.classList.remove('open');
      }
    });
    navbar.appendChild(ham);
  }
}

function _showDenied() {
  const c = document.querySelector('.container');
  if (c) c.innerHTML = `
    <div style="text-align:center;padding:80px 20px">
      <div style="font-size:60px;margin-bottom:14px">🔒</div>
      <h2 style="color:#dc2626;margin-bottom:8px">Không có quyền truy cập</h2>
      <p style="color:#6b7280;margin-bottom:24px">Trang này chỉ dành cho Admin.</p>
      <a href="dashboard.html"
         style="background:#f97316;color:#fff;padding:11px 28px;border-radius:8px;
                font-weight:700;text-decoration:none;display:inline-block">
        ← Về Dashboard
      </a>
    </div>`;
}
