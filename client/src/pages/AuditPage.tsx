import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import { runAuditRequest } from "../services/auditApi";
import { 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Code2, 
  PenTool, 
  SearchCode, 
  Cpu, 
  Plus, 
  Trash2, 
  DollarSign, 
  AlertTriangle, 
  Zap, 
  ChevronDown 
} from 'lucide-react';
import './AuditPage.css';

type UseCase = 'coding' | 'writing' | 'research' | 'mixed';

interface SelectedTool {
  id: string;
  name: string;
  plan: string;
  seats: number;
}

const SUPPORTED_TOOLS = [
  { name: 'Cursor', defaultPrice: 20, plans: ['Hobby', 'Pro', 'Pro Plus', 'Ultra', 'Teams', 'Enterprise'] },
  { name: 'ChatGPT', defaultPrice: 20, plans: ['Free', 'ChatGPT Go', 'Plus', 'Pro Mid-Tier', 'Pro High-Tier', 'Business', 'Enterprise'] },
  { name: 'Claude', defaultPrice: 20, plans: ['Free', 'Pro', 'Max 5x', 'Max 20x', 'Team Standard', 'Team Premium', 'Enterprise'] },
  { name: 'GitHub Copilot', defaultPrice: 19, plans: ['Copilot Pro', 'Copilot Pro Plus', 'Copilot Business', 'Copilot Enterprise'] },
  { name: 'Gemini', defaultPrice: 20, plans: ['Gemini Advanced', 'Gemini for Workspace'] },
  { name: 'Windsurf', defaultPrice: 15, plans: ['Free Tier', 'Pro', 'Teams'] },
];

