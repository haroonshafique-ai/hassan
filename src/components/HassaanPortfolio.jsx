import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --white: #ffffff;
    --off-white: #f3f7ff;
    --light-gray: #e2ebfb;
    --mid-gray: #bfcbe3;
    --text-muted: #5b6b88;
    --text-body: #334563;
    --text-dark: #0f1e38;
    --accent: #246bff;
    --accent-light: #e3edff;
    --accent-soft: #f1f6ff;
    --teal: #179f98;
    --teal-light: #e7fbf8;
    --page-gutter: clamp(16px, 3vw, 40px);
    --content-max: 1320px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Manrope', sans-serif;
    background:
      radial-gradient(circle at 15% -5%, rgba(36,107,255,0.14), transparent 28%),
      radial-gradient(circle at 88% 0%, rgba(23,159,152,0.12), transparent 22%),
      var(--white);
    color: var(--text-body);
    overflow-x: hidden;
    font-size: 16px;
    line-height: 1.65;
    letter-spacing: 0.1px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 var(--page-gutter);
    height: 76px;
    background: rgba(255,255,255,0.82);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--light-gray);
    animation: nav-slide 0.6s ease both;
  }
  @keyframes nav-slide {
    from { opacity: 0; transform: translateY(-18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .nav-inner {
    max-width: var(--content-max);
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: var(--text-dark);
    letter-spacing: -0.3px;
  }
  .nav-logo-accent { color: var(--accent); }
  .nav-links {
    display: flex;
    gap: 32px;
    align-items: center;
  }
  .nav-links a {
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.2px;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--text-dark); }
  .nav-cta {
    background: var(--accent);
    color: white !important;
    padding: 10px 22px;
    border-radius: 12px;
    font-weight: 500 !important;
    font-size: 13px !important;
    color: white !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
    box-shadow: 0 10px 24px rgba(36,107,255,0.24);
  }
  .nav-cta:hover { transform: translateY(-1px); color: white !important; }
  .nav-toggle {
    display: none;
    width: 42px;
    height: 42px;
    border: 1px solid #d3e1ff;
    border-radius: 12px;
    background: white;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .nav-toggle span {
    display: block;
    width: 18px;
    height: 2px;
    background: var(--text-dark);
    border-radius: 2px;
    position: relative;
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .nav-toggle span::before,
  .nav-toggle span::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    background: var(--text-dark);
    border-radius: 2px;
    transition: transform 0.2s ease, top 0.2s ease;
  }
  .nav-toggle span::before { top: -6px; }
  .nav-toggle span::after { top: 6px; }
  .nav-toggle.open span { background: transparent; }
  .nav-toggle.open span::before { top: 0; transform: rotate(45deg); }
  .nav-toggle.open span::after { top: 0; transform: rotate(-45deg); }
  .mobile-menu {
    display: none;
    position: absolute;
    left: 16px;
    right: 16px;
    top: 84px;
    background: rgba(255,255,255,0.98);
    border: 1px solid var(--light-gray);
    border-radius: 16px;
    box-shadow: 0 16px 28px rgba(17,40,84,0.12);
    padding: 12px;
    z-index: 110;
  }
  .mobile-menu.open { animation: menu-in 0.2s ease both; }
  @keyframes menu-in {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .mobile-menu a {
    display: block;
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 600;
    font-size: 14px;
    padding: 10px 12px;
    border-radius: 10px;
  }
  .mobile-menu a:hover { background: var(--accent-soft); }
  .mobile-menu .mobile-cta {
    background: var(--accent);
    color: white;
    text-align: center;
    margin-top: 6px;
  }

  /* HERO */
  .hero {
    padding: 176px var(--page-gutter) 104px;
    max-width: var(--content-max);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }
  .hero-copy {
    animation: hero-copy-in 0.8s ease both;
  }
  @keyframes hero-copy-in {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: #ecfffb;
    color: var(--teal);
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.8px; text-transform: uppercase;
    padding: 8px 16px; border-radius: 100px;
    margin-bottom: 24px;
    animation: badge-float 3.6s ease-in-out infinite;
  }
  .hero-badge .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--teal);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }
  @keyframes badge-float {
    0%, 100% { transform: translateY(0); box-shadow: 0 6px 16px rgba(17, 184, 164, 0.15); }
    50% { transform: translateY(-4px); box-shadow: 0 10px 22px rgba(17, 184, 164, 0.22); }
  }
  .hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(40px, 5vw, 64px);
    line-height: 1.1;
    color: var(--text-dark);
    letter-spacing: -1.5px;
    margin-bottom: 18px;
  }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero-desc {
    font-size: 17px; line-height: 1.8;
    color: var(--text-muted);
    max-width: 560px;
    margin-bottom: 34px;
  }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .hero-actions a { text-decoration: none; }
  .btn-primary {
    background: var(--accent);
    color: white;
    border: none; cursor: pointer;
    padding: 14px 28px;
    border-radius: 14px;
    font-size: 14px; font-weight: 600;
    font-family: 'Manrope', sans-serif;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 14px 30px rgba(36,107,255,0.28);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 34px rgba(36,107,255,0.34); }
  .btn-outline {
    background: transparent;
    color: var(--text-dark);
    border: 1.5px solid #ccd9f2;
    cursor: pointer;
    padding: 14px 28px;
    border-radius: 14px;
    font-size: 14px; font-weight: 600;
    font-family: 'Manrope', sans-serif;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  /* HERO RIGHT - CARD */
  .hero-card {
    background: linear-gradient(155deg, #f6faff 10%, #ffffff 68%);
    border: 1px solid var(--light-gray);
    border-radius: 30px;
    padding: 40px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 44px rgba(17,40,84,0.08);
    animation: hero-card-in 0.9s ease both, hero-float 4.2s ease-in-out infinite 1.2s;
  }
  @keyframes hero-card-in {
    from { opacity: 0; transform: translateY(28px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes hero-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .hero-card::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(36,107,255,0.16), transparent 70%);
    border-radius: 50%;
  }
  .hero-photo-wrap {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    border: 1px solid #d8e6ff;
    margin-bottom: 20px;
  }
  .hero-photo {
    display: block;
    width: 100%;
    height: 260px;
    object-fit: cover;
  }
  .hero-photo-badge {
    position: absolute;
    left: 14px;
    bottom: 14px;
    background: rgba(18,32,58,0.82);
    color: white;
    font-size: 11px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    font-weight: 700;
    padding: 8px 12px;
    border-radius: 10px;
  }
  .hero-card h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 24px; color: var(--text-dark);
    margin-bottom: 4px;
  }
  .hero-card p { font-size: 13px; color: var(--text-muted); margin-bottom: 24px; }
  .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .stat-box {
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: 14px;
    padding: 16px;
  }
  .stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 26px; color: var(--text-dark);
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label { font-size: 11px; color: var(--text-muted); font-weight: 500; letter-spacing: 0.3px; text-transform: uppercase; }
  .cert-chip {
    margin-top: 14px;
    display: inline-flex; align-items: center; gap: 7px;
    background: linear-gradient(90deg, #e4eeff, #ecfbff);
    color: var(--accent);
    font-size: 12px; font-weight: 600;
    padding: 7px 14px; border-radius: 12px;
    width: 100%;
    justify-content: center;
  }
  .appointment-strip {
    padding: 0 var(--page-gutter) 32px;
  }
  .appointment-inner {
    max-width: var(--content-max);
    margin: 0 auto;
    background: linear-gradient(125deg, #1a60ef, #24a7be);
    border-radius: 26px;
    color: white;
    padding: 28px 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    box-shadow: 0 20px 40px rgba(33, 92, 210, 0.28);
    position: relative;
    overflow: hidden;
  }
  .appointment-inner::after {
    content: "";
    position: absolute;
    top: -120%;
    left: -30%;
    width: 36%;
    height: 340%;
    background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0));
    transform: rotate(20deg);
    animation: shine 4.6s ease-in-out infinite;
  }
  @keyframes shine {
    0%, 68% { left: -40%; }
    100% { left: 120%; }
  }
  .appointment-title {
    font-family: 'DM Serif Display', serif;
    font-size: 31px;
    letter-spacing: -0.6px;
  }
  .appointment-sub {
    margin-top: 4px;
    color: rgba(255,255,255,0.85);
    font-size: 14px;
  }
  .appointment-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .btn-white {
    text-decoration: none;
    background: white;
    color: #1a4ec2;
    border-radius: 12px;
    padding: 11px 18px;
    font-size: 13px;
    font-weight: 700;
  }
  .btn-ghost-white {
    text-decoration: none;
    background: rgba(255,255,255,0.14);
    color: white;
    border: 1px solid rgba(255,255,255,0.4);
    border-radius: 12px;
    padding: 11px 18px;
    font-size: 13px;
    font-weight: 700;
  }

  /* SECTION SHARED */
  section { padding: 90px var(--page-gutter); }
  .section-inner { max-width: var(--content-max); margin: 0 auto; }
  .section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 1.4px;
    text-transform: uppercase; color: var(--accent);
    margin-bottom: 12px;
  }
  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(32px, 4vw, 44px); color: var(--text-dark);
    letter-spacing: -1px;
    line-height: 1.15;
    margin-bottom: 14px;
  }
  .section-sub { font-size: 16px; color: var(--text-muted); max-width: 500px; line-height: 1.7; }
  .about-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 30px;
    align-items: center;
  }
  .about-media {
    border-radius: 26px;
    overflow: hidden;
    border: 1px solid var(--light-gray);
    box-shadow: 0 18px 34px rgba(20,49,103,0.12);
  }
  .about-media img {
    width: 100%;
    height: 100%;
    min-height: 380px;
    object-fit: cover;
    display: block;
  }
  .about-card {
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: 22px;
    padding: 30px;
    box-shadow: 0 12px 30px rgba(20,49,103,0.08);
  }
  .about-card p {
    color: var(--text-muted);
    line-height: 1.75;
    margin-bottom: 16px;
  }
  .about-points {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 8px;
  }
  .about-point {
    background: var(--accent-soft);
    border: 1px solid #d7e6ff;
    border-radius: 12px;
    padding: 11px 12px;
    font-size: 13px;
    color: #2b4f8f;
    font-weight: 600;
  }
  .resume-card {
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: 20px;
    padding: 28px;
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    box-shadow: 0 12px 24px rgba(15,46,98,0.08);
  }
  .resume-title {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    color: var(--text-dark);
    margin-bottom: 8px;
  }
  .resume-sub {
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.7;
    max-width: 720px;
  }
  .resume-btn {
    text-decoration: none;
    background: var(--accent);
    color: white;
    font-size: 14px;
    font-weight: 700;
    border-radius: 12px;
    padding: 13px 20px;
    white-space: nowrap;
    box-shadow: 0 10px 24px rgba(36,107,255,0.24);
  }
  .credentials-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 40px;
  }
  .credential-card {
    background: white;
    border: 1px solid #dbe7ff;
    border-radius: 22px;
    padding: 24px;
    box-shadow: 0 16px 30px rgba(15,46,98,0.08);
    position: relative;
    overflow: hidden;
  }
  .credential-card::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(36,107,255,0.13), transparent 70%);
  }
  .credential-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }
  .credential-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(145deg, #e8f0ff, #f2f8ff);
    border: 1px solid #d7e6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 21px;
  }
  .credential-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--accent);
  }
  .credential-org {
    font-family: 'DM Serif Display', serif;
    font-size: 24px;
    line-height: 1.2;
    color: var(--text-dark);
    margin-bottom: 6px;
  }
  .credential-years {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 600;
    margin-bottom: 10px;
  }
  .credential-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    line-height: 1.2;
    color: var(--text-dark);
    margin-bottom: 9px;
  }
  .credential-note {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.7;
  }

  /* EXPERTISE */
  .expertise-bg { background: linear-gradient(180deg, #f5f9ff, #f8fbff); }
  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 52px;
  }
  .exp-card {
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: 20px;
    padding: 28px;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    cursor: default;
    box-shadow: 0 10px 26px rgba(15,46,98,0.05);
  }
  .exp-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 34px rgba(15,46,98,0.12);
    border-color: var(--accent);
  }
  .exp-card:hover .exp-icon { transform: rotate(-6deg) scale(1.08); }
  .exp-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: var(--accent-soft);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 18px;
    transition: transform 0.3s ease;
  }
  .exp-card h4 {
    font-family: 'DM Serif Display', serif;
    font-size: 18px; color: var(--text-dark);
    margin-bottom: 8px;
  }
  .exp-card p { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin-bottom: 14px; }
  .exp-meter-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7px;
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 600;
  }
  .exp-meter-track {
    height: 8px;
    border-radius: 999px;
    background: #e8efff;
    overflow: hidden;
  }
  .exp-meter-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #2b6cff, #20a3ba);
  }

  /* EXPERIENCE */
  .timeline { margin-top: 52px; position: relative; }
  .timeline::before {
    content: '';
    position: absolute;
    left: 22px; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent), var(--teal), var(--light-gray));
    border-radius: 2px;
  }
  .t-item {
    display: flex; gap: 32px;
    margin-bottom: 42px;
    padding-left: 62px;
    position: relative;
  }
  .t-dot {
    position: absolute; left: 12px; top: 6px;
    width: 22px; height: 22px; border-radius: 50%;
    background: white;
    border: 2.5px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    z-index: 1;
  }
  .t-dot-inner { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
  .t-dot-inner { animation: dot-pulse 2.4s ease-in-out infinite; }
  @keyframes dot-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: 0.55; }
  }
  .t-dot.teal { border-color: var(--teal); }
  .t-dot.teal .t-dot-inner { background: var(--teal); }
  .t-dot.gray { border-color: var(--mid-gray); }
  .t-dot.gray .t-dot-inner { background: var(--mid-gray); }
  .t-content {
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: 20px;
    padding: 24px 28px;
    flex: 1;
    transition: box-shadow 0.2s;
  }
  .t-content:hover { box-shadow: 0 6px 28px rgba(15,22,35,0.07); }
  .t-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 8px; }
  .t-org { font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
  .t-org.teal-text { color: var(--teal); }
  .t-org.gray-text { color: var(--text-muted); }
  .t-title { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--text-dark); }
  .t-period {
    font-size: 12px; font-weight: 600; color: var(--text-muted);
    background: var(--light-gray); padding: 4px 12px; border-radius: 100px;
    white-space: nowrap;
  }
  .t-period.active { background: var(--teal-light); color: var(--teal); }
  .t-desc { font-size: 14px; color: var(--text-muted); line-height: 1.7; }

  /* SKILLS */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 52px;
  }
  .skill-pill {
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: 14px;
    padding: 18px 20px;
    display: flex; align-items: center; gap: 12px;
    transition: border-color 0.2s, background 0.2s;
    cursor: default;
  }
  .skill-pill:hover { border-color: var(--accent); background: var(--accent-soft); }
  .skill-pill:hover { transform: translateY(-3px); }
  .skill-pill { transition: border-color 0.2s, background 0.2s, transform 0.2s; }
  .skill-pill-icon { font-size: 18px; }
  .skill-pill-name { font-size: 14px; font-weight: 600; color: var(--text-dark); }
  /* CONTACT */
  .contact-bg {
    background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
    border-top: 1px solid var(--light-gray);
    border-bottom: 1px solid var(--light-gray);
  }
  .contact-inner {
    max-width: var(--content-max); margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
  }
  .contact-bg .section-label { color: var(--accent); }
  .contact-bg .section-title { color: var(--text-dark); }
  .contact-bg .section-sub { color: var(--text-muted); }
  .contact-items { display: flex; flex-direction: column; gap: 16px; margin-top: 36px; }
  .contact-item {
    display: flex; align-items: center; gap: 16px;
    background: var(--off-white);
    border: 1px solid var(--light-gray);
    border-radius: 12px;
    padding: 16px 20px;
    text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .contact-item:hover { background: var(--accent-soft); transform: translateX(4px); }
  .contact-item-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: white;
    border: 1px solid var(--light-gray);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .contact-item-text { color: var(--text-dark); font-size: 14px; font-weight: 500; }
  .contact-item-sub { color: var(--text-muted); font-size: 12px; margin-top: 2px; }
  .hours-list { margin-top: 8px; display: grid; gap: 6px; }
  .hours-row {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: #ffffff;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12px; color: var(--text-muted);
  }
  .hours-day { font-weight: 600; color: var(--text-dark); }

  .contact-right {
    background: linear-gradient(155deg, #f5f9ff 18%, #ffffff 100%);
    border: 1px solid var(--light-gray);
    border-radius: 26px;
    padding: 40px;
    box-shadow: 0 16px 32px rgba(14,47,104,0.08);
    animation: contact-breathe 4.8s ease-in-out infinite;
  }
  @keyframes contact-breathe {
    0%, 100% { box-shadow: 0 16px 32px rgba(14,47,104,0.08); }
    50% { box-shadow: 0 20px 36px rgba(14,47,104,0.13); }
  }
  .contact-right h3 {
    font-family: 'DM Serif Display', serif;
    color: var(--text-dark); font-size: 22px; margin-bottom: 24px;
  }
  .form-field { margin-bottom: 16px; }
  .form-field input, .form-field textarea {
    width: 100%;
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: 10px;
    padding: 14px 16px;
    color: var(--text-dark);
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }
  .form-field input::placeholder, .form-field textarea::placeholder { color: var(--text-muted); }
  .form-field input:focus, .form-field textarea:focus { border-color: rgba(26,90,255,0.7); }
  .form-submit {
    width: 100%;
    background: var(--accent);
    color: white; border: none; cursor: pointer;
    padding: 15px;
    border-radius: 12px;
    font-family: 'Manrope', sans-serif;
    font-size: 14px; font-weight: 600;
    transition: opacity 0.2s;
  }
  .form-submit:hover { opacity: 0.88; }
  .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .form-error { margin: 10px 0 6px; color: #d94b4b; font-size: 12px; }

  /* FOOTER */
  footer {
    position: relative;
    background: radial-gradient(circle at top right, rgba(26,90,255,0.12), transparent 32%), #ffffff;
    border-top: 1px solid var(--light-gray);
    padding: 54px var(--page-gutter) 26px;
    overflow: hidden;
  }
  footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(70%, 720px);
    height: 1px;
    background: linear-gradient(90deg, rgba(26,90,255,0), rgba(26,90,255,0.45), rgba(26,90,255,0));
  }
  .footer-inner {
    max-width: var(--content-max);
    margin: 0 auto;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 34px;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--light-gray);
  }
  .footer-brand h3 {
    font-family: 'DM Serif Display', serif;
    color: var(--text-dark);
    font-size: 28px;
    margin-bottom: 12px;
    letter-spacing: -0.4px;
  }
  .footer-brand h3 span { color: #6b91ff; }
  .footer-brand p {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.75;
    max-width: 420px;
  }
  .footer-title {
    color: var(--text-dark);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    margin-bottom: 14px;
  }
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .footer-links a {
    text-decoration: none;
    color: var(--text-muted);
    font-size: 14px;
    transition: color 0.2s, transform 0.2s;
    width: fit-content;
  }
  .footer-links a:hover {
    color: var(--text-dark);
    transform: translateX(2px);
  }
  .footer-contact {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .footer-contact a, .footer-contact p {
    color: var(--text-muted);
    font-size: 14px;
    text-decoration: none;
  }
  .footer-contact a:hover { color: var(--text-dark); }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-top: 18px;
  }
  .footer-bottom p {
    font-size: 12.5px;
    color: var(--text-muted);
  }
  .footer-copy {
    width: 100%;
    text-align: center;
  }

  /* FADE IN */
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* LOADER */
  .site-loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.45s ease, visibility 0.45s ease;
  }
  .site-loader.hide {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .loader-icons {
    display: flex;
    align-items: center;
    gap: 26px;
  }
  .loader-icon {
    width: 64px;
    height: 64px;
    color: #246bff;
    animation: loader-bob 1.1s ease-in-out infinite;
    filter: drop-shadow(0 8px 14px rgba(36,107,255,0.2));
    object-fit: contain;
  }
  .loader-icon:nth-child(2) { animation-delay: 0.16s; }
  .loader-icon:nth-child(3) { animation-delay: 0.32s; }
  @keyframes loader-bob {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.85; }
    50% { transform: translateY(-8px) scale(1.05); opacity: 1; }
  }

  @media (max-width: 900px) {
    nav { padding: 0 24px; }
    .nav-links { display: none; }
    .nav-toggle { display: inline-flex; }
    .mobile-menu { display: none; }
    .mobile-menu.open { display: block; }
    .hero { grid-template-columns: 1fr; padding: 120px 24px 60px; gap: 40px; }
    .hero h1 { font-size: 38px; }
    .hero-card { padding: 30px; border-radius: 24px; }
    .hero-photo { height: 220px; }
    .appointment-inner { flex-direction: column; align-items: flex-start; }
    .appointment-title { font-size: 28px; }
    .about-grid { grid-template-columns: 1fr; }
    .about-points { grid-template-columns: 1fr; }
    .resume-card { flex-direction: column; align-items: flex-start; }
    .credentials-grid { grid-template-columns: 1fr; }
    section { padding: 60px 24px; }
    .expertise-grid { grid-template-columns: 1fr 1fr; }
    .skills-grid { grid-template-columns: 1fr 1fr; }
    .contact-inner { grid-template-columns: 1fr; gap: 40px; }
    .contact-right { padding: 30px; }
    .timeline::before { left: 16px; }
    .t-item { padding-left: 52px; gap: 20px; margin-bottom: 30px; }
    .t-dot { left: 6px; }
    .footer-top { grid-template-columns: 1fr; gap: 24px; }
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
    .loader-icons { gap: 18px; }
    .loader-icon { width: 52px; height: 52px; }
    .contact-right { animation: none; }
  }

  @media (max-width: 640px) {
    nav {
      height: 68px;
      padding: 0 16px;
    }
    .mobile-menu {
      top: 74px;
      left: 12px;
      right: 12px;
    }
    section { padding: 48px 16px; }
    .hero { padding: 100px 16px 46px; gap: 24px; }
    .hero h1 {
      font-size: 32px;
      line-height: 1.2;
      letter-spacing: -0.8px;
    }
    .hero-desc { font-size: 15px; line-height: 1.65; margin-bottom: 24px; }
    .hero-actions { width: 100%; }
    .hero-actions .btn-primary,
    .hero-actions .btn-outline {
      width: 100%;
      padding: 13px 18px;
    }
    .hero-card { padding: 20px; border-radius: 18px; }
    .hero-photo { height: 190px; }
    .hero-photo-badge {
      left: 10px;
      bottom: 10px;
      font-size: 10px;
      padding: 7px 10px;
    }
    .stat-row { grid-template-columns: 1fr; gap: 10px; }
    .appointment-strip { padding: 0 16px 20px; }
    .appointment-inner { padding: 20px; border-radius: 18px; }
    .appointment-title { font-size: 24px; }
    .appointment-sub { font-size: 13px; }
    .appointment-actions { width: 100%; }
    .btn-white,
    .btn-ghost-white {
      width: 100%;
      text-align: center;
    }
    .section-title { font-size: 29px; }
    .section-sub { font-size: 15px; }
    .about-media img { min-height: 250px; }
    .about-card { padding: 20px; border-radius: 16px; }
    .resume-card { padding: 20px; border-radius: 16px; }
    .resume-title { font-size: 24px; }
    .resume-btn { width: 100%; text-align: center; }
    .expertise-grid,
    .skills-grid { grid-template-columns: 1fr; }
    .exp-card,
    .review-card { padding: 18px; }
    .timeline::before { display: none; }
    .t-item { padding-left: 0; }
    .t-dot { display: none; }
    .t-content { padding: 18px; border-radius: 14px; }
    .t-title { font-size: 18px; }
    .contact-items { margin-top: 20px; }
    .contact-item { padding: 12px 14px; gap: 12px; }
    .contact-right { padding: 20px; border-radius: 16px; }
    .contact-right h3 { font-size: 20px; margin-bottom: 16px; }
    footer {
      padding: 42px 14px 20px;
      border-top: 1px solid #d2e2ff;
      background:
        radial-gradient(circle at 8% 8%, rgba(36,107,255,0.08), transparent 28%),
        radial-gradient(circle at 96% 0%, rgba(23,159,152,0.08), transparent 22%),
        #f8fbff;
    }
    .footer-inner {
      background: linear-gradient(165deg, rgba(255,255,255,0.98), rgba(244,249,255,0.98));
      border: 1px solid #d8e6ff;
      border-radius: 22px;
      padding: 16px;
      box-shadow:
        0 14px 30px rgba(18,49,107,0.12),
        inset 0 1px 0 rgba(255,255,255,0.85);
      backdrop-filter: blur(8px);
    }
    .footer-top {
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: none;
    }
    .footer-top > div {
      background: linear-gradient(180deg, #ffffff, #f8fbff);
      border: 1px solid #deebff;
      border-radius: 16px;
      padding: 14px;
      box-shadow: 0 8px 18px rgba(20,56,118,0.08);
    }
    .footer-top > div:first-child {
      background: linear-gradient(145deg, #f0f6ff, #ffffff);
      border-color: #cfe0ff;
    }
    .footer-brand h3 { font-size: 22px; margin-bottom: 8px; letter-spacing: -0.3px; }
    .footer-brand p { font-size: 13px; line-height: 1.68; color: #60739a; }
    .footer-title {
      font-size: 10px;
      letter-spacing: 1.3px;
      margin-bottom: 10px;
      color: #51668f;
    }
    .footer-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .footer-links a {
      width: 100%;
      background: #f2f7ff;
      border: 1px solid #dbe8ff;
      border-radius: 10px;
      padding: 8px 10px;
      font-size: 12.5px;
      color: #354f7a;
      transform: none;
    }
    .footer-links a:hover { background: #eaf2ff; color: #1f3d70; }
    .footer-contact {
      gap: 8px;
    }
    .footer-contact a,
    .footer-contact p {
      font-size: 12.5px;
      color: #4f668f;
      background: #f4f8ff;
      border: 1px solid #dfeaff;
      border-radius: 10px;
      padding: 8px 10px;
      margin: 0;
    }
    .footer-contact a:hover { color: #20417a; background: #edf4ff; }
    .footer-bottom {
      gap: 6px;
      border-top: 1px solid #e3edff;
      padding-top: 12px;
      margin-top: 4px;
    }
    .footer-bottom p {
      font-size: 11.5px;
      color: #637898;
      line-height: 1.45;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const expertiseData = [
  { icon: "☢️", title: "CT Imaging", percent: 98, desc: "Advanced computed tomography scanning with high precision for diagnostic accuracy across complex cases." },
  { icon: "🧲", title: "MRI Procedures", percent: 80, desc: "Magnetic resonance imaging for soft tissue, neurological, and musculoskeletal diagnostics." },
  { icon: "🩻", title: "X-Ray Imaging", percent: 99, desc: "High-volume radiographic imaging covering routine and special procedural views with strict safety protocols." },
  { icon: "🪥", title: "OPG Imaging", percent: 95, desc: "Dental panoramic imaging for clear jaw and teeth assessment with consistent positioning and image quality." },
  { icon: "🦷", title: "CBCT Imaging", percent: 97, desc: "Cone beam CT imaging for detailed 3D dental and maxillofacial evaluation with optimized radiation protocols." },
  { icon: "⚕️", title: "Special Procedures", percent: 71, desc: "Helps in special CT and X-ray guided procedures like cryoablation etc." },
];

const credentialsData = [
  {
    type: "Education",
    icon: "🎓",
    org: "The Superior University",
    years: "2020 - 2024",
    title: "Bachelor of Science in Medical Imaging Technology",
    note: "Completed clinical and academic training focused on diagnostic imaging workflows, safety standards, and patient-centered radiology practice.",
  },
  {
    type: "Certification",
    icon: "📜",
    org: "Allied Health Professionals Council (AHPC)",
    years: "Active Registration",
    title: "AHPC Certified Imaging Technologist",
    note: "Recognized professional certification validating clinical competency, ethical standards, and safe imaging practice.",
  },
];

const experienceData = [
  {
    org: "Pakistan Kidney & Liver Institute", orgClass: "", dotClass: "",
    title: "Imaging Technologist", period: "Jan 2026 – Present", active: true,
    desc: "Performing CT and MRI imaging procedures. Responsible for patient preparation, operating advanced imaging equipment, and ensuring high-quality diagnostic results.",
  },
  {
    org: "Jinnah MRI & Body Scan", orgClass: "teal-text", dotClass: "teal",
    title: "Radiologic Technologist", period: "Feb 2026 – Present", active: true,
    desc: "Hands-on experience in general and dental imaging procedures including OPG and CBCT, with strong focus on accuracy, radiation safety, and patient care.",
  },
  {
    org: "Lahore General Hospital", orgClass: "gray-text", dotClass: "gray",
    title: "Clinical Rotation – CT & X-Ray", period: "May 2023 – Oct 2023", active: false,
    desc: "Handled high-volume imaging operations performing X-ray and CT scans for 150+ patients per shift. Maintained strict safety standards and supported efficient workflow.",
  },
  {
    org: "Services Hospital, Lahore", orgClass: "gray-text", dotClass: "gray",
    title: "Clinical Rotation – Emergency Radiology", period: "Jul 2022 – Sep 2022", active: false,
    desc: "Performed X-ray imaging in the Emergency Department, conducting daily routine and special imaging views with precision under high-pressure conditions.",
  },
];

const skillsData = [
  { icon: "🔬", name: "CT Scanning" }, { icon: "🧲", name: "MRI Imaging" },
  { icon: "⚡", name: "X-Ray" }, { icon: "🦷", name: "OPG / CBCT" },
  { icon: "🛡️", name: "Radiation Safety" }, { icon: "❤️", name: "Patient Care" },
  { icon: "📊", name: "Data Analysis" }, { icon: "🔭", name: "Research Skills" },
  { icon: "👥", name: "Team Leadership" }, { icon: "💻", name: "Computer Expert" },
  { icon: "🎓", name: "AHPC Certified" }, { icon: "🏥", name: "Clinical Protocols" },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="fade-in">{children}</div>;
}

export default function Portfolio() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSendMessage = async () => {
    if (sending) return;
    setSendError("");

    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setSendError("Please fill in all fields before sending.");
      return;
    }
    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      setSendError("Email service is not configured yet.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: emailServiceId,
          template_id: emailTemplateId,
          user_id: emailPublicKey,
          template_params: {
            from_name: formName,
            from_email: formEmail,
            reply_to: formEmail,
            message: formMessage
          }
        })
      });
      if (!res.ok) throw new Error("Slack request failed");
      setSent(true);
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    } catch (err) {
      setSendError("Message failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className={`site-loader ${loading ? "" : "hide"}`}>
        <div className="loader-icons" aria-label="Loading website">
          <img
            className="loader-icon"
            src="https://cdn-icons-png.flaticon.com/512/10476/10476316.png"
            alt="Radiation icon"
            loading="eager"
          />
          <img
            className="loader-icon"
            src="https://cdn-icons-png.flaticon.com/512/1988/1988547.png"
            alt="Medical symbol icon"
            loading="eager"
          />
          <img
            className="loader-icon"
            src="https://cdn-icons-png.flaticon.com/512/7077/7077974.png"
            alt="MRI icon"
            loading="eager"
          />
        </div>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <div className="nav-logo">
            <span>Hassaan <span className="nav-logo-accent">Bashir</span></span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#resume">Resume</a>
            <a href="#education">Education</a>
            <a href="#expertise">Expertise</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact" className="nav-cta">Book Visit</a>
          </div>
          <button
            className={`nav-toggle ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#resume" onClick={() => setMenuOpen(false)}>Resume</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>Book Visit</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="dot"></span>
            Available for Opportunities
          </div>
          <h1>Medical <em>Imaging</em> Technologist</h1>
          <p className="hero-desc">
            AHPC Certified specialist in X-ray, CT, MRI, OPG & CBCT imaging — committed to precision diagnostics and exceptional patient care across clinical environments.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Get In Touch
            </button>
            <button className="btn-outline" onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}>
              View Experience
            </button>
            <a href="/Hassaan-MIT-resume.pdf" download className="btn-outline">
              ⬇ Download Resume
            </a>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-photo-wrap">
            <img
              className="hero-photo"
              src="/pic%201.jpg"
              alt="Hassaan Bashir"
            />
            <div className="hero-photo-badge">AHPC Registered</div>
          </div>
          <h3>Hassaan Bashir</h3>
          <p>Imaging Technologist · AHPC Certified</p>
          <div className="stat-row">
            <div className="stat-box">
              <div className="stat-num">150+</div>
              <div className="stat-label">Patients / Shift</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">5+</div>
              <div className="stat-label">Modalities</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">4</div>
              <div className="stat-label">Institutions</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">2+</div>
              <div className="stat-label">Years Active</div>
            </div>
          </div>
          <div className="cert-chip">✅ AHPC Registered Technologist</div>
        </div>
      </div>

      {/* APPOINTMENT STRIP */}
      <div className="appointment-strip">
        <div className="appointment-inner">
          <div>
            <div className="appointment-title">Need Imaging Support?</div>
            <div className="appointment-sub">Available for hospital roles, clinical collaborations, and professional consultations.</div>
          </div>
          <div className="appointment-actions">
            <a className="btn-white" href="#contact">Book Consultation</a>
            <a className="btn-ghost-white" href="tel:+923195048665">Call Now</a>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="section-inner">
          <div className="about-grid">
            <FadeIn>
              <div className="about-media">
                <img
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80"
                  alt="Radiology setup"
                />
              </div>
            </FadeIn>
            <FadeIn delay={90}>
              <div className="about-card">
                <div className="section-label">About</div>
                <div className="section-title">Beyond Imaging — Into Accuracy:</div>
                <p>
                  I am a dedicated Medical Imaging Technologist focused on capturing more than just images. I focus on
                  accuracy, safety, and patient trust. With experience in CT, MRI, X-ray, OPG, and CBCT, I ensure every
                  scan meets the highest standards of diagnostic quality.
                </p>
                <p>
                  Working in fast-paced clinical settings has strengthened my overall abilities.
                </p>
                <div className="about-points">
                  <div className="about-point">High-Volume Patient Handling</div>
                  <div className="about-point">Emergency Department Experience</div>
                  <div className="about-point">Efficient Workflow Management</div>
                  <div className="about-point">Good Patient Communication</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume">
        <div className="section-inner">
          <FadeIn>
            <div className="section-label">Resume</div>
            <div className="resume-card">
              <div>
                <div className="resume-title">Download My PDF Resume</div>
                <p className="resume-sub">
                  Full professional profile including education, hospital experience, clinical rotations,
                  certifications, and core imaging competencies.
                </p>
              </div>
              <a href="/Hassaan-MIT-resume.pdf" download className="resume-btn">
                ⬇ Download Resume
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-inner">
          <FadeIn>
            <div className="section-label">Education & Certification</div>
            <div className="section-title">Academic and Professional Credentials</div>
            <p className="section-sub">A combined view of university education and professional registration credentials.</p>
          </FadeIn>
          <div className="credentials-grid">
            {credentialsData.map((item, i) => (
              <FadeIn key={item.title} delay={i * 90}>
                <div className="credential-card">
                  <div className="credential-head">
                    <div className="credential-icon">{item.icon}</div>
                    <div className="credential-tag">{item.type}</div>
                  </div>
                  <div className="credential-org">{item.org}</div>
                  <div className="credential-years">{item.years}</div>
                  <div className="credential-title">{item.title}</div>
                  <p className="credential-note">{item.note}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="expertise-bg" id="expertise">
        <div className="section-inner">
          <FadeIn>
            <div className="section-label">Expertise</div>
            <div className="section-title">Imaging Modalities</div>
            <p className="section-sub">Proficient in a comprehensive range of diagnostic imaging techniques used across clinical and hospital settings.</p>
          </FadeIn>
          <div className="expertise-grid">
            {expertiseData.map((e, i) => (
              <FadeIn key={e.title} delay={i * 80}>
                <div className="exp-card">
                  <div className="exp-icon">{e.icon}</div>
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                  <div className="exp-meter-head">
                    <span>Proficiency</span>
                    <span>{e.percent}%</span>
                  </div>
                  <div className="exp-meter-track" aria-label={`${e.title} proficiency ${e.percent}%`}>
                    <div className="exp-meter-fill" style={{ width: `${e.percent}%` }}></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-inner">
          <FadeIn>
            <div className="section-label">Career</div>
            <div className="section-title">Clinical Experience</div>
            <p className="section-sub">Hands-on imaging practice across leading hospitals and diagnostic centres in Lahore.</p>
          </FadeIn>
          <div className="timeline">
            {experienceData.map((ex, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="t-item">
                  <div className={`t-dot ${ex.dotClass}`}><div className="t-dot-inner"></div></div>
                  <div className="t-content">
                    <div className="t-header">
                      <div>
                        <div className={`t-org ${ex.orgClass}`}>{ex.org}</div>
                        <div className="t-title">{ex.title}</div>
                      </div>
                      <span className={`t-period ${ex.active ? 'active' : ''}`}>{ex.period}</span>
                    </div>
                    <p className="t-desc">{ex.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="expertise-bg" id="skills">
        <div className="section-inner">
          <FadeIn>
            <div className="section-label">Capabilities</div>
            <div className="section-title">Skills & Competencies</div>
            <p className="section-sub">A blend of clinical, technical, and interpersonal skills developed through education and hands-on practice.</p>
          </FadeIn>
          <div className="skills-grid">
            {skillsData.map((s, i) => (
              <FadeIn key={s.name} delay={i * 60}>
                <div className="skill-pill">
                  <span className="skill-pill-icon">{s.icon}</span>
                  <span className="skill-pill-name">{s.name}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-bg" id="contact">
        <div className="contact-inner">
          <div>
            <div className="section-label">Contact</div>
            <div className="section-title">Let's Connect</div>
            <p className="section-sub">Open to clinical opportunities, collaborations, and professional inquiries.</p>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">⏰</div>
                <div>
                  <div className="contact-item-text">Working Hours</div>
                  <div className="hours-list">
                    <div className="hours-row">
                      <span className="hours-day">Mon - Fri</span>
                      <span className="hours-time">9:00 AM - 11:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Saturday</span>
                      <span className="hours-time">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Sunday</span>
                      <span className="hours-time">Off</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="mailto:hassaanbashir.mit@gmail.com" className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div>
                  <div className="contact-item-text">hassaanbashir.mit@gmail.com</div>
                  <div className="contact-item-sub">Email</div>
                </div>
              </a>
              <a href="tel:+923195048665" className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div>
                  <div className="contact-item-text">+92 319 504 8665</div>
                  <div className="contact-item-sub">Phone / WhatsApp</div>
                </div>
              </a>
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div>
                  <div className="contact-item-text">Lahore, Punjab, Pakistan</div>
                  <div className="contact-item-sub">Location</div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <h3>Send a Message</h3>
            {sent ? (
              <div style={{ color: '#6bffb8', fontSize: 16, textAlign: 'center', padding: '40px 0' }}>
                ✅ Message sent! Hassaan will get back to you soon.
              </div>
            ) : (
              <>
                <div className="form-field">
                  <input
                    placeholder="Your Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <input
                    placeholder="Your Email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  />
                </div>
                {sendError && <div className="form-error">{sendError}</div>}
                <button className="form-submit" onClick={handleSendMessage} disabled={sending}>
                  {sending ? "Sending..." : "Send Message →"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <h3>Hassaan <span>Bashir</span></h3>
              <p>
                AHPC Registered Medical Imaging Technologist focused on precision diagnostics,
                patient-centered care, and safe clinical practice.
              </p>
            </div>
            <div>
              <div className="footer-title">Quick Links</div>
              <div className="footer-links">
                <a href="#about">About</a>
                <a href="#resume">Resume</a>
                <a href="#education">Education</a>
                <a href="#expertise">Expertise</a>
                <a href="#experience">Experience</a>
                <a href="#skills">Skills</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
            <div>
              <div className="footer-title">Contact</div>
              <div className="footer-contact">
                <a href="mailto:hassaanbashir.mit@gmail.com">hassaanbashir.mit@gmail.com</a>
                <a href="tel:+923195048665">+92 319 504 8665</a>
                <p>Lahore, Punjab, Pakistan</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 Hassaan Bashir. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
