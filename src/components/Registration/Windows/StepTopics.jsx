import React, { useMemo, useState } from "react";

function StepTopics({ topics, selected, setSelected, onNext, onBack, onSkip }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return topics;
    return topics.filter((t) => t.label.toLowerCase().includes(s));
  }, [q, topics]);

  const toggle = (id) => {
    if (selected.includes(id)) setSelected(selected.filter((x) => x !== id));
    else setSelected([...selected, id]);
  };

  return (
    <div className="regStep">
      <div className="regStepHeader">
        <div className="regTitle">Що вам подобається?</div>

        <div className="regInfoBox">
          Оберіть ваші вподобання <b>(тематичні добірки)</b> для персоналізованих рекомендацій!
        </div>

        <div className="regSearchWrap">
          <input
            className="regSearch"
            placeholder="Пошук тематичних добірок."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <span className="channels-searchIcon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.5 18.5C14.6421 18.5 18 15.1421 18 11C18 6.85786 14.6421 3.5 10.5 3.5C6.35786 3.5 3 6.85786 3 11C3 15.1421 6.35786 18.5 10.5 18.5Z"
                stroke="#0F3A61"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#0F3A61"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="regStepContent">
        <div className="regScrollArea">
          <div className="regChips">
            {filtered.map((t) => {
              const active = selected.includes(t.id);
              return (
                <button
                  type="button"
                  key={t.id}
                  className={`regChip ${active ? "active" : ""}`}
                  onClick={() => toggle(t.id)}
                >
                  {t.emoji ? `${t.emoji} ` : ""}{t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="regStepActions">
        <button className="regPrimaryBtn" onClick={onNext}>
          Далі
        </button>

        <div className="regBottomRow">
          <button type="button" className="regTextBtn" onClick={onBack}>
            Назад
          </button>

          <button type="button" className="regSkipBtn" onClick={() => onSkip(2)}>
            Пропустити
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepTopics;
