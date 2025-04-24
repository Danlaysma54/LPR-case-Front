import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import "./SignIn.css";

import HideEye from "@/assets/svgs/HideEye";
import OpenEye from "@/assets/svgs/OpenEye";
import { login } from "@/entites/Auth/api/Authorization";
import { useAuthStore } from "@/entites/Auth/store/AuthStore";
import { UseFormField } from "@/shared/hooks/UseFormField";

const LoginPage = () => {
  const images = [
    { imgPath: "firstSlide.svg" },
    { imgPath: "secondSlide.svg" },
  ];
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const maxSteps = images.length;
  const emailField = UseFormField();
  const passwordField = UseFormField();
  const [queryParams] = useSearchParams();
  const setToken = useAuthStore((state) => state.setToken);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const timer = setInterval(() => {}, 6000);
    return () => clearInterval(timer);
  }, [maxSteps, queryParams]);

  const handleLogin = () => {
    login(emailField.value, passwordField.value)
      .then((res) => {
        if (res.token) {
          if (checkboxState) {
            setToken(res.token, "session");
          } else {
            setToken(res.token, "local");
          }
          navigate("/");
        } else {
          setIsError(true);
        }
      })
      .catch(() => setIsError(true));
  };
  return (
    <div className="login-page">
      <div className="login-page__card">
        <div className="login-page__right-side">
          <h1 className="right-side__name">LPR</h1>
          <div className="right-side__enter">
            <h3 className="right-side__enter-text">Логин</h3>
            <form className="right-side__form">
              <div className="form__input-box">
                <label className="input-box__label" htmlFor="email">
                  Псевдоним
                </label>
                <input
                  type="email"
                  placeholder="username"
                  onClick={() => {
                    setIsError(false);
                  }}
                  {...emailField}
                  id="email"
                  className={`input-box__input ${isError ? "password-border__error" : ""}`}
                />
              </div>
              <div className="form__input-box">
                <label className="input-box__label" htmlFor="password">
                  Пароль
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ваш пароль"
                  onClick={() => {
                    setIsError(false);
                  }}
                  id="password"
                  {...passwordField}
                  className={`input-box__input ${isError ? "password-border__error" : ""}`}
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="password__eye"
                >
                  {showPassword ? <OpenEye /> : <HideEye />}
                </button>
              </div>
              {isError ? (
                <p className="input-box__error">Неверный логин или пароль</p>
              ) : null}
              <div className="form__remember-me">
                <input
                  type="checkbox"
                  className="remember-me__checkbox"
                  onClick={() => setCheckboxState(!checkboxState)}
                />
                <p>Запомнить меня</p>
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className="form-input__button"
                disabled={
                  emailField.value.length < 4 || passwordField.value.length < 6
                }
              >
                Войти
              </button>
            </form>
          </div>
          <div className="right-side__to-register">
            <h3 className="to-register__text">Ещё нет аккаунта?</h3>
            <button
              className="to-register__navigate"
              onClick={() => {
                navigate("/registration");
              }}
            >
              Создать аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
