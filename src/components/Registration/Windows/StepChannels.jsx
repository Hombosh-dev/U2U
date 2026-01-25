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
          <span className="regSearchIcon">🔍</span>
        </div>
      </div>

      <div className="regStepContent">
        <div className="regList">
          {filtered.map((c) => {
            const isSelected = selected.includes(c.id);
            return (
              <div className="regChannelRow" key={c.id}>
                <div className="regChannelLeft">
                  <div className="regAvatar" />
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
