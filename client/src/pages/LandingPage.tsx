import { useEffect, useRef, useState } from "react";
import "./LandingPage.css";
import {useNavigate} from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const AI_TOOLS = [
  { name: "Cursor", icon: "⬡", color: "#7c6df2", spend: "$840/mo" },
  { name: "ChatGPT", icon: "◈", color: "#10a37f", spend: "$1,200/mo" },
  { name: "Claude", icon: "◭", color: "#d97706", spend: "$960/mo" },
  { name: "Copilot", icon: "◉", color: "#0078d4", spend: "$720/mo" },
  { name: "Gemini", icon: "✦", color: "#4285f4", spend: "$540/mo" },
  { name: "Windsurf", icon: "◈", color: "#06b6d4", spend: "$480/mo" },
];

const FEATURES = [
  {
    icon: "◎",
    title: "Spend Intelligence",
    description:
      "Real-time visibility across every AI subscription your team holds. Down to the seat, the API call, the dollar.",
    tag: "Live Tracking",
  },
  {
    icon: "⟁",
    title: "AI-Powered Recommendations",
    description:
      "Our model analyzes usage patterns and surfaces specific downgrade, consolidation, and cancellation opportunities.",
    tag: "Predictive",
  },
  {
    icon: "▤",
    title: "Savings Reports",
    description:
      "Auto-generated audit reports with projected savings, utilization scores, and CFO-ready summaries.",
    tag: "Automated",
  },
  {
    icon: "◈",
    title: "Team Optimization",
    description:
      "Identify ghost seats, duplicate tools, and underutilized licenses across departments and cost centers.",
    tag: "Team-Level",
  },
  {
    icon: "⬡",
    title: "Shareable Audits",
    description:
      "One-click export to PDF, Notion, or shareable link. Built for finance reviews and board presentations.",
    tag: "Collaboration",
  },
  {
    icon: "◭",
    title: "Anomaly Detection",
    description:
      "Instant alerts when spend spikes, new subscriptions appear, or usage drops below viability thresholds.",
    tag: "Alerts",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Connect Your Stack",
    description:
      "OAuth integrations with 40+ AI tools. No CSV uploads. No manual entry. Live connection in under 3 minutes.",
    detail: "Cursor · ChatGPT · Claude · Copilot · Gemini · Windsurf + 34 more",
  },
  {
    num: "02",
    title: "Analyze Spending",
    description:
      "Our audit engine maps every seat, API key, and plan tier. Usage vs. cost ratios calculated automatically.",
    detail: "Per-seat · Per-team · Per-project · Enterprise rollup",
  },
  {
    num: "03",
    title: "Capture Savings",
    description:
      "Ranked action list with one-click savings. Track realized savings over time with your audit history.",
    detail: "Average team saves $34K annually in first 90 days",
  },
];

const METRICS = [
  { value: "$2.4M", label: "Audited Spend", sub: "across active accounts" },
  { value: "34%", label: "Avg Savings", sub: "identified per audit" },
  { value: "6 min", label: "Time to Insight", sub: "from connect to report" },
  { value: "1,200+", label: "Teams Audited", sub: "in the last 90 days" },
];

