// SOStudent - localStorage simulation layer
const SOStudent = (() => {
  const BASE = window.location.pathname.replace(/\/[^/]*$/, '/');
  const KEYS = {
    users: 'ss_users',
    questions: 'ss_questions',
    comments: 'ss_comments',
    favourites: 'ss_favourites',
    currentUser: 'ss_current_user',
    seeded: 'ss_seeded',
  };

  // --- storage helpers ---
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  }
  function loadOne(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  }
  function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function randId(len = 5) {
    return Math.random().toString(36).slice(2, 2 + len).padEnd(len, '0');
  }
  function now() {
    return new Date().toLocaleString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  }

  // --- seed ---
  function seed() {
    if (localStorage.getItem(KEYS.seeded)) return;
    const users = [
      { username: 'alice',   password: 'password123', firstname: 'Alice',   lastname: 'Smith',   email: 'alice@example.com' },
      { username: 'bob',     password: 'password123', firstname: 'Bob',     lastname: 'Jones',   email: 'bob@example.com' },
      { username: 'charlie', password: 'password123', firstname: 'Charlie', lastname: 'Brown',   email: 'charlie@example.com' },
    ];
    const questions = [
      { id: 'q0001', username: 'alice',   subject: 'Algorithms',  question: 'What is the time complexity of quicksort?',                    content: 'I know the average case is O(n log n) but what about worst case and how do we avoid it?',                                    rating: 5, time: '01/05/2023, 09:14:00 am', views: 21 },
      { id: 'q0002', username: 'bob',     subject: 'Web Dev',     question: 'Difference between localStorage and sessionStorage?',          content: 'I keep mixing these up. What are the key differences and when should I use each one?',                                      rating: 4, time: '02/05/2023, 11:30:00 am', views: 14 },
      { id: 'q0003', username: 'charlie', subject: 'Databases',   question: 'When should I use an index on a database column?',             content: 'My queries are getting slow. I read that indexes help but also that they slow down writes. How do I decide?',               rating: 3, time: '03/05/2023, 02:05:00 pm', views: 9  },
      { id: 'q0004', username: 'alice',   subject: 'Linux',       question: 'How do I find which process is using a port?',                  content: 'Port 8080 is in use and I cannot figure out what is holding it. Is there a quick command to check?',                       rating: 6, time: '04/05/2023, 04:45:00 pm', views: 33 },
      { id: 'q0005', username: 'bob',     subject: 'Web Dev',     question: 'What is CORS and why does my API keep blocking requests?',       content: 'I have a React frontend calling a backend on a different port and I keep getting CORS errors in the console.',               rating: 7, time: '05/05/2023, 08:20:00 am', views: 42 },
      { id: 'q0006', username: 'charlie', subject: 'Algorithms',  question: 'How does a hash table handle collisions?',                       content: 'I understand that hash tables map keys to buckets, but what actually happens when two keys hash to the same bucket?',        rating: 2, time: '06/05/2023, 01:10:00 pm', views: 7  },
      { id: 'q0007', username: 'alice',   subject: 'Databases',   question: 'What is the difference between INNER JOIN and LEFT JOIN?',       content: 'I always forget which join includes unmatched rows from which table. Can someone give a clear explanation with an example?', rating: 8, time: '07/05/2023, 10:55:00 am', views: 55 },
      { id: 'q0008', username: 'bob',     subject: 'Linux',       question: 'How do I check disk usage in Linux?',                            content: 'My server is running out of space but I cannot tell which directory is taking up the most. What commands should I use?',    rating: 3, time: '08/05/2023, 03:30:00 pm', views: 18 },
    ];
    const comments = [
      { c_id: 1, question_id: 'q0001', username: 'bob',     comment: 'Worst case is O(n²) when the pivot is always the smallest or largest element. Use median-of-three pivot selection to avoid it.', time: '01/05/2023, 10:00:00 am' },
      { c_id: 2, question_id: 'q0001', username: 'charlie', comment: 'Or just use merge sort if you need guaranteed O(n log n). Quicksort is usually faster in practice though.',                        time: '01/05/2023, 10:30:00 am' },
      { c_id: 3, question_id: 'q0002', username: 'alice',   comment: 'localStorage persists until cleared manually. sessionStorage is wiped when the tab closes. Use localStorage for "remember me" features.', time: '02/05/2023, 12:00:00 pm' },
      { c_id: 4, question_id: 'q0004', username: 'bob',     comment: 'Try: lsof -i :8080   or   ss -tlnp | grep 8080',                                                                                   time: '04/05/2023, 05:00:00 pm' },
      { c_id: 5, question_id: 'q0005', username: 'charlie', comment: 'Add Access-Control-Allow-Origin: * to your backend response headers, or set it to your frontend origin specifically.',               time: '05/05/2023, 09:00:00 am' },
      { c_id: 6, question_id: 'q0005', username: 'alice',   comment: 'Also make sure your backend handles OPTIONS preflight requests for non-simple requests.',                                            time: '05/05/2023, 09:45:00 am' },
      { c_id: 7, question_id: 'q0007', username: 'bob',     comment: 'INNER JOIN: only rows where both tables have a match. LEFT JOIN: all rows from the left table, NULL for missing right-side matches.', time: '07/05/2023, 11:30:00 am' },
      { c_id: 8, question_id: 'q0007', username: 'charlie', comment: 'Think of it as: INNER = intersection, LEFT = everything from the left + matching from the right.',                                   time: '07/05/2023, 12:00:00 pm' },
      { c_id: 9, question_id: 'q0008', username: 'alice',   comment: 'Use "du -sh /*" to check top-level directories, then drill down. "df -h" shows overall disk usage per partition.',                   time: '08/05/2023, 04:00:00 pm' },
      { c_id: 10, question_id: 'q0003', username: 'bob',    comment: 'Rule of thumb: index columns you filter or join on frequently. Avoid indexing columns that change constantly.',                       time: '03/05/2023, 03:00:00 pm' },
    ];
    const favourites = [
      { question_id: 'q0001', username: 'bob' },
      { question_id: 'q0001', username: 'charlie' },
      { question_id: 'q0004', username: 'bob' },
      { question_id: 'q0005', username: 'alice' },
      { question_id: 'q0007', username: 'alice' },
      { question_id: 'q0007', username: 'charlie' },
    ];
    save(KEYS.users, users);
    save(KEYS.questions, questions);
    save(KEYS.comments, comments);
    save(KEYS.favourites, favourites);
    localStorage.setItem(KEYS.seeded, '1');
  }

  // --- auth ---
  const auth = {
    isLoggedIn() { return !!loadOne(KEYS.currentUser); },
    currentUser() { return loadOne(KEYS.currentUser); },
    requireLogin() {
      if (!this.isLoggedIn()) {
        window.location.href = BASE + 'login.html';
        return false;
      }
      return true;
    },
    login(username, password) {
      const users = load(KEYS.users);
      const user = users.find(u => u.username === username && u.password === password);
      if (!user) return false;
      const { password: _p, ...safe } = user;
      save(KEYS.currentUser, safe);
      return true;
    },
    logout() {
      localStorage.removeItem(KEYS.currentUser);
      window.location.href = BASE + 'login.html';
    },
    register({ firstname, lastname, username, email, password }) {
      const users = load(KEYS.users);
      if (users.find(u => u.username === username)) return { ok: false, error: 'Username already taken.' };
      if (users.find(u => u.email === email))       return { ok: false, error: 'Email already registered.' };
      users.push({ username, password, firstname, lastname, email });
      save(KEYS.users, users);
      return { ok: true };
    },
  };

  // --- users ---
  const users = {
    update(username, fields) {
      const all = load(KEYS.users);
      const idx = all.findIndex(u => u.username === username);
      if (idx === -1) return { ok: false, error: 'User not found.' };
      // username change uniqueness check
      if (fields.username && fields.username !== username) {
        if (all.find(u => u.username === fields.username)) return { ok: false, error: 'Username already taken.' };
      }
      all[idx] = { ...all[idx], ...fields };
      save(KEYS.users, all);
      // update current user session
      const cu = auth.currentUser();
      if (cu && cu.username === username) {
        const { password: _p, ...safe } = all[idx];
        save(KEYS.currentUser, safe);
      }
      return { ok: true };
    },
    get(username) {
      return load(KEYS.users).find(u => u.username === username) || null;
    },
  };

  // --- questions ---
  const questions = {
    all() { return load(KEYS.questions).sort((a, b) => b.rating - a.rating); },
    get(id) { return load(KEYS.questions).find(q => q.id === id) || null; },
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
      // clean up comments and favourites
      save(KEYS.comments, load(KEYS.comments).filter(c => c.question_id !== id));
      save(KEYS.favourites, load(KEYS.favourites).filter(f => f.question_id !== id));
      return true;
    },
  };

  // --- comments ---
  const comments = {
    forQuestion(question_id) {
      return load(KEYS.comments).filter(c => c.question_id === question_id);
    },
    add(question_id, comment) {
      const cu = auth.currentUser();
      if (!cu) return null;
      const all = load(KEYS.comments);
      const maxId = all.reduce((m, c) => Math.max(m, c.c_id), 0);
      const c = { c_id: maxId + 1, question_id, username: cu.username, comment, time: now() };
      all.push(c);
      save(KEYS.comments, all);
      return c;
    },
  };

  // --- favourites ---
  const favourites = {
    has(question_id) {
      const cu = auth.currentUser();
      if (!cu) return false;
      return load(KEYS.favourites).some(f => f.question_id === question_id && f.username === cu.username);
    },
    toggle(question_id) {
      const cu = auth.currentUser();
      if (!cu) return;
      const all = load(KEYS.favourites);
      const qs = load(KEYS.questions);
      const qi = qs.findIndex(q => q.id === question_id);
      if (qi === -1) return;
      if (this.has(question_id)) {
        save(KEYS.favourites, all.filter(f => !(f.question_id === question_id && f.username === cu.username)));
        qs[qi].rating = Math.max(0, qs[qi].rating - 1);
      } else {
        all.push({ question_id, username: cu.username });
        save(KEYS.favourites, all);
        qs[qi].rating += 1;
      }
      save(KEYS.questions, qs);
      return qs[qi].rating;
    },
  };

  // --- nav helper ---
  function renderNav() {
    const cu = auth.currentUser();
    const navUser = document.getElementById('nav-username');
    const navProfile = document.getElementById('nav-profile');
    const navLogout = document.getElementById('nav-logout');
    const navLogin = document.getElementById('nav-login');
    if (cu) {
      if (navUser)    navUser.textContent = cu.username;
      if (navProfile) navProfile.style.display = '';
      if (navLogout)  navLogout.style.display = '';
      if (navLogin)   navLogin.style.display = 'none';
    } else {
      if (navProfile) navProfile.style.display = 'none';
      if (navLogout)  navLogout.style.display = 'none';
      if (navLogin)   navLogin.style.display = '';
    }
  }

  return { seed, auth, users, questions, comments, favourites, renderNav, BASE };
})();

// Run seed on every page load
SOStudent.seed();
