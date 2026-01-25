import React, { useEffect, useMemo, useState } from "react";
import "./FiltersPanel.css";

const DEFAULT_FILTERS = {
  topics: [],
  language: {
    onlyUA: false,
    dubbedUA: false,
  },
  duration: null, // "short" | "mid" | "long" | null
};

function FiltersPanel({
  open,
  value,
  onClose,
  onApply,
  onReset,
  resultsCount = 10,
}) {
  const topics = useMemo(
    () => [
      { id: "education", label: "освіта" },
      { id: "humor", label: "гумор" },
      { id: "travel", label: "подорожі" },
      { id: "music", label: "музика" },
      { id: "tech", label: "технології" },
      { id: "gaming", label: "геймінг" },
      { id: "cooking", label: "кулінарія" },
      { id: "lifestyle", label: "лайфстайл" },
      { id: "art", label: "мистецтво" },
      { id: "science", label: "новини та аналітика" },
      { id: "history", label: "історія та документалістика" },
      { id: "diy", label: "DIY" },
    ],
    []
  );

  const [draft, setDraft] = useState(value || DEFAULT_FILTERS);

  useEffect(() => {
    if (open) setDraft(value || DEFAULT_FILTERS);
  }, [open, value]);

  if (!open) return null;

  const toggleTopic = (id) => {
    setDraft((prev) => {
      const has = prev.topics.includes(id);
      return {
        ...prev,
        topics: has ? prev.topics.filter((x) => x !== id) : [...prev.topics, id],
      };
    });
  };

  const setLang = (key) => {
    setDraft((prev) => ({
      ...prev,
      language: { ...prev.language, [key]: !prev.language[key] },
    }));
  };

  const setDuration = (key) => {
    setDraft((prev) => ({
      ...prev,
      duration: prev.duration === key ? null : key,
    }));
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft(DEFAULT_FILTERS);
    if (onReset) onReset(DEFAULT_FILTERS);
  };

  return (
    <>
      {/* Прозорий overlay: фон НЕ змінюємо, тільки закриття по кліку поза панеллю */}
      <div className="fltOverlay" onMouseDown={onClose} />

      <div
        className="fltPanel"
        role="dialog"
        aria-modal="false"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="fltHeader">
          <div className="fltTitle">Фільтри</div>

          <button type="button" className="fltClose" onClick={onClose} aria-label="Close">
            <span className="fltCloseIcon">×</span>
          </button>
        </div>

        {/* ✅ Скрол-зона: саме тут “вибори”, щоб панель не роздувалась */}
        <div className="fltContent">
          {/* ТЕМАТИКА */}
          <div className="fltSection">
            <div className="fltSectionTitle">Тематка</div>

            <div className="fltChips">
              {topics.map((t) => {
                const active = draft.topics.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`fltChip ${active ? "active" : ""}`}
                    onClick={() => toggleTopic(t.id)}
                  >
                    <span className="fltChipText">{t.label}</span>
                    <span className="fltChipPlus">{active ? "✓" : "+"}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* МОВА */}
          <div className="fltSection">
            <div className="fltSectionTitle">Мова</div>

            <label className="fltCheckRow">
              <input
                type="checkbox"
                checked={draft.language.onlyUA}
                onChange={() => setLang("onlyUA")}
              />
              <span>Тільки українська</span>
            </label>

            <label className="fltCheckRow">
              <input
                type="checkbox"
                checked={draft.language.dubbedUA}
                onChange={() => setLang("dubbedUA")}
              />
              <span>Дубльовані (з українською)</span>
            </label>
          </div>

          {/* ТРИВАЛІСТЬ */}
          <div className="fltSection">
            <div className="fltSectionTitle">Тривалість відео (в середньому)</div>

            <label className="fltCheckRow">
              <input
                type="checkbox"
                checked={draft.duration === "short"}
                onChange={() => setDuration("short")}
              />
              <span>Короткі (до 10 хвилин)</span>
            </label>

            <label className="fltCheckRow">
              <input
                type="checkbox"
                checked={draft.duration === "mid"}
                onChange={() => setDuration("mid")}
              />
              <span>Середні (10–30 хвилин)</span>
            </label>

            <label className="fltCheckRow">
              <input
                type="checkbox"
                checked={draft.duration === "long"}
                onChange={() => setDuration("long")}
              />
              <span>Довгі (більше 30 хвилин)</span>
            </label>
          </div>
        </div>

        {/* кнопки — поза скролом */}
        <button type="button" className="fltApply" onClick={handleApply}>
          Показати {resultsCount} каналів
        </button>

        <button type="button" className="fltReset" onClick={handleReset}>
          Скинути
        </button>
      </div>
    </>
  );
}

export default FiltersPanel;
export { DEFAULT_FILTERS };