export const AuditPage: React.FC = () => {
  const [useCase, setUseCase] = useState<UseCase>('mixed');
  const [teamSize, setTeamSize] = useState<number>(10);
  const [tools, setTools] = useState<SelectedTool[]>([
    { id: '1', name: 'Cursor', plan: 'Pro', seats: 10 },
    { id: '2', name: 'ChatGPT', plan: 'Business', seats: 8 }
  ]);

  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const addTool = () => {
    const defaultTool = SUPPORTED_TOOLS[0];
    const newTool: SelectedTool = {
      id: crypto.randomUUID(),
      name: defaultTool.name,
      plan: defaultTool.plans[0],
      seats: teamSize
    };
    setTools([...tools, newTool]);
  };

  const removeTool = (id: string) => {
    setTools(tools.filter(t => t.id !== id));
  };

  const updateTool = (id: string, key: keyof SelectedTool, value: any) => {
    setTools(tools.map(t => {
      if (t.id !== id) return t;
      const updated = { ...t, [key]: value };
      
        if (key === 'name') {
          const template = SUPPORTED_TOOLS.find(st => st.name === value);
          if (template) {
            updated.plan = template.plans[0];
          }
        }
      return updated;
    }));
  };

 const handleGenerateAudit = async () => {
  try {
    setIsGenerating(true);

    const payload = {
      teamSize,

      primaryUseCase: useCase,

      tools: tools.map((tool) => ({
        toolName: tool.name,

        currentPlan: tool.plan,

        seats: tool.seats,
      })),
    };

    const response =
      await runAuditRequest(payload);

    const auditData = response.data;

    navigate(
      `/results/${auditData.shareId}`,
      {
        state: auditData,
      }
    );
  } catch (error) {
    console.error(error);

    alert(
      "Failed to generate audit. Please try again."
    );
  } finally {
    setIsGenerating(false);
  }
};

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  } as const;

  return (
    <div className="audit-page-wrapper">
      <div className="spatial-blur-blob blob-one"></div>
      <div className="spatial-blur-blob blob-two"></div>
      <div className="spatial-blur-blob blob-three"></div>
      <div className="cosmic-grid-overlay"></div>

      <header className="audit-navbar">
        <div className="nav-container">
          <button className="back-nav-btn" onClick={() => window.history.back()}>
            <ArrowLeft size={16} />
            <span>Return</span>
          </button>
          
          <div className="brand-core">
            <div className="brand-logo-glow">
              <Layers size={18} className="brand-logo-icon" />
            </div>
            <span className="brand-text">Aether<span className="brand-accent">Audit</span></span>
          </div>

          <div className="system-status-indicator">
            <span className="status-pulse-dot"></span>
            <span className="status-label">AI Audit Engine Online</span>
          </div>
        </div>
      </header>

      <main className="audit-mainframe-layout">
        
        {/* Left Column Controls (Section 01 and Section 02) */}
        <div className="interactive-form-column">
          <motion.section className="audit-hero-section" variants={blockVariants} initial="hidden" animate="visible">
            <div className="badge-pill-container">
              <span className="premium-badge-pill">
                <Sparkles size={12} className="inline-spark" /> Engine Version 4.2
              </span>
            </div>
            <h1 className="audit-main-title">Analyze Your AI Stack</h1>
            <p className="audit-subtext">
              Map infrastructure parameters, identify multi-tenant seed overlaps, and extract hyper-optimized scaling directives instantly.
            </p>
          </motion.section>

          <motion.section className="onboarding-node" variants={blockVariants} initial="hidden" animate="visible">
            <div className="node-header">
              <div className="node-number">01</div>
              <div>
                <h3 className="node-title">Primary Use Case</h3>
                <p className="node-subtitle">Select your team's primary computational layer workload</p>
              </div>
            </div>

            <div className="use-case-matrix">
              {[
                { id: 'coding', label: 'Engineering', sub: 'Cursor, Copilot, Windsurf', icon: <Code2 /> },
                { id: 'writing', label: 'Marketing / Copy', sub: 'Claude, ChatGPT Pro', icon: <PenTool /> },
                { id: 'research', label: 'Analysis & R&D', sub: 'Gemini Ultra, Custom LLMs', icon: <SearchCode /> },
                { id: 'mixed', label: 'Omni-Stack', sub: 'Blended Cross-Departmental', icon: <Cpu /> },
              ].map((item) => (
                <div 
                  key={item.id}
                  className={`use-case-card ${useCase === item.id ? 'active' : ''}`}
                  onClick={() => setUseCase(item.id as UseCase)}
                >
                  <div className="uc-glow-layer"></div>
                  <div className="uc-icon-frame">{item.icon}</div>
                  <div className="uc-meta">
                    <span className="uc-label">{item.label}</span>
                    <span className="uc-sub">{item.sub}</span>
                  </div>
                  {useCase === item.id && (
                    <motion.div className="active-border-ring" layoutId="activeRing" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section className="onboarding-node" variants={blockVariants} initial="hidden" animate="visible">
            <div className="node-header">
              <div className="node-number">02</div>
              <div>
                <h3 className="node-title">Account Infrastructure Scale</h3>
                <p className="node-subtitle">Specify active personnel operating with authenticated seats</p>
              </div>
            </div>

            <div className="team-scale-box">
              <div className="slider-control-row">
                <input 
                  type="range" 
                  min="1" 
                  max="250" 
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="futuristic-slider" 
                />
                <div className="numeric-counter-window">
                  <input 
                    type="number" 
                    value={teamSize} 
                    onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value)))}
                    className="numeric-counter-input"
                  />
                  <span className="counter-unit">Seats</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Right Column Metrics Sidebar Display */}
        <div className="realtime-vector-sidebar-dashboard">
          <div className="sticky-dashboard-glassbox">
            <div className="dashboard-header-block">
              <div className="live-telemetry-badge">
                <span className="telemetry-beacon"></span> LIVE METRIC VECTOR
              </div>
              <h4 className="dashboard-title">Aggregated Projection</h4>
            </div>

            <div className="telemetry-metric-stack">
              <div className="telemetry-metric-card">
                <div className="card-ambient-glow burn-rate"></div>
                <div className="metric-header-row">
                  <span className="metric-label-meta">Configured Seats</span>
                  <DollarSign size={16} className="metric-vector-icon color-burn" />
                </div>
                <div className="metric-numerical-display">
                  {tools.reduce((acc, t) => acc + t.seats, 0).toLocaleString()}
                </div>
                <div className="metric-trend-footer">
                  Total configured seats across {tools.length} tools
                </div>
              </div>

              <div className="telemetry-metric-card highlight-potency">
                <div className="card-ambient-glow optimization-potency"></div>
                <div className="metric-header-row">
                  <span className="metric-label-meta">Input Configuration</span>
                  <Layers size={16} className="metric-vector-icon color-reclaim" />
                </div>
                <div className="metric-numerical-display gradient-text-savings">
                  {tools.length} configured engines
                </div>
                <div className="metric-trend-footer bright-green">
                  Frontend collects current stack inputs only
                </div>
              </div>

              <div className="telemetry-metric-card">
                <div className="card-ambient-glow annual-bleed"></div>
                <div className="metric-header-row">
                  <span className="metric-label-meta">Backend Audit Ready</span>
                  <AlertTriangle size={16} className="metric-vector-icon color-bleed" />
                </div>
                <div className="metric-numerical-display color-critical">
                  Backend validates actual plan names and resolves pricing
                </div>
                <div className="metric-trend-footer text-muted">
                  No frontend savings simulation is performed
                </div>
              </div>
            </div>

            <div className="sidebar-advisory-note">
              <h5 className="advisory-title">Immediate Vector Insight:</h5>
              <p className="advisory-paragraph">
                {tools.length > 1 
                  ? `Overlapping seed configurations identified across multiple workspaces. Tier downgrades for underutilized developer workspaces can immediately recover cash assets.`
                  : `Add additional tool sets to map complete team ecosystem matrix and uncover multi-tenant stacking efficiencies.`}
              </p>
            </div>
          </div>
        </div>

        {/* Section 03 - Placed directly into Main Grid container to stretch 100% full width */}
        <motion.section 
          className="onboarding-node full-bleed-matrix-node" 
          variants={blockVariants} 
          initial="hidden" 
          animate="visible"
        >
          <div className="node-header">
            <div className="node-number">03</div>
            <div>
              <h3 className="node-title">Model Vector Stack Matrix</h3>
              <p className="node-subtitle">Provision configurations for currently running instances</p>
            </div>
          </div>

          <div className="tool-inventory-container">
            <AnimatePresence initial={false}>
              {tools.map((tool, idx) => (
                <motion.div 
                  key={tool.id}
                  className="glass-tool-row"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 20 }}
                  transition={{ type: "spring", duration: 0.4 }}
                >
                  <div className="tool-row-index-badge">
                    <span>#{idx + 1}</span>
                  </div>
                  
                  <div className="form-fields-grid">
                    <div className="input-group-wrapper">
                      <label className="input-field-label">AI Engine Platform</label>
                      <div className="custom-select-anchor">
                        <select 
                          value={tool.name} 
                          onChange={(e) => updateTool(tool.id, 'name', e.target.value)}
                          className="futuristic-input select-field"
                        >
                          {SUPPORTED_TOOLS.map(st => (
                            <option key={st.name} value={st.name}>{st.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="select-arrow-icon" size={14} />
                      </div>
                    </div>

                    <div className="input-group-wrapper">
                      <label className="input-field-label">Subscription Tier</label>
                      <div className="custom-select-anchor">
                        <select 
                          value={tool.plan} 
                          onChange={(e) => updateTool(tool.id, 'plan', e.target.value)}
                          className="futuristic-input select-field"
                        >
                          {(SUPPORTED_TOOLS.find(st => st.name === tool.name)?.plans || ['Pro']).map(p => (
                              <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        <ChevronDown className="select-arrow-icon" size={14} />
                      </div>
                    </div>

                    <div className="input-group-wrapper">
                      <label className="input-field-label">Allocated Seats</label>
                      <input 
                        type="number" 
                        value={tool.seats} 
                        onChange={(e) => updateTool(tool.id, 'seats', Math.max(0, Number(e.target.value)))}
                        className="futuristic-input"
                      />
                    </div>
                  </div>

                  <div className="action-button-alignment-box">
                    <button className="row-purge-action" onClick={() => removeTool(tool.id)} title="Purge Instance">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button className="matrix-append-cta" onClick={addTool}>
              <div className="append-glow-overlay"></div>
              <Plus size={16} />
              <span>Append Component Tool Asset</span>
            </button>
          </div>
        </motion.section>

        {/* Global Action Footer Node spanning across full layout */}
        <div className="full-width-execution-container">
          <button 
            className={`quantum-synthesis-cta ${isGenerating ? 'processing' : ''}`}
            disabled={isGenerating || tools.length === 0}
            onClick={handleGenerateAudit}
          >
            <div className="synthesis-shiny-shimmer"></div>
            {isGenerating ? (
              <>
                <div className="synthesis-spinner"></div>
                <span>Synthesizing Optimization Matrices...</span>
              </>
            ) : (
              <>
                <Zap size={18} className="cta-icon-zap" />
                <span>Generate AI Spend Audit</span>
              </>
            )}
          </button>
          <p className="compliance-fine-print">
            By executing synthesis, current tools and seat counts are matched against backend pricing data for the audit.
          </p>
        </div>

      </main>
    </div>
  );
};