// ─── Particle System ──────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  const bars = [65, 82, 45, 91, 55, 78, 62, 88, 70, 95, 60, 74];

  return (
    <div className="dashboard-mockup">
      <div className="dashboard-chrome">
        <div className="chrome-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="chrome-title">AI Spend Audit — Q2 Report</div>
      </div>

      <div className="dashboard-body">
        {/* Top metric row */}
        <div className="dash-metrics-row">
          <div className="dash-metric">
            <span className="dash-metric-value saving">−$34,240</span>
            <span className="dash-metric-label">Identified Savings</span>
          </div>
          <div className="dash-metric">
            <span className="dash-metric-value">$98,400</span>
            <span className="dash-metric-label">Total Spend</span>
          </div>
          <div className="dash-metric">
            <span className="dash-metric-value warning">12 Tools</span>
            <span className="dash-metric-label">Flagged for Review</span>
          </div>
        </div>

        {/* Chart area */}
        <div className="dash-chart">
          <div className="chart-label">Monthly AI Spend</div>
          <div className="chart-bars">
            {bars.map((h, i) => (
              <div key={i} className="chart-bar-wrap">
                <div
                  className="chart-bar"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }}
                />
              </div>
            ))}
          </div>
          <div className="chart-line-overlay">
            <svg viewBox="0 0 300 80" preserveAspectRatio="none">
              <polyline
                points="12,52 37,33 62,64 87,9 112,44 137,17 162,30 187,10 212,24 237,4 262,32 287,21"
                fill="none"
                stroke="rgba(99,102,241,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="12,52 37,33 62,64 87,9 112,44 137,17 162,30 187,10 212,24 237,4 262,32 287,21 287,80 12,80"
                fill="url(#grad)"
                stroke="none"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(99,102,241,0.25)" />
                  <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Tool rows */}
        <div className="dash-tools">
          {AI_TOOLS.slice(0, 4).map((tool) => (
            <div key={tool.name} className="dash-tool-row">
              <span
                className="dash-tool-icon"
                style={{ color: tool.color }}
              >
                {tool.icon}
              </span>
              <span className="dash-tool-name">{tool.name}</span>
              <div className="dash-tool-bar-wrap">
                <div
                  className="dash-tool-bar"
                  style={{
                    width: `${Math.random() * 40 + 40}%`,
                    background: `${tool.color}44`,
                    borderRight: `2px solid ${tool.color}`,
                  }}
                />
              </div>
              <span className="dash-tool-spend">{tool.spend}</span>
            </div>
          ))}
        </div>

        {/* Bottom badge */}
        <div className="dash-badge">
          <span className="badge-dot pulse-green" />
          Audit complete · 3 optimizations ready
        </div>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
   const navigate = useNavigate();

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">SpendAudit</span>
          <span className="logo-badge">AI</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#impact">Pricing</a>
          <a href="#impact">Docs</a>
        </div>
        <div className="nav-actions">
          {/* <button className="btn-ghost">Sign in</button> */}
          <button className="btn-primary btn-sm" onClick={()=>{navigate("/audit")}}>Start Free Audit</button>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <ParticleField />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="grid-overlay" />

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot pulse-violet" />
            AI spend intelligence platform
          </div>

          <h1 className="hero-headline">
            Your AI tools are
            <br />
            <span className="headline-gradient">costing you more</span>
            <br />
            than you think.
          </h1>

          <p className="hero-sub">
            SpendAudit connects to your entire AI stack, identifies waste, and
            generates a precision savings plan. Most teams find{" "}
            <strong>$20K–$80K in annual savings</strong> within the first audit.
          </p>

          <div className="hero-ctas">
            <button className="btn-primary btn-glow" onClick={()=>{navigate("/audit")}}>
              <span>Start Free Audit</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-outline">
              <span className="play-icon">▶</span>
              Watch 2-min demo
            </button>
          </div>

          <div className="hero-social-proof">
            <div className="proof-avatars">
              {["A", "B", "C", "D"].map((l) => (
                <div key={l} className="avatar">
                  {l}
                </div>
              ))}
            </div>
            <span className="proof-text">
              Trusted by <strong>1,200+ teams</strong> · Avg savings{" "}
              <strong>$34K/yr</strong>
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <DashboardMockup />
          <div className="visual-glow" />
        </div>
      </div>
    </section>
  );
}

