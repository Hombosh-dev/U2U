import React, { useMemo, useState } from "react";
import "./Registration.css";

import StepAccount from "./Windows/StepAccount";
import StepTopics from "./Windows/StepTopics";
import StepChannels from "./Windows/StepChannels";

function Registration({ open = true, onClose = () => {} }) {
  const [step, setStep] = useState(0);

  // form data
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);

  const topics = useMemo(
    () => [
      { id: "en", label: "Англійська мова", emoji: "🇺🇸" },
      { id: "anime", label: "Аніме", emoji: "🌸" },
      { id: "it", label: "Айті", emoji: "💻" },
      { id: "humor", label: "Гумор", emoji: "😂" },
      { id: "design", label: "Дизайн", emoji: "🎨" },
      { id: "kids", label: "Для дітей", emoji: "👶" },
      { id: "games", label: "Ігрові світи та лор", emoji: "🎮" },
      { id: "interview", label: "Інтерв’ю", emoji: "🎙️" },
      { id: "es", label: "Іспанська мова", emoji: "🇪🇸" },
      { id: "history", label: "Історія", emoji: "📜" },
      { id: "covers", label: "Кавери", emoji: "🎤" },
      { id: "movies", label: "Кіно", emoji: "🎬" },
      { id: "books", label: "Книги", emoji: "📚" },
    ],
    []
  );

  const channels = useMemo(
    () => [
      { id: "atomic", name: "ATOMICPROD", meta: "Подорожі, Лайфстайл" },
      { id: "melior", name: "Melior Max", meta: "Ігри, Летсплеї" },
      { id: "merresirin", name: "merresirin", meta: "Музичні кавери, Малювання" },
      { id: "doppio", name: "Doppio Dropscvth…", meta: "Музика, Розваги" },
      { id: "doc", name: "Доктор Шпак", meta: "Освіта, Наука" },
      { id: "tech", name: "Tech UA", meta: "Айті, Огляди" },
    ],
    []
  );

  const canNextStep1 =
    nickname.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0;

  const goNext = () => setStep((s) => Math.min(2, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const close = () => {
    onClose();
    // optionally reset:
    // setStep(0);
  };

  const submit = () => {
    // тут можеш викликати API
    console.log("REGISTER DATA:", {
      nickname,
      email,
      password,
      selectedTopics,
      selectedChannels,
    });
    close();
  };

  function handleSkip(step) {
    setStep(step);
  }

  // маленька “динамічна інфа” внизу, щоб UI мінявся від даних
  const summaryText = useMemo(() => {
    const t = selectedTopics.length;
    const c = selectedChannels.length;

    if (step === 0) {
      if (!nickname && !email) return "Заповніть дані, щоб продовжити.";
      return `Почнемо, ${nickname ? nickname : "користувачу"}!`;
    }
    if (step === 1) {
      if (t === 0) return "Можна пропустити — але з темами рекомендації кращі!";
      return `Ви обрали ${t} ${t === 1 ? "тему" : t < 5 ? "теми" : "тем"} — супер!`;
    }
    // step 2
    if (c === 0) return "Не обрали канали — нічого, можна додати пізніше.";
    return `Обрано ${c} ${c === 1 ? "канал" : c < 5 ? "канали" : "каналів"} — буде що дивитись!`;
  }, [step, nickname, email, selectedTopics.length, selectedChannels.length]);

  if (!open) return null;

  return (
    <div className="regOverlay" onMouseDown={close}>
        <div className="regCard" onMouseDown={(e) => e.stopPropagation()}>
        <button className="regClose" onClick={close} aria-label="Close" type="button">
            <span className="regCloseIcon">×</span>
        </button>

        <div className="regBody">
            {/* SLIDER */}
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
                    onNext={goNext}
                    canNext={canNextStep1}
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
                    onBack={goBack}
                    onSubmit={submit}
                />
                </div>
            </div>
            </div>

            {/* BOTTOM AREA */}
            <div className="regBottomArea">
            <div className="regDots">
                <span className={`regDot ${step === 0 ? "active" : ""}`} />
                <span className={`regDot ${step === 1 ? "active" : ""}`} />
                <span className={`regDot ${step === 2 ? "active" : ""}`} />
            </div>

            <div className={`regFooterInfo ${step === 2 && selectedChannels.length > 0 ? "good" : ""}`}>
                {summaryText}
            </div>
            </div>
        </div>
        </div>
    </div>
    );

}

export default Registration;
