import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { AuditResponse } from "../services/auditApi";
import {
  getAuditByShareIdRequest,
} from "../services/auditApi";
import "./ResultsPage.css";

export default function ResultsPage() {
  const location = useLocation();
  const { shareId: shareIdParam } = useParams();
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [audit, setAudit] = useState<AuditResponse | null>(
    (location.state as AuditResponse | null) ?? null
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !location.state
  );
  const [loadError, setLoadError] = useState<string>("");

  useEffect(() => {
    if (location.state) {
      setAudit(location.state as AuditResponse);
      setIsLoading(false);
      setLoadError("");
      return;
    }

    if (!shareIdParam) {
      setIsLoading(false);
      setLoadError("Audit share ID is missing.");
      return;
    }

    const loadAudit = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response =
          await getAuditByShareIdRequest(shareIdParam);

        setAudit(response.data as AuditResponse);
      } catch (error) {
        console.error(error);
        setLoadError(
          "This audit could not be loaded. It may have expired or the link may be invalid."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadAudit();
  }, [location.state, shareIdParam]);

  if (isLoading) {
    return (
      <div className="results-page-shell">
        <div className="glass-card">
          <h1>Loading audit</h1>
          <p>
            Fetching the saved audit from the server so this share link works on any device.
          </p>
        </div>
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="results-page-shell">
        <div className="glass-card">
          <h1>Audit data unavailable</h1>
          <p>
            {loadError ||
              "No live audit state was found. Please return to the audit page and re-run the analysis."}
          </p>
        </div>
      </div>
    );
  }

  const totalMonthlySpend = audit.totals?.totalMonthlySpend ?? 0;
  const totalMonthlySavings = audit.totals?.totalMonthlySavings ?? 0;
  const totalAnnualSavings = audit.totals?.totalAnnualSavings ?? 0;
  const shareId = audit.shareId ?? "--";
  const primaryUseCase = audit.primaryUseCase ?? "mixed";
  const aiSummary =
    audit.aiSummary ??
    "Summary generation is unavailable for this audit.";
  const recommendationList = Array.isArray(audit.recommendations)
    ? audit.recommendations
    : [];
  const isHighSavings =
    totalMonthlySavings > 500;
  const isLowSavings =
    totalMonthlySavings < 100;
  const actionTitle = isHighSavings
    ? "Credex can help capture more of this upside"
    : isLowSavings
      ? "You are already spending fairly well"
      : "Save this audit and revisit the next round of optimizations";
  const actionBody = isHighSavings
    ? "This stack shows meaningful monthly savings potential. Save the report, share it internally, and use Credex as the next conversation when you want to reduce effective AI costs further."
    : isLowSavings
      ? "This audit does not show major waste right now, and that is a good outcome. Save the report and stay on the list so you can be notified when new tool or pricing changes create better opportunities."
      : "There is useful savings potential here, but it is not an urgent procurement event. Save the report, review the recommendations with your team, and come back when your stack changes.";

  const confidenceLabels = recommendationList.reduce(
    (counts: Record<string, number>, item) => {
      const key = item.confidence ?? "low";
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    },
    { high: 0, medium: 0, low: 0 }
  );

  const copyShareId = async () => {
    try {
      await navigator.clipboard.writeText(shareId);
      setCopySuccess("Copied!");
      window.setTimeout(() => setCopySuccess(""), 1800);
    } catch {
      setCopySuccess("Copy failed");
      window.setTimeout(() => setCopySuccess(""), 1800);
    }
  };

  return (
    <div className="results-page-shell">
      <div className="results-hero-wrapper">
        <div className="results-hero-panel">
          <div className="results-hero-top">
            <div>
              <span className="audit-badge">AI Spend Audit</span>
              <h1 className="results-hero-title">
                Financially intelligent AI optimization
              </h1>
              <p className="results-hero-copy">
                Results are driven by backend validation and pricing metadata.
                The platform now shows real recommendation cards, confidence
                signals, and production-ready spend benchmarks.
              </p>
            </div>
            <div className="glass-card" style={{ minWidth: 260 }}>
              <span className="card-label">Share audit</span>
              <div className="share-id-line">
                <p className="share-code">{shareId}</p>
                <button className="copy-button" onClick={copyShareId}>
                  {copySuccess || "Copy ID"}
                </button>
              </div>
            </div>
          </div>

          <div className="results-metrics-grid">
            <div className="glass-card">
              <span className="card-label">Monthly Spend</span>
              <div className="card-value">
                ${totalMonthlySpend.toLocaleString()}
              </div>
              <p className="card-note">
                Total committed spend across configured AI engines.
              </p>
            </div>
            <div className="glass-card">
              <span className="card-label">Monthly Savings</span>
              <div className="card-value">
                ${totalMonthlySavings.toLocaleString()}
              </div>
              <p className="card-note">
                Backend forecast based on validated plan recommendations.
              </p>
            </div>
            <div className="glass-card">
              <span className="card-label">Annual Run-Rate Impact</span>
              <div className="card-value">
                ${totalAnnualSavings.toLocaleString()}
              </div>
              <p className="card-note">
                Projected annual cash recovery from recommended optimizations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="recommendations-section">
        <div className="section-heading">
          <div>
            <h2>Recommendation dashboard</h2>
            <p>
              {recommendationList.length} recommendation
              {recommendationList.length === 1 ? "" : "s"} generated for{" "}
              {primaryUseCase} coverage.
            </p>
          </div>
        </div>

        <div className="recommendation-grid">
          {recommendationList.map((item, index) => (
            <article
              key={`${item.toolName}-${index}`}
              className="rec-card"
            >
              <div className="rec-card-header">
                <div>
                  <strong>{item.toolName}</strong>
                  <div className="card-note">
                    Current plan: {item.currentPlan}
                  </div>
                </div>
                <span className={`rec-badge badge-${item.confidence}`}>
                  {item.confidence?.toUpperCase()}
                </span>
              </div>
              <div className="rec-card-body">
                <p>{item.reason}</p>
                <div className="rec-highlights">
                  <div className="rec-highlight-item">
                    <span>Action</span>
                    <strong>{item.action}</strong>
                  </div>
                  {item.recommendedPlan && (
                    <div className="rec-highlight-item">
                      <span>Suggested tier</span>
                      <strong>{item.recommendedPlan}</strong>
                    </div>
                  )}
                  {item.alternativeTool && (
                    <div className="rec-highlight-item">
                      <span>Alternative</span>
                      <strong>{item.alternativeTool}</strong>
                    </div>
                  )}
                  <div className="rec-highlight-item">
                    <span>Monthly uplift</span>
                    <strong>
                      ${item.monthlySavings?.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="confidence-section">
        <div className="glass-card">
          <div className="section-heading">
            <div>
              <h2>Confidence and reasoning</h2>
              <p>
                Backend recommendation confidence is based on plan validation
                and team fit.
              </p>
            </div>
          </div>
          <div className="rec-highlights">
            <div className="rec-highlight-item">
              <span>High confidence</span>
              <strong>{confidenceLabels.high}</strong>
            </div>
            <div className="rec-highlight-item">
              <span>Medium confidence</span>
              <strong>{confidenceLabels.medium}</strong>
            </div>
            <div className="rec-highlight-item">
              <span>Low confidence</span>
              <strong>{confidenceLabels.low}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="share-section">
        <div className="glass-card" id="summary">
          <div className="section-heading">
            <div>
              <h2>Summary</h2>
              <p>
                Audit validated against backend pricing metadata and current
                team planning.
              </p>
            </div>
          </div>
          <div className="rec-highlights">
            <div className="rec-highlight-item">
              <span>Primary use case</span>
              <strong>{primaryUseCase}</strong>
            </div>
            <div className="rec-highlight-item">
              <span>Tools analyzed</span>
              <strong>{recommendationList.length}</strong>
            </div>
            <div className="rec-highlight-item">
              <span>Record ID</span>
              <strong>{shareId}</strong>
            </div>
          </div>
          <p style={{ marginTop: 20, lineHeight: 1.7 }}>{aiSummary}</p>
        </div>
      </section>

      <section className="cta-section">
        <div
          id="lead-capture"
          className={`glass-card action-card ${
            isHighSavings
              ? "action-high"
              : isLowSavings
                ? "action-low"
                : "action-mid"
          }`}
        >
          <div className="section-heading">
            <div>
              <h2>{actionTitle}</h2>
              <p>{actionBody}</p>
            </div>
          </div>
          <div className="action-card-footer">
            <div className="action-pill-row">
              <span className="action-pill">
                Monthly savings: $
                {totalMonthlySavings.toLocaleString()}
              </span>
              <span className="action-pill">
                Annual impact: $
                {totalAnnualSavings.toLocaleString()}
              </span>
            </div>
            <div className="action-buttons">
              <button className="copy-button" onClick={copyShareId}>
                {copySuccess || "Copy Share ID"}
              </button>
              <a
                className="secondary-action-link"
                href={isHighSavings ? "#lead-capture" : "#summary"}
              >
                {isHighSavings
                  ? "Request follow-up"
                  : isLowSavings
                    ? "Save and monitor"
                    : "Review recommendations"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