// ─── Tools Section ────────────────────────────────────────────────────────────
function ToolsSection() {
  return (
    <section className="tools-section">
      <div className="container">
        <p className="tools-label">
          Audits every tool your team is paying for
        </p>
        <div className="tools-grid">
          {AI_TOOLS.map((tool, i) => (
            <div
              key={tool.name}
              className="tool-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="tool-icon-wrap"
                style={{ color: tool.color, borderColor: `${tool.color}33` }}
              >
                <span className="tool-icon">{tool.icon}</span>
                <div
                  className="tool-glow"
                  style={{ background: `${tool.color}22` }}
                />
              </div>
              <div className="tool-info">
                <span className="tool-name">{tool.name}</span>
                <span className="tool-spend">{tool.spend} avg</span>
              </div>
              <div className="tool-status">
                <span className="status-dot" style={{ background: tool.color }} />
                Connected
              </div>
            </div>
          ))}
        </div>
        <p className="tools-more">+ 34 more AI tools supported</p>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Platform Features</div>
          <h2 className="section-title">
            Built for the era of
            <br />
            <span className="gradient-text">AI tool sprawl.</span>
          </h2>
          <p className="section-sub">
            The average enterprise now pays for 14 AI tools. Most have 40%+
            unused capacity. SpendAudit finds every dollar of waste.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="feature-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="feature-tag">{f.tag}</div>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
              <div className="feature-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section className="hiw-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">
            Audit done in
            <span className="gradient-text"> minutes.</span>
          </h2>
        </div>

        <div className="steps-container">
          <div className="steps-line" />
          {STEPS.map((step, i) => (
            <div key={step.num} className="step-card">
              <div className="step-number">{step.num}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
                <div className="step-detail">{step.detail}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="step-connector">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Impact Section ───────────────────────────────────────────────────────────
function ImpactSection() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="impact-section" id="impact" ref={ref}>
      <div className="blob blob-impact-1" />
      <div className="blob blob-impact-2" />
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Savings Impact</div>
          <h2 className="section-title">
            Real savings.
            <span className="gradient-text"> Real fast.</span>
          </h2>
        </div>

        <div className={`metrics-grid ${animated ? "metrics-visible" : ""}`}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="metric-card"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-sub">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Savings breakdown mockup */}
        <div className="savings-breakdown">
          <div className="breakdown-header">
            <span>Sample Audit · 120-person SaaS company</span>
            <span className="breakdown-total">Total identified: $68,400/yr</span>
          </div>
          {[
            { tool: "Cursor", action: "Downgrade 40 unused Pro seats", save: "$19,200" },
            { tool: "ChatGPT", action: "Consolidate to 1 Team plan", save: "$14,400" },
            { tool: "GitHub Copilot", action: "Remove 28 inactive licenses", save: "$12,600" },
            { tool: "Gemini Advanced", action: "Cancel — fully covered by Workspace", save: "$9,600" },
            { tool: "Windsurf", action: "Switch 15 users to free tier", save: "$8,100" },
          ].map((row) => (
            <div key={row.tool} className="breakdown-row">
              <span className="br-tool">{row.tool}</span>
              <span className="br-action">{row.action}</span>
              <span className="br-save">−{row.save}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section className="final-cta">
      <div className="cta-blob-1" />
      <div className="cta-blob-2" />
      <div className="container">
        <div className="cta-inner">
          <div className="cta-badge">Free · No credit card · 3-min setup</div>
          <h2 className="cta-title">
            Find out what your
            <br />
            AI stack is <span className="gradient-text">actually costing.</span>
          </h2>
          <p className="cta-sub">
            Connect your tools. Get your audit. Start saving. Most teams
            recoup our annual cost in the first 30 days.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary btn-xl btn-glow" onClick={()=>{navigate("/audit")}}>
              Start Free Audit →
            </button>
            <button className="btn-ghost-lg">Talk to sales</button>
          </div>
          <div className="cta-trust">
            <span>✓ SOC 2 Type II</span>
            <span>✓ GDPR compliant</span>
            <span>✓ Read-only access</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="nav-logo">
              <span className="logo-icon">◈</span>
              <span className="logo-text">SpendAudit</span>
              <span className="logo-badge">AI</span>
            </div>
            <p className="footer-tagline">
              Intelligent AI spend management for modern teams.
            </p>
          </div>
          <div className="footer-links">
            {[
              { label: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
              { label: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { label: "Legal", links: ["Privacy", "Terms", "Security", "Status"] },
            ].map((col) => (
              <div key={col.label} className="footer-col">
                <div className="footer-col-label">{col.label}</div>
                {col.links.map((l) => (
                  <a key={l} href="#" className="footer-link">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 SpendAudit, Inc. All rights reserved.</span>
          <span>Built for the AI-first enterprise.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Landing Page (root) ──────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="landing-root">
      <Nav />
      <Hero />
      <ToolsSection />
      <FeaturesSection />
      <HowItWorks />
      <ImpactSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}