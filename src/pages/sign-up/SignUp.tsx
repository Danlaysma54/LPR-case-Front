import React, { useState } from "react";

import "./SignUp.css";
import { useNavigate } from "react-router";

import HideEye from "@/assets/svgs/HideEye";
import OpenEye from "@/assets/svgs/OpenEye";
import { register } from "@/entites/Auth/api/Authorization";
import { UseFormField } from "@/shared/hooks/UseFormField";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const emailField = UseFormField();
  const passwordField = UseFormField();
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    let isError = false;
    if (passwordField.value.length < 8) {
      isError = true;
      setPasswordLengthError(true);
    }
    if (!emailField.value) {
      isError = true;
      setEmailError(true);
    }
    if (!isError) {
      const mail = emailField.value;
      const password = passwordField.value;
      register(mail, password).then((res) => {
        setIsBlocked(false);
        if (res == "CONFLICT") {
          setUserExist(true);
        } else {
          navigate("/login");
        }
        setIsBlocked(true);
        passwordField.value = "";
        emailField.value = "";
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__card">
        <div className="login-page__right-side">
          <h1 className="right-side__name">LPR</h1>
          <div className="right-side__enter">
            <h3 className="right-side__enter-text">Создать аккаунт</h3>
            <form className="right-side__form">
              <div className="form__input-box">
                <label className="input-box__label" htmlFor="email">
                  Псевдоним
                </label>
                <input
                  onClick={() => {
                    setEmailError(false);
                    setUserExist(false);
                  }}
                  type="text"
                  placeholder="Псевдоним"
                  {...emailField}
                  id="email"
                  className={`input-box__input ${emailError ? "password-border__error" : ""}`}
                />
              </div>
              {emailError ? (
                <p className="input-box__error">Неверное имя</p>
              ) : null}
              {userExist ? (
                <p className="input-box__error">
                  Пользователь с таким именем уже существует
                </p>
              ) : null}
              <div className="form__input-box">
                <label className={"input-box__label"} htmlFor="password">
                  Пароль
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  onClick={() => setPasswordLengthError(false)}
                  id="password"
                  {...passwordField}
                  className={`input-box__input ${passwordLengthError ? "password-border__error" : ""}`}
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="password__eye"
                >
                  {showPassword ? <OpenEye /> : <HideEye />}
                </button>
              </div>
              {passwordLengthError ? (
                <p className="input-box__error">Слишком короткий пароль</p>
              ) : null}
              <button
                type="button"
                className="registration-button"
                onClick={handleRegister}
                disabled={
                  emailField.value.length < 4 ||
                  passwordField.value === "" ||
                  passwordField.value.length < 8 ||
                  isBlocked
                }
              >
                {" "}
                Продолжить
              </button>
            </form>
          </div>
          <div className="right-side__to-register">
            <button
              className="to-register__navigate"
              onClick={() => {
                navigate("/login");
              }}
            >
              Войти в аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
