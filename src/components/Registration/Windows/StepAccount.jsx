import React from "react";

function StepAccount({
  nickname,
  email,
  password,
  setNickname,
  setEmail,
  setPassword,
  onNext,
  canNext,
  onOpenLogin,
}) {
  return (
    <div className="regStep">
      <div className="regStepHeader">
        <div className="regTitle">Реєстрація</div>

        <div className="regInfoBox">
          Зареєструвавшись на U2U ви зможете коментувати канали, додавати їх в збережені,
          додавати канали, яких ще немає на сайті та отримувати персоналізовані рекомендації!
        </div>
      </div>

      <div className="regStepContent">
        <div className="regLabel">Нікнейм</div>
        <input
          className="regInput"
          placeholder="Придумайте нікнейм."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <div className="regLabel">Email</div>
        <input
          className="regInput"
          placeholder="Ваша електронна пошта."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="regLabel">Повторіть ваш пароль</div>
        <input
          className="regInput"
          placeholder="Ваш пароль."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="regStepActions">
        <button className="regPrimaryBtn" onClick={onNext} disabled={!canNext}>
          Далі
        </button>

        <div className="regBottomText">
          Вже є акаунт?{" "}
          <button
            type="button"
            className="regTextBtn"
            onClick={() => {
              console.log("[REGISTER] User clicked 'Увійти' from StepAccount.");
              if (onOpenLogin) onOpenLogin();
            }}
            style={{ fontWeight: 900 }}
          >
            Увійти
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepAccount;
