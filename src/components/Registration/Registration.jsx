import React, { useEffect, useMemo, useState } from "react";
import "./Registration.css";

import StepAccount from "./Windows/StepAccount";
import StepTopics from "./Windows/StepTopics";
import StepChannels from "./Windows/StepChannels";

const API_BASE = "http://localhost:3001";

function Registration({ open = true, onClose = () => {}, onRegistered = () => {} }) {
  const [step, setStep] = useState(0);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);

  const [topics, setTopics] = useState([]);
  const [channels, setChannels] = useState([]);

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (!open) return;

    const load = async () => {
      try {
        setErrorText("");

        const [catsRes, chRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/channels`),
        ]);

        if (!catsRes.ok || !chRes.ok) throw new Error("Не вдалось завантажити дані для реєстрації");

        const cats = await catsRes.json();
        const chs = await chRes.json();

        setTopics(
          (cats || []).map((c) => ({
            id: String(c.id),
            label: c.name,
            emoji: c.icon || "",
          }))
        );

        setChannels(
          (chs || []).map((c) => ({
            id: String(c.id),
            name: c.name,
            meta: c.category || "",
          }))
        );
      } catch (e) {
        setErrorText(e?.message || "Помилка завантаження даних");
      }
    };

    load();
  }, [open]);

  const canNextStep1 =
    nickname.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0;

  const close = () => onClose();

  function handleSkip(nextStep) {
    setStep(nextStep);
  }

  const submit = () => {
    const payload = {
      nickname: nickname.trim(),
      email: email.trim(),
      password,
      selectedTopics,
      selectedChannels,
    };

    console.log("[REGISTER] Completed registration (demo). Payload:", payload);

    onRegistered(payload);

    close();
  };

  const summaryText = useMemo(() => {
    if (errorText) return errorText;
    if (step === 0) return "Заповніть дані, щоб продовжити.";
    if (step === 1) {
      return selectedTopics.length === 0
        ? "Можна пропустити — але з темами рекомендації кращі!"
        : `Ви обрали ${selectedTopics.length} тем — супер!`;
    }
    return selectedChannels.length === 0
      ? "Не обрали канали — нічого, можна додати пізніше."
      : `Обрано ${selectedChannels.length} каналів — буде що дивитись!`;
  }, [errorText, step, selectedTopics.length, selectedChannels.length]);

  if (!open) return null;

  return (
    <div className="regOverlay" onMouseDown={close}>
      <div className="regCard" onMouseDown={(e) => e.stopPropagation()}>
        <button className="regClose" onClick={close} aria-label="Close" type="button">
          <span className="regCloseIcon">×</span>
        </button>

        <div className="regBody">
          <div className="regViewport">
            <div className="regTrack" style={{ transform: `translateX(-${step * 100}%)` }}>
              <div className="regSlide">
                <StepAccount
                  nickname={nickname}
                  email={email}
                  password={password}
                  setNickname={setNickname}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  onNext={() => setStep(1)}
                  canNext={canNextStep1}
                  onOpenLogin={() => {
                    console.log("[REGISTER] Open login from registration");
                  }}
                />
              </div>

              <div className="regSlide">
                <StepTopics
                  topics={topics}
                  selected={selectedTopics}
                  setSelected={setSelectedTopics}
                  onNext={() => setStep(2)}
                  onBack={() => setStep(0)}
                  onSkip={handleSkip}
                />
              </div>

              <div className="regSlide">
                <StepChannels
                  channels={channels}
                  selected={selectedChannels}
                  setSelected={setSelectedChannels}
                  onBack={() => setStep(1)}
                  onSubmit={submit}
                />
              </div>
            </div>
          </div>

          <div className="regBottomArea">
            <div className="regDots">
              <span className={`regDot ${step === 0 ? "active" : ""}`} />
              <span className={`regDot ${step === 1 ? "active" : ""}`} />
              <span className={`regDot ${step === 2 ? "active" : ""}`} />
            </div>

            <div className="regFooterInfo">{summaryText}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
