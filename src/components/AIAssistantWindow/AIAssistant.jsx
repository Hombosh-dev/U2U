import React, { useMemo, useState } from "react";
import "./AIAssistant.css";

function AIAssistant({ open, onClose, onSend, onTemplate }) {
  const templates = useMemo(
    () => [
      { id: "stalker", label: "Летсплеєри по S.T.A.L.K.E.R." },
      { id: "personal", label: "Персоналізовані рекомендації" },
      { id: "cleanup", label: "Очистити підписки від російського*", starred: true },
      { id: "analyze", label: "Аналізувати мій YouTube для рекомендацій*", starred: true },
    ],
    []
  );

  const [text, setText] = useState("");

  if (!open) return null;

  const send = () => {
    const msg = text.trim();
    if (!msg) return;
    if (onSend) onSend(msg);
    setText("");
  };

  const handleTemplate = (t) => {
    if (onTemplate) onTemplate(t);
    // опціонально підставляємо в інпут
    setText(t.label.replace("*", ""));
  };

  return (
    <>
      <div className="aiOverlay" onMouseDown={onClose} />

      <div className="aiCard" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="false">
        <button className="aiClose" type="button" onClick={onClose} aria-label="Close">
          <span className="aiCloseIcon">×</span>
        </button>

        <div className="aiHeader">AI помічник</div>

        <div className="aiBubble">
          <div className="aiBubbleTitle">
            <span className="aiDot" />
            <span className="aiName">Помічник</span>
            <span className="aiTime">11:34</span>
          </div>

          <div className="aiBubbleText">
            Вітаю!
            <br />
            Я ваш персональний помічник.
            <br />
            Допоможу знайти україномовний контент, який відповідає вашим вподобанням.
            Напишіть запит або оберіть шаблон — і разом відкриємо щось нове!
          </div>
        </div>

        <div className="aiTemplates">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              className="aiTemplateBtn"
              onClick={() => handleTemplate(t)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="aiFootnote">
          *Потрібна авторизація через YouTube
          <br />
          для деяких функцій!
        </div>

        <div className="aiInputRow">
          <input
            className="aiInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Введіть повідомлення."
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />

          <button type="button" className="aiSend" onClick={send} aria-label="Send">
            <span className="aiSendIcon">➤</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AIAssistant;
