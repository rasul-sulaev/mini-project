import {FormControl} from "../../../components/FormControl/FormControl";
import {useBgImg, useInput, useTitle} from "../../../utils/hooks";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../../../store/slices/users";
import {notification, Spin} from "antd";
import {Link} from "react-router-dom";

export const Registration = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Регистрация');

  /** Установка фоновой картинки на сайт **/
  useBgImg();

  const dispatch = useDispatch();
  const {secondLoading} = useSelector(state => state.users);

  // Управляемые поля ввода
  const login = useInput('', true);
  const password = useInput('', true);


  /** Событие кнопки Зарегистрироваться **/
  const handleRegistration = (e) => {
    e.preventDefault();

    const newUser = {
      login: login.value,
      password: password.value,
      firstName: '',
      lastName: '',
      status: '',
      avatar: '',
      sidebarBgWallpaper: '',
      sidebarVerticalBgWallpaper: '',
    }

    dispatch(createUser(newUser))
      .then(() => {
        notification.success({
          top: 80,
          message: 'Аккаунт успешно зарегистрирован!',
        })
      })
  }

  return (
    <section id="login-page">
      <div className="container">
        <div className="header">
          <h2 className="title" style={{
            paddingBottom: 6,
            borderBottom: '4px solid var(--darkBlue)'
          }}>Регистрация</h2>
        </div>
        <form className="form" onSubmit={handleRegistration}>
          <FormControl
            type="text"
            inputProps={login}
            placeholder="Придумайте логин"
            errorMessage="Заполните поле логин"
          />
          <FormControl
            type="password"
            inputProps={password}
            placeholder="Придумайте пароль"
            errorMessage="Заполните поле пароль"
          />
          <Spin spinning={secondLoading === "pending-createUser"}>
            <button className="btn btn-blue" type="submit">Зарегистироваться</button>
          </Spin>
        </form>
        <p style={{ marginTop: 20 }}>Перейти на страницу <Link to="/login">Входа</Link></p>
      </div>
    </section>
  )
}