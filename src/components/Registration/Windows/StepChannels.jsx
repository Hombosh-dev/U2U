import React, { useMemo, useState } from "react";

function StepChannels({ channels, selected, setSelected, onBack, onSubmit }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return channels;
    return channels.filter((c) => (c.name + " " + c.meta).toLowerCase().includes(s));
  }, [q, channels]);

  const toggle = (id) => {
    if (selected.includes(id)) setSelected(selected.filter((x) => x !== id));
    else setSelected([...selected, id]);
  };

  return (
    <div className="regStep">
      <div className="regStepHeader">
        <div className="regTitle">Що вам подобається?</div>

        <div className="regInfoBox">
          Оберіть ваші вподобання <b>(канали)</b> для персоналізованих рекомендацій!
        </div>

        <div className="regSearchWrap">
          <input
            className="regSearch"
            placeholder="Шукайте свої улюблені канали"
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
        <div className="regList">
          {filtered.map((c) => {
            const isSelected = selected.includes(c.id);
            return (
              <div className="regChannelRow" key={c.id}>
                <div className="regChannelLeft">
                  <img
                    className="regAvatar"
                    src={c.avatar || "https://placehold.co/44x44"}
                    alt={c.name}
                  />
                  <div className="regChannelText">
                    <div className="regChannelName">{c.name}</div>
                    <div className="regChannelMeta">{c.meta}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="regPlusBtn"
                  onClick={() => toggle(c.id)}
                  aria-label={isSelected ? "Remove" : "Add"}
                >
                  {isSelected ? "✓" : "+"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="regStepActions">
        <button className="regPrimaryBtn" onClick={onSubmit}>
          Зареєструватись
        </button>

        <div className="regBottomRow single">
          <button type="button" className="regTextBtn" onClick={onBack}>
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepChannels;
