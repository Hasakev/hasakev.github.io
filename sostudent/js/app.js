// SOStudent — localStorage simulation layer
const SOStudent = (() => {
  const KEYS = {
    users:          'ss_users',
    questions:      'ss_questions',
    comments:       'ss_comments',
    favourites:     'ss_favourites',
    bookmarks:      'ss_bookmarks',
    views:          'ss_views',
    attachments:    'ss_attachments',
    currentUser:    'ss_current_user',
    remember:       'ss_remember',
    pendingVerify:  'ss_pending_verify',
    verified:       'ss_verified',
    resetCodes:     'ss_reset_codes',
    seeded:         'ss_seeded',
  };

  // ── storage helpers ──────────────────────────────────────────────────────
  function load(key, fallback = []) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function randId(len = 5) { return Math.random().toString(36).slice(2, 2 + len).padEnd(len, '0'); }
  function randCode(len = 6) { return String(Math.floor(Math.random() * 10 ** len)).padStart(len, '0'); }
  function escHtml(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function now() {
    return new Date().toLocaleString('en-AU', {
      day:'2-digit', month:'2-digit', year:'numeric',
      hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true
    });
  }

  // ── seed ─────────────────────────────────────────────────────────────────
  function seed() {
    if (localStorage.getItem(KEYS.seeded)) return;
    save(KEYS.users, [
      { username:'alice',   password:'password123', firstname:'Alice',   lastname:'Smith', email:'alice@example.com'   },
      { username:'bob',     password:'password123', firstname:'Bob',     lastname:'Jones', email:'bob@example.com'     },
      { username:'charlie', password:'password123', firstname:'Charlie', lastname:'Brown', email:'charlie@example.com' },
    ]);
    save(KEYS.verified, { alice: true, bob: true, charlie: true });
    save(KEYS.questions, [
      { id:'q0001', username:'alice',   subject:'Algorithms', question:'What is the time complexity of quicksort?',              content:'I know the average case is O(n log n) but what about worst case and how do we avoid it in practice?',                              rating:5, time:'01/05/2023, 09:14:00 am', views:21 },
      { id:'q0002', username:'bob',     subject:'Web Dev',    question:'Difference between localStorage and sessionStorage?',    content:'I keep mixing these up. What are the key differences and when should I use each one?',                                            rating:4, time:'02/05/2023, 11:30:00 am', views:14 },
      { id:'q0003', username:'charlie', subject:'Databases',  question:'When should I use an index on a database column?',       content:'My queries are getting slow. I read that indexes help but also that they slow down writes. How do I decide when to add one?',    rating:3, time:'03/05/2023, 02:05:00 pm', views:9  },
      { id:'q0004', username:'alice',   subject:'Linux',      question:'How do I find which process is using a port?',            content:'Port 8080 is in use and I cannot figure out what is holding it. Is there a quick terminal command to identify the process?',    rating:6, time:'04/05/2023, 04:45:00 pm', views:33 },
      { id:'q0005', username:'bob',     subject:'Web Dev',    question:'What is CORS and why does my API keep blocking requests?', content:'I have a React frontend calling a backend on a different port and I keep getting CORS errors in the browser console.',          rating:7, time:'05/05/2023, 08:20:00 am', views:42 },
      { id:'q0006', username:'charlie', subject:'Algorithms', question:'How does a hash table handle collisions?',                 content:'I understand that hash tables map keys to buckets, but what actually happens when two keys hash to the same bucket?',           rating:2, time:'06/05/2023, 01:10:00 pm', views:7  },
      { id:'q0007', username:'alice',   subject:'Databases',  question:'What is the difference between INNER JOIN and LEFT JOIN?', content:'I always forget which join includes unmatched rows. Can someone give a clear explanation with a concrete SQL example?',        rating:8, time:'07/05/2023, 10:55:00 am', views:55 },
      { id:'q0008', username:'bob',     subject:'Linux',      question:'How do I check disk usage in Linux?',                      content:'My server is running out of space but I cannot tell which directory is taking up the most room. What commands should I run?',  rating:3, time:'08/05/2023, 03:30:00 pm', views:18 },
    ]);
    save(KEYS.comments, [
      { c_id:1,  question_id:'q0001', username:'bob',     comment:'Worst case is O(n²) when the pivot is always the min or max. Use median-of-three pivot selection to avoid it.',        time:'01/05/2023, 10:00:00 am' },
      { c_id:2,  question_id:'q0001', username:'charlie', comment:'Or use merge sort if you need guaranteed O(n log n). Quicksort is usually faster in practice due to cache locality.', time:'01/05/2023, 10:30:00 am' },
      { c_id:3,  question_id:'q0002', username:'alice',   comment:'localStorage persists until manually cleared. sessionStorage is wiped when the tab closes. Use localStorage for "remember me" features.',        time:'02/05/2023, 12:00:00 pm' },
      { c_id:4,  question_id:'q0004', username:'bob',     comment:'Try: lsof -i :8080   or   ss -tlnp | grep 8080',                                                                      time:'04/05/2023, 05:00:00 pm' },
      { c_id:5,  question_id:'q0005', username:'charlie', comment:'Add Access-Control-Allow-Origin: * to your backend response headers, or set it to your specific frontend origin.',   time:'05/05/2023, 09:00:00 am' },
      { c_id:6,  question_id:'q0005', username:'alice',   comment:'Also handle OPTIONS preflight requests — many frameworks have CORS middleware that does this automatically.',          time:'05/05/2023, 09:45:00 am' },
      { c_id:7,  question_id:'q0007', username:'bob',     comment:'INNER JOIN: only rows where both tables match. LEFT JOIN: all rows from left table, NULL for missing right matches.', time:'07/05/2023, 11:30:00 am' },
      { c_id:8,  question_id:'q0007', username:'charlie', comment:'Think of it as: INNER = intersection, LEFT = everything from left side plus matching from the right.',               time:'07/05/2023, 12:00:00 pm' },
      { c_id:9,  question_id:'q0008', username:'alice',   comment:'Use "du -sh /*" to check top-level dirs, then drill down. "df -h" shows overall disk usage per partition.',           time:'08/05/2023, 04:00:00 pm' },
      { c_id:10, question_id:'q0003', username:'bob',     comment:'Rule of thumb: index columns you filter or join on frequently. Avoid indexing columns that change very often.',       time:'03/05/2023, 03:00:00 pm' },
    ]);
    save(KEYS.favourites, [
      { question_id:'q0001', username:'bob'     },
      { question_id:'q0001', username:'charlie' },
      { question_id:'q0004', username:'bob'     },
      { question_id:'q0005', username:'alice'   },
      { question_id:'q0007', username:'alice'   },
      { question_id:'q0007', username:'charlie' },
    ]);
    save(KEYS.bookmarks, [
      { question_id:'q0002', username:'alice'   },
      { question_id:'q0005', username:'charlie' },
    ]);
    localStorage.setItem(KEYS.seeded, '1');
  }

  // ── auth ──────────────────────────────────────────────────────────────────
  const auth = {
    isLoggedIn() { return !!load(KEYS.currentUser, null); },
    currentUser() { return load(KEYS.currentUser, null); },
    requireLogin() {
      if (!this.isLoggedIn()) { window.location.href = 'login.html'; return false; }
      return true;
    },
    login(username, password) {
      const user = load(KEYS.users).find(u => u.username === username && u.password === password);
      if (!user) return { ok: false, error: 'Invalid username or password.' };
      const verified = load(KEYS.verified, {});
      if (!verified[username]) return { ok: false, error: 'Please verify your email before logging in.', needsVerify: true, username };
      const { password: _p, ...safe } = user;
      save(KEYS.currentUser, safe);
      return { ok: true };
    },
    logout() { localStorage.removeItem(KEYS.currentUser); window.location.href = 'login.html'; },
    register({ firstname, lastname, username, email, password }) {
      const users = load(KEYS.users);
      if (users.find(u => u.username === username)) return { ok: false, error: 'Username already taken.' };
      if (users.find(u => u.email === email))       return { ok: false, error: 'Email already registered.' };
      users.push({ username, password, firstname, lastname, email });
      save(KEYS.users, users);
      return { ok: true };
    },
  };

  // ── users ─────────────────────────────────────────────────────────────────
  const users = {
    get(username) { return load(KEYS.users).find(u => u.username === username) || null; },
    getByEmail(email) { return load(KEYS.users).find(u => u.email === email) || null; },
    update(username, fields) {
      const all = load(KEYS.users);
      const idx = all.findIndex(u => u.username === username);
      if (idx === -1) return { ok: false, error: 'User not found.' };
      if (fields.username && fields.username !== username) {
        if (all.find(u => u.username === fields.username)) return { ok: false, error: 'Username already taken.' };
      }
      all[idx] = { ...all[idx], ...fields };
      save(KEYS.users, all);
      const cu = auth.currentUser();
      if (cu && cu.username === username) {
        const { password: _p, ...safe } = all[idx];
        save(KEYS.currentUser, safe);
      }
      return { ok: true };
    },
  };

  // ── questions ─────────────────────────────────────────────────────────────
  const questions = {
    all()    { return load(KEYS.questions).sort((a, b) => b.rating - a.rating); },
    get(id)  { return load(KEYS.questions).find(q => q.id === id) || null; },
    subjects(){ return [...new Set(load(KEYS.questions).map(q => q.subject))]; },
    add({ subject, question, content }) {
      const cu = auth.currentUser();
      if (!cu) return null;
      const all = load(KEYS.questions);
      const q = { id: randId(), username: cu.username, subject, question, content, rating: 0, time: now(), views: 0 };
      all.push(q);
      save(KEYS.questions, all);
      return q;
    },
    delete(id) {
      const cu = auth.currentUser();
      const all = load(KEYS.questions);
      const q = all.find(x => x.id === id);
      if (!q || q.username !== cu?.username) return false;
      save(KEYS.questions, all.filter(x => x.id !== id));
      save(KEYS.comments,  load(KEYS.comments).filter(c => c.question_id !== id));
      save(KEYS.favourites,load(KEYS.favourites).filter(f => f.question_id !== id));
      save(KEYS.bookmarks, load(KEYS.bookmarks).filter(b => b.question_id !== id));
      return true;
    },
  };

  // ── comments ──────────────────────────────────────────────────────────────
  const comments = {
    forQuestion(qid) { return load(KEYS.comments).filter(c => c.question_id === qid); },
    add(question_id, comment) {
      const cu = auth.currentUser();
      if (!cu) return null;
      const all = load(KEYS.comments);
      const c = { c_id: (all.reduce((m, x) => Math.max(m, x.c_id), 0)) + 1, question_id, username: cu.username, comment, time: now() };
      all.push(c);
      save(KEYS.comments, all);
      return c;
    },
  };

  // ── favourites ────────────────────────────────────────────────────────────
  const favourites = {
    has(qid) {
      const cu = auth.currentUser();
      return cu ? load(KEYS.favourites).some(f => f.question_id === qid && f.username === cu.username) : false;
    },
    toggle(qid) {
      const cu = auth.currentUser();
      if (!cu) return;
      const favs = load(KEYS.favourites);
      const qs   = load(KEYS.questions);
      const qi   = qs.findIndex(q => q.id === qid);
      if (qi === -1) return;
      if (this.has(qid)) {
        save(KEYS.favourites, favs.filter(f => !(f.question_id === qid && f.username === cu.username)));
        qs[qi].rating = Math.max(0, qs[qi].rating - 1);
      } else {
        favs.push({ question_id: qid, username: cu.username });
        save(KEYS.favourites, favs);
        qs[qi].rating += 1;
      }
      save(KEYS.questions, qs);
      return qs[qi].rating;
    },
  };

  // ── bookmarks ─────────────────────────────────────────────────────────────
  const bookmarks = {
    has(qid) {
      const cu = auth.currentUser();
      return cu ? load(KEYS.bookmarks).some(b => b.question_id === qid && b.username === cu.username) : false;
    },
    toggle(qid) {
      const cu = auth.currentUser();
      if (!cu) return;
      const all = load(KEYS.bookmarks);
      if (this.has(qid)) {
        save(KEYS.bookmarks, all.filter(b => !(b.question_id === qid && b.username === cu.username)));
        return false;
      } else {
        all.push({ question_id: qid, username: cu.username });
        save(KEYS.bookmarks, all);
        return true;
      }
    },
    forUser() {
      const cu = auth.currentUser();
      if (!cu) return [];
      return load(KEYS.bookmarks)
        .filter(b => b.username === cu.username)
        .map(b => questions.get(b.question_id))
        .filter(Boolean);
    },
  };

  // ── views + recommendations ───────────────────────────────────────────────
  const views = {
    track(qid) {
      const cu = auth.currentUser();
      if (!cu) return;
      const q = questions.get(qid);
      if (!q) return;
      const all = load(KEYS.views);
      // deduplicate per user per question
      if (!all.find(v => v.question_id === qid && v.username === cu.username)) {
        all.push({ question_id: qid, username: cu.username, subject: q.subject, time: now() });
        save(KEYS.views, all);
      }
    },
  };

  const recommendations = {
    get() {
      const cu = auth.currentUser();
      if (!cu) return [];
      const userViews = load(KEYS.views).filter(v => v.username === cu.username);
      if (userViews.length < 1) return [];
      // count subject frequency
      const freq = {};
      userViews.forEach(v => { freq[v.subject] = (freq[v.subject] || 0) + 1; });
      const topSubjects = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 2).map(e => e[0]);
      const viewedIds = new Set(userViews.map(v => v.question_id));
      return questions.all()
        .filter(q => topSubjects.includes(q.subject) && !viewedIds.has(q.id))
        .slice(0, 3);
    },
  };

  // ── remember me ───────────────────────────────────────────────────────────
  const remember = {
    set(username) {
      save(KEYS.remember, { username, expiry: Date.now() + 30 * 24 * 60 * 60 * 1000 });
    },
    clear() { localStorage.removeItem(KEYS.remember); },
    check() {
      if (auth.isLoggedIn()) return true;
      const r = load(KEYS.remember, null);
      if (!r || Date.now() > r.expiry) return false;
      const user = users.get(r.username);
      if (!user) return false;
      const { password: _p, ...safe } = user;
      save(KEYS.currentUser, safe);
      return true;
    },
  };

  // ── email verification ────────────────────────────────────────────────────
  const verification = {
    generate(username) {
      const code = randCode(6);
      const pending = load(KEYS.pendingVerify, {});
      pending[username] = code;
      save(KEYS.pendingVerify, pending);
      return code;
    },
    verify(username, code) {
      const pending = load(KEYS.pendingVerify, {});
      if (pending[username] !== String(code)) return false;
      const verified = load(KEYS.verified, {});
      verified[username] = true;
      save(KEYS.verified, verified);
      delete pending[username];
      save(KEYS.pendingVerify, pending);
      return true;
    },
    isVerified(username) {
      return !!(load(KEYS.verified, {})[username]);
    },
    pendingCode(username) {
      return load(KEYS.pendingVerify, {})[username] || null;
    },
  };

  // ── password reset ────────────────────────────────────────────────────────
  const resetCodes = {
    generate(email) {
      const user = users.getByEmail(email);
      if (!user) return null;
      const code = randCode(6);
      const all = load(KEYS.resetCodes, {});
      all[code] = { email, expiry: Date.now() + 15 * 60 * 1000 };
      save(KEYS.resetCodes, all);
      return { code, username: user.username };
    },
    verify(code, newPassword) {
      const all = load(KEYS.resetCodes, {});
      const entry = all[code];
      if (!entry || Date.now() > entry.expiry) return { ok: false, error: 'Invalid or expired reset code.' };
      const user = users.getByEmail(entry.email);
      if (!user) return { ok: false, error: 'User not found.' };
      users.update(user.username, { password: newPassword });
      delete all[code];
      save(KEYS.resetCodes, all);
      return { ok: true };
    },
  };

  // ── attachments ───────────────────────────────────────────────────────────
  const attachments = {
    save(qid, files) {
      const all = load(KEYS.attachments, {});
      all[qid] = files;
      save(KEYS.attachments, all);
    },
    get(qid) {
      return (load(KEYS.attachments, {}))[qid] || [];
    },
  };

  // ── nav helper ────────────────────────────────────────────────────────────
  function renderNav() {
    const cu = auth.currentUser();
    const el = document.getElementById('navbar-placeholder');
    if (!el) return;
    el.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="home.html">SOStudent</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" id="navigationBar">
              <a class="nav-link d-inline" href="home.html"> Home </a>
              ${cu ? `<a class="nav-link d-inline" href="profile.html"> Profile </a>
                      <a class="nav-link d-inline" href="bookmarks.html"> Bookmarks </a>` : ''}
            </li>
          </ul>
        </div>
        <form class="form-inline my-2 my-lg-0 mr-2" onsubmit="return false;">
          <input id="nav-search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" autocomplete="off">
        </form>
        ${cu
          ? `<a class="mx-4" href="#" onclick="SOStudent.auth.logout(); return false;">Logout</a>`
          : `<a class="mx-4" href="login.html">Login</a>`}
      </nav>`;
  }

  function renderFooter() {
    const el = document.getElementById('footer-placeholder');
    if (!el) return;
    el.innerHTML = `
      <footer id="footer" class="bg-light">
        <div class="container">
          <div class="row vcenter">
            <div class="col-xs-6">
              <p>&copy; 2021-2025 SOStudent</p>
            </div>
          </div>
        </div>
      </footer>`;
  }

  function initPage(requireAuth = true) {
    remember.check();
    if (requireAuth && !auth.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    renderNav();
    renderFooter();
    return true;
  }

  return { seed, auth, users, questions, comments, favourites, bookmarks,
           views, recommendations, remember, verification, resetCodes,
           attachments, renderNav, renderFooter, initPage, escHtml };
})();

SOStudent.seed();
