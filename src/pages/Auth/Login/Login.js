import {FormControl} from "../../../components/FormControl/FormControl";
import {useBgImg, useInput, useTitle} from "../../../utils/hooks";
import {useDispatch} from "react-redux";
import {logIn} from "../../../store/slices/auth";
import {fetchUsers} from "../../../store/slices/users";
import {message} from "antd";
import {Link} from "react-router-dom";

export const Login = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Авторизация');

  /** Установка фоновой картинки на сайт **/
  useBgImg();

  const dispatch = useDispatch();

  // Управляемые поля ввода
  const login = useInput('', true);
  const password = useInput('', true);

  /** Событие кнопки Войти **/
	const handleLogIn = (e) => {
		e.preventDefault();

    dispatch(fetchUsers({login: login.value}))
      .then((action) => {
        let user = action.payload;
        if (user) {
          user = user[0];

          if (user.password === password.value) {
            dispatch(logIn(user))
          } else {
            message.error('Пароль не верный!')
          }
        } else {
          message.error('Нет пользователя с указанным логином');
        }
      })
	}

	return (
    <section id="login-page">
      <div className="container">
        <div className="header">
          <h2 className="title" style={{
            paddingBottom: 6,
            borderBottom: '4px solid var(--darkBlue)'
          }}>Авторизация</h2>
        </div>
        <form className="form" onSubmit={handleLogIn}>
          <FormControl
            type="text"
            inputProps={login}
            placeholder="Введите логин"
            errorMessage="Заполните поле логин"
          />
          <FormControl
            type="password"
            inputProps={password}
            placeholder="Введите пароль"
            errorMessage="Заполните поле пароль"
          />
          <button className="btn btn-blue" type="submit">Войти</button>
        </form>
        <p style={{ marginTop: 20 }}>Перейти на страницу <Link to="/registration">Регистрации</Link></p>
      </div>
    </section>
	)
}