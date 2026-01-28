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
          <span className="regSearchIcon">🔍</span>
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
