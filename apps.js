
(() => {
  'use strict';

  const $ = selector => document.querySelector(selector);
  const STORE = 'https://play.google.com/store/apps/dev?id=8492935961111201169&hl=ar';
  const APPS = [
    {
      title: 'Egyptian Bus Simulator',
      appId: 'com.egyptianbussimulator.game',
      summary: 'عِش تجربة قيادة الأتوبيسات والميكروباص في شوارع مصر بتفاصيل واقعية وتجربة ممتعة.',
      installs: '5K+',
      minInstalls: 5000,
      icon: 'https://play-lh.googleusercontent.com/aHCZBSgPM2Y--w0nOawm_Irk277fR5DaK_rCIj2NaIGH-i6jtJ-9_BupLFbTN-jbsXZBEe-EQdB6k3Mt6XjRzyM=w240-h480'
    },
    {
      title: 'لمه — Lamma',
      appId: 'com.lamma.app',
      summary: 'ألعاب وتحديات جماعية للصحاب والعيلة، بجولات ممتعة يمكن لعبها على جهاز واحد وبدون إنترنت.',
      installs: '1K+',
      minInstalls: 1000,
      icon: 'https://play-lh.googleusercontent.com/rBjyBirFx7-QRRZnYi4ct89yuAr_rSF8swMcCh4b5bS69Cmudo2wOHLsD_Yh9BgLzWw3TUmEsrMPq66Rfkqin88=w240-h480'
    },
    {
      title: 'ختمتي - Khatmati',
      appId: 'com.khatmati.quranapp',
      summary: 'اقرأ القرآن الكريم، تابع تقدم ختمتك، ونظّم وردك اليومي بتصميم عربي مريح.',
      installs: '500+',
      minInstalls: 500,
      icon: 'https://play-lh.googleusercontent.com/UpqovOePksQuQ7fImP4sOW2X8gTqTFPrUX2nywO4aSbt1k90SkUq1-3pWRMRh6snRLHP70AAJ2Az0lkD-zZ1wA=w240-h480'
    }
  ];

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }), { threshold: 0.15 })
    : null;

  function observeVisible() {
    document.querySelectorAll('.rv,footer').forEach(element => {
      if (io) io.observe(element);
      else element.classList.add('in');
    });
  }

  let entered = false;

  function start() {
    if (entered) return;
    entered = true;
    document.body.classList.add('go');

    window.setTimeout(() => {
      $('#intro')?.remove();
      document.body.classList.add('ready');
      observeVisible();
    }, 1400);
  }

  $('#bxb')?.addEventListener('click', start);
  $('#prs')?.addEventListener('click', start);

  window.addEventListener('keydown', event => {
    if (event.code === 'KeyX' || event.key === 'Enter' || event.key === ' ') {
      if (!entered) {
        event.preventDefault();
        start();
      }
    }
  });

  function appCard(app) {
    const link = document.createElement('a');
    link.className = 'app';
    link.href = app.appId
      ? `https://play.google.com/store/apps/details?id=${encodeURIComponent(app.appId)}`
      : STORE;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const top = document.createElement('div');
    top.className = 't';

    const fallback = document.createElement('span');
    fallback.className = 'ico';
    fallback.textContent = (app.title || 'A').trim().charAt(0).toUpperCase();
    top.append(fallback);

    if (app.icon) {
      const icon = document.createElement('img');
      icon.alt = `أيقونة ${app.title}`;
      icon.width = 58;
      icon.height = 58;
      icon.decoding = 'async';
      icon.addEventListener('load', () => fallback.replaceWith(icon), { once: true });
      icon.src = app.icon;
    }

    const name = document.createElement('strong');
    name.textContent = app.title;
    top.append(name);
    link.append(top);

    const description = document.createElement('p');
    description.textContent = app.summary;
    link.append(description);

    const meta = document.createElement('small');
    meta.textContent = `${app.installs}  Google Play ↗`;
    link.append(meta);

    return link;
  }

  function renderApps() {
    const box = $('#apps');
    if (!box) return;

    box.replaceChildren(...APPS.map(appCard));

    const count = APPS.length;
    const countText = count.toLocaleString('ar-EG');

    if ($('#st1')) $('#st1').textContent = countText;
    if ($('#cnt')) $('#cnt').textContent = countText;
    if ($('#st2')) $('#st2').textContent = '—';

    if ($('#st3')) {
      const minDownloads = APPS.reduce((total, app) => total + app.minInstalls, 0);
      $('#st3').textContent = minDownloads
        ? `${minDownloads.toLocaleString('en-US')}+`
        : '—';
    }

    if (!count) {
      const empty = document.createElement('a');
      empty.className = 'btn pr';
      empty.href = STORE;
      empty.target = '_blank';
      empty.rel = 'noopener noreferrer';
      empty.textContent = 'فتح Google Play';
      box.append(empty);
    }
  }

  renderApps();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    start();
  }
})();
