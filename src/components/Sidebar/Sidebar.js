import './Sidebar.sass';
import {Navigation} from "../Navigation/Navigation";
import {Link} from "react-router-dom";
import placeholderImg from '../../assets/img/placeholder.png';

import {ReactComponent as IconExit} from "../../assets/img/icons/exit.svg";
import {ReactComponent as IconUser} from "../../assets/img/icons/user.svg";
import {ReactComponent as IconEditPen} from "../../assets/img/icons/edit-pen.svg";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectIsLoggedIn, selectUser} from "../../store/slices/auth";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <aside className="sidebar">
      {isLoggedIn ? (
        <>
          <div className="user"
             style={{
               backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${user.sidebarBgWallpaper})`
             }}
          >
            <img className="user-img" src={user.avatar || placeholderImg} alt="Аватарка" onError={(e) => e.target.src = placeholderImg} />
            <p className="user-name">{(user.firstName || user.lastName) ? `${user.firstName} ${user.lastName}` : user.login}</p>
            <p className="user-status">{user.status}</p>
            <div className="user-btns">
              <button className="u-btn exit" onClick={() => dispatch(logOut())} title="Выйти">
                <IconExit width={15} height={15} fill={'#fff'} />
              </button>
              <Link className="u-btn auth" to="/account" title="Аккаунт">
                <IconEditPen width={15} height={15} fill={'#fff'} />
              </Link>
            </div>
          </div>
          <div className="sidebar-container"
               style={{
                 backgroundImage: `url(${user.sidebarVerticalBgWallpaper})`
               }}
          >
            <div className="sidebar__widget" id="menu">
              <Navigation icons={true} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="user">
            <img className="user-img" src="https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png" alt="Аватарка"/>
            <p className="user-name">Авторизуйтесь</p>
            <p className="user-status">чтобы воспользоваться всеми функциями</p>
            <div className="user-btns">
              <Link className="u-btn auth" to="/login" title="Войти">
                <IconUser width={15} height={15} fill={'#fff'} />
              </Link>
            </div>
          </div>
          <div className="sidebar-container">
            <div className="sidebar__widget" id="menu">
              <Navigation icons={true} />
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

export default Sidebar;