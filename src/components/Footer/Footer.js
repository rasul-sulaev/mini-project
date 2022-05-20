import './Footer.sass';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectIsLoggedIn} from "../../store/slices/auth";

export const Footer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer__widget">
            <p className="footer__widget-title">Ваш аккаунт</p>
            <div className="footer__widget-content">
              <ul>
                {isLoggedIn ? (
                  <>
                    <li><Link to="/my-posts">Мои посты</Link></li>
                    <li><a onClick={() => dispatch(logOut())}>Выйти</a></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login">Войти</Link></li>
                    <li><Link to="/registration">Регистрация</Link></li>
                  </>
                ) }
              </ul>
            </div>
          </div>
          <div className="footer__widget">
            <p className="footer__widget-title">Разделы</p>
            <div className="footer__widget-content">
              <ul>
                <li>Ссылка 1</li>
                <li>Ссылка 2</li>
                <li>Ссылка 3</li>
                <li>Ссылка 4</li>
                <li>Ссылка 5</li>
              </ul>
            </div>
          </div>
          <div className="footer__widget">
            <p className="footer__widget-title">Информация</p>
            <div className="footer__widget-content">
              <ul>
                <li>Ссылка 1</li>
                <li>Ссылка 2</li>
                <li>Ссылка 3</li>
                <li>Ссылка 4</li>
                <li>Ссылка 5</li>
              </ul>
            </div>
          </div>
          <div className="footer__widget">
            <p className="footer__widget-title">Услуги</p>
            <div className="footer__widget-content">
              <ul>
                <li>Ссылка 1</li>
                <li>Ссылка 2</li>
                <li>Ссылка 3</li>
                <li>Ссылка 4</li>
                <li>Ссылка 5</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-bottom__copy">Copyright &copy; {new Date().getFullYear()}</p>
          <div className="footer-bottom__soc-list">
            <a className="soc-icon soc-icon-github" href="https://github.com/rasul_sulaev" target="_blank" rel="noreferrer" title="Instagram"></a>
            <a className="soc-icon soc-icon-tg" href="https://t.me/Rasul_Mountain" target="_blank" rel="noreferrer" title="Telegram"></a>
            <a className="soc-icon soc-icon-vk" href="https://vk.com/rasul_sulaev" target="_blank" rel="noreferrer" title="Vkontakte"></a>
            <a className="soc-icon soc-icon-inst" href="https://instagram.com/rasul_sulaev" target="_blank" rel="noreferrer" title="Instagram"></a>
          </div>
        </div>
      </div>
    </footer>
  )
}