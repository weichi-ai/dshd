/* ============================================================
   DSHD 官网 · 中英双语 / 动画 / Star 统计
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 配置：仓库地址 ---------- */
  var GITHUB_REPO = 'weichi-ai/dshd';

  /* ---------- 文案字典 ---------- */
  var I18N = {
    zh: {
      'nav.download': '下载',
      'nav.github': 'GitHub',
      'nav.community': '社区',
      'hero.badge': '鲸彩世界',
      'hero.title2': '桌面版',
      'hero.tagline': '为热爱探索的你而生',
      'hero.sub': '在本地优雅运行 DeepSeek 的能力，隐私安全、开箱即用，让每一次探索都轻松自在。',
      'hero.win': '下载 Windows 版',
      'hero.mac': '下载 macOS 版',
      'hero.meta': '免费 · 开源 · 支持 Windows / macOS',
      'dl.title': '下载安装',
      'dl.sub': '选择你的平台，开启鲸彩之旅',
      'dl.ver': '最新版本',
      'dl.req': '系统要求',
      'dl.win.title': 'Windows 安装包',
      'dl.win.desc': '专为 Windows 打造的桌面体验，双击安装，即刻出发。',
      'dl.win.req': 'Windows 10 / 11 · 64 位',
      'dl.win.steps': '① 下载 .exe 安装包\n② 双击运行，按提示完成安装\n③ 启动 DeepSeek Harness，开始探索',
      'dl.mac.title': 'macOS 安装包',
      'dl.mac.desc': '为 macOS 精心打磨，拖拽安装，丝滑体验。',
      'dl.mac.req': 'macOS 12+ · Apple Silicon / Intel',
      'dl.mac.steps': '① 下载 .zip 安装包\n② 解压后将 App 拖入 Applications\n③ 启动 DeepSeek Harness，开始探索',
      'dl.btn': '前往 GitHub 下载',
      'dl.note': '安装包托管在 GitHub Releases，点击后选择对应平台的最新版本即可。',
      'gh.title': '开源 · 点亮 Star',
      'gh.sub': '项目完全开源，欢迎 Star、Fork 与贡献',
      'gh.repoDesc': 'DeepSeek Harness 桌面版，为热爱探索的你而生。',
      'gh.stars': 'Stars',
      'gh.step1.t': '打开项目主页',
      'gh.step1.d': '点击下方按钮，进入 DSHD 的 GitHub 仓库',
      'gh.step2.t': '点击右上角 Star',
      'gh.step2.d': '在仓库页面右上角找到 ⭐ Star 按钮，轻轻一点',
      'gh.step3.t': '收藏成功',
      'gh.step3.d': '你的支持是我们最大的动力，更新第一时间送达',
      'gh.btn': '去 GitHub 点亮 Star ⭐',
      'cm.title': '加入社区',
      'cm.sub': '与志同道合的探索者一起交流成长',
      'cm.qq.t': 'QQ 交流群',
      'cm.qq.d': '和同好们畅聊使用心得与探索故事',
      'cm.qq.qr': '二维码占位\n请将图片放到 assets/qr/qq.jpg',
      'cm.qq.num': '群号：',
      'cm.wx.t': '微信群',
      'cm.wx.d': '扫码进群，与鲸彩世界的朋友们相遇',
      'cm.wx.qr': '二维码占位\n请将图片放到 assets/qr/wechat.png',
      'cm.mail.t': '邮箱联系',
      'cm.mail.d': '反馈建议、合作洽谈，欢迎来信',
      'cm.mail.btn': '发送邮件',
      'ft.tag': 'DeepSeek Harness Desktop for everyone',
      'ft.rights': '鲸彩世界',
      'shots.hint': '💡 点击任意截图可查看大图',
      'shots.cap1': '欢迎页 · 开启探索之旅',
      'shots.cap2': '主页 · 深色模式',
      'shots.cap3': '主页 · 浅色模式',
      'shots.cap4': '皮肤设置 · 随心换装',
      'meta.title': 'DeepSeek Harness 桌面版 · 鲸彩世界',
      'meta.desc': 'DeepSeek Harness 桌面版，为热爱探索的你而生。支持 Windows / macOS，开源免费。'
    },
    en: {
      'nav.download': 'Download',
      'nav.github': 'GitHub',
      'nav.community': 'Community',
      'hero.badge': 'Whale Color World',
      'hero.title2': 'Desktop',
      'hero.tagline': 'DeepSeek Harness Desktop, for everyone',
      'hero.sub': 'Run the power of DeepSeek locally — private, secure, ready out of the box. Every exploration feels effortless.',
      'hero.win': 'Download for Windows',
      'hero.mac': 'Download for macOS',
      'hero.meta': 'Free · Open Source · Windows / macOS',
      'dl.title': 'Download',
      'dl.sub': 'Pick your platform and start the journey',
      'dl.ver': 'Latest',
      'dl.req': 'Requirements',
      'dl.win.title': 'Windows Installer',
      'dl.win.desc': 'A desktop experience built for Windows. Double-click and go.',
      'dl.win.req': 'Windows 10 / 11 · 64-bit',
      'dl.win.steps': '1. Download the .exe installer\n2. Run it and follow the setup wizard\n3. Launch DeepSeek Harness and explore',
      'dl.mac.title': 'macOS Installer',
      'dl.mac.desc': 'Polished for macOS. Drag, drop, done.',
      'dl.mac.req': 'macOS 12+ · Apple Silicon / Intel',
      'dl.mac.steps': '1. Download the .zip archive\n2. Unzip and drag the app into Applications\n3. Launch DeepSeek Harness and explore',
      'dl.btn': 'Download on GitHub',
      'dl.note': 'Installers are hosted on GitHub Releases — pick the latest release for your platform.',
      'gh.title': 'Open Source · Star Us',
      'gh.sub': 'Fully open source. Star, fork and contribute!',
      'gh.repoDesc': 'DeepSeek Harness Desktop, for everyone who loves to explore.',
      'gh.stars': 'Stars',
      'gh.step1.t': 'Open the repository',
      'gh.step1.d': 'Hit the button below to visit the DSHD repo on GitHub',
      'gh.step2.t': 'Click the Star button',
      'gh.step2.d': 'Find the ⭐ Star button at the top-right of the page — one click',
      'gh.step3.t': 'Done!',
      'gh.step3.d': 'Your star fuels us. Updates delivered straight to you',
      'gh.btn': 'Star us on GitHub ⭐',
      'cm.title': 'Join the Community',
      'cm.sub': 'Explore and grow with like-minded friends',
      'cm.qq.t': 'QQ Group',
      'cm.qq.d': 'Chat about tips and stories with fellow explorers',
      'cm.qq.qr': 'QR placeholder\nPut the image at assets/qr/qq.png',
      'cm.qq.num': 'Group: ',
      'cm.wx.t': 'WeChat Group',
      'cm.wx.d': 'Scan to join and meet friends in Whale Color World',
      'cm.wx.qr': 'QR placeholder\nPut the image at assets/qr/wechat.png',
      'cm.mail.t': 'Email Us',
      'cm.mail.d': 'Feedback, suggestions and partnerships welcome',
      'cm.mail.btn': 'Send an Email',
      'ft.tag': 'DeepSeek Harness Desktop for everyone',
      'ft.rights': 'Whale Color World',
      'shots.hint': '💡 Click any screenshot to enlarge',
      'shots.cap1': 'Welcome · Start your journey',
      'shots.cap2': 'Home · Dark mode',
      'shots.cap3': 'Home · Light mode',
      'shots.cap4': 'Themes · Make it yours',
      'meta.title': 'DeepSeek Harness Desktop · Whale Color World',
      'meta.desc': 'DeepSeek Harness Desktop, for everyone. Available on Windows & macOS. Open source and free.'
    }
  };

  var GITHUB_URL = 'https://github.com/' + GITHUB_REPO;
  var RELEASES_URL = GITHUB_URL + '/releases';

  /* ---------- 语言初始化 ---------- */
  var saved = null;
  try { saved = localStorage.getItem('dshd-lang'); } catch (e) { /* 忽略 */ }
  var lang = saved || ((navigator.language || 'zh').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en');

  function applyLang(l) {
    lang = l;
    try { localStorage.setItem('dshd-lang', l); } catch (e) { /* 忽略 */ }
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.setAttribute('data-lang', l);

    var dict = I18N[l];
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (dict[key] !== undefined) els[i].textContent = dict[key];
    }

    document.title = dict['meta.title'];
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', dict['meta.desc']);

    var langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.textContent = l === 'zh' ? 'EN' : '中文';
  }

  /* GitHub 链接统一指向配置的仓库 */
  var ghLinks = document.querySelectorAll('a[data-gh]');
  for (var g = 0; g < ghLinks.length; g++) {
    var kind = ghLinks[g].getAttribute('data-gh');
    ghLinks[g].setAttribute('href', kind === 'repo' ? GITHUB_URL : RELEASES_URL);
  }

  /* ---------- 语言切换 ---------- */
  var langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(lang === 'zh' ? 'en' : 'zh');
    });
  }

  /* ---------- 移动端菜单 ---------- */
  var navBtn = document.getElementById('navBtn');
  if (navBtn) {
    navBtn.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }
  var navLinks = document.querySelectorAll('.nav-links a');
  for (var n = 0; n < navLinks.length; n++) {
    navLinks[n].addEventListener('click', function () {
      document.body.classList.remove('nav-open');
    });
  }

  /* ---------- 气泡 ---------- */
  var bubbles = document.getElementById('bubbles');
  if (bubbles) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 22; i++) {
      var b = document.createElement('i');
      b.className = 'bubble';
      b.style.left = (Math.random() * 100).toFixed(1) + '%';
      b.style.setProperty('--dur', (7 + Math.random() * 10).toFixed(1) + 's');
      b.style.setProperty('--delay', (-Math.random() * 14).toFixed(1) + 's');
      var inner = document.createElement('span');
      inner.className = 'bubble-in';
      var size = 4 + Math.random() * 12;
      inner.style.width = size.toFixed(1) + 'px';
      inner.style.height = size.toFixed(1) + 'px';
      b.appendChild(inner);
      frag.appendChild(b);
    }
    bubbles.appendChild(frag);
  }

  /* ---------- 滚动显现 ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('revealed');
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.15 });
    for (var r = 0; r < revealEls.length; r++) io.observe(revealEls[r]);
  } else {
    for (var r2 = 0; r2 < revealEls.length; r2++) revealEls[r2].classList.add('revealed');
  }

  /* ---------- Star 实时统计 ---------- */
  var starNum = document.getElementById('starCountNum');
  var starWrap = document.getElementById('starCount');
  if (starNum && starWrap) {
    fetch('https://api.github.com/repos/' + GITHUB_REPO, { headers: { 'Accept': 'application/vnd.github+json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('repo not found');
        return res.json();
      })
      .then(function (data) {
        var count = (data && data.stargazers_count != null) ? data.stargazers_count : 0;
        starNum.textContent = count.toLocaleString();
        starWrap.classList.add('live');
      })
      .catch(function () {
        starNum.textContent = '--';
      });
  }

  /* ---------- 截图轮播 ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var track = document.getElementById('shotsTrack');
  var carouselEl = document.getElementById('heroCarousel');
  var carPrev = document.getElementById('carPrev');
  var carNext = document.getElementById('carNext');
  var carDots = document.getElementById('carDots');
  var cur = 0;
  var timer = null;

  function goTo(i) {
    cur = (i + slides.length) % slides.length;
    if (track) track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    if (carDots) {
      var dots = carDots.children;
      for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('active', d === cur);
    }
  }
  function nextSlide() { goTo(cur + 1); }
  function prevSlide() { goTo(cur - 1); }
  function startAuto() {
    stopAuto();
    if (slides.length > 1) timer = setInterval(nextSlide, 4500);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function restartAuto() { startAuto(); }

  if (carDots && slides.length) {
    for (var d2 = 0; d2 < slides.length; d2++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.className = 'car-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (idx + 1));
        dot.addEventListener('click', function () { goTo(idx); restartAuto(); });
        carDots.appendChild(dot);
      })(d2);
    }
  }

  if (carPrev) carPrev.addEventListener('click', function () { prevSlide(); restartAuto(); });
  if (carNext) carNext.addEventListener('click', function () { nextSlide(); restartAuto(); });

  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', stopAuto);
    carouselEl.addEventListener('mouseleave', startAuto);
    var touchX = null;
    carouselEl.addEventListener('touchstart', function (e) {
      touchX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });
    carouselEl.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (dx > 40) prevSlide();
      else if (dx < -40) nextSlide();
      touchX = null;
      startAuto();
    }, { passive: true });
  }

  /* ---------- Lightbox 大图 ---------- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbIndex = 0;

  function showShot(i) {
    lbIndex = (i + slides.length) % slides.length;
    var img = slides[lbIndex].querySelector('img');
    var cap = slides[lbIndex].querySelector('.slide-cap span');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = cap ? cap.textContent : '';
  }

  function openLb(i) {
    showShot(i);
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    stopAuto();
  }

  function closeLb() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    startAuto();
  }

  if (lb && slides.length) {
    for (var s = 0; s < slides.length; s++) {
      (function (idx) {
        slides[idx].addEventListener('click', function () { openLb(idx); });
      })(s);
    }
    document.getElementById('lbClose').addEventListener('click', closeLb);
    document.getElementById('lbPrev').addEventListener('click', function (e) {
      e.stopPropagation();
      showShot(lbIndex - 1);
    });
    document.getElementById('lbNext').addEventListener('click', function (e) {
      e.stopPropagation();
      showShot(lbIndex + 1);
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') showShot(lbIndex - 1);
      if (e.key === 'ArrowRight') showShot(lbIndex + 1);
    });
  }

  goTo(0);
  startAuto();

  /* ---------- 年份 ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  applyLang(lang);
})();
