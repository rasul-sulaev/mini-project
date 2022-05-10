import {Preloader} from "../../components/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {logIn, logOut, selectUser} from "../../store/slices/auth";
import {notification, Spin} from "antd";
import {useReducer} from "react";
import {deleteUser, editUser, selectUsers} from "../../store/slices/users";
import {useTitle} from "../../utils/hooks";

export const Account = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Настройки профиля');

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const {secondLoading} = useSelector(selectUsers);


  // Управляемый объект (для полей ввода)
  const [userData, setUserData] = useReducer((userData, newUserData) => {
    return {...userData, ...newUserData}
  }, {
    id: user.id,
    login: user.login,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    status: user.status,
    avatar: user.avatar,
    sidebarBgWallpaper: user.sidebarBgWallpaper,
    sidebarVerticalBgWallpaper: user.sidebarVerticalBgWallpaper,
  })


  /** Событие кнопки Сохранить **/
  const handleEditProfile = (e) => {
    e.preventDefault();

    dispatch(editUser(userData))
      .then(() => {
        notification['success']({
          top: 80,
          message: 'Ваши данные сохранены!'
        })

        dispatch(logIn(userData));
      })
  }


  /** Событие кнопки Удалить профиль **/
  const handleDeleteProfile = () => {
    dispatch(deleteUser(user.id))
      .then(() => {
        notification['success']({
          top: 80,
          message: 'Аккаунт удален!'
        })

        dispatch(logOut());
      })
  }


  return (
    <Preloader>
      <section className="account">
        <div className="header" style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <h2 className="title">Настройки профиля</h2>
          <Spin spinning={secondLoading === 'pending-deleteUser'}>
            <button className="btn btn-red" onClick={handleDeleteProfile}>Удалить аккаунт</button>
          </Spin>
        </div>
        <form className="form" style={{width: '100%'}} onSubmit={handleEditProfile}>
          <div className="form-control">
            <label>ID</label>
            <input
                   style={{ backgroundColor: '#ddd' }}
                   disabled
                   value={user.id}
            />
          </div>
          <div className="form-control">
            <label>Логин *</label>
            <input type="text"
                   value={userData.login}
                   onChange={(e) => setUserData({login: e.target.value})}
                   placeholder="Введите логин"
                   required
            />
          </div>
          <div className="form-control">
            <label>Пароль *</label>
            <input type="password"
                   value={userData.password}
                   onChange={(e) => setUserData({password: e.target.value})}
                   placeholder="Введите пароль"
                   required
            />
          </div>
          <div className="form-control">
            <label>Имя</label>
            <input type="text"
                   value={userData.firstName}
                   onChange={(e) => setUserData({firstName: e.target.value})}
                   placeholder="Введите своё имя"
            />
          </div>
          <div className="form-control">
            <label>Фамилия</label>
            <input type="text"
                   value={userData.lastName}
                   onChange={(e) => setUserData({lastName: e.target.value})}
                   placeholder="Введите свою фамилию"
            />
          </div>
          <div className="form-control">
            <label>Статус</label>
            <input type="text"
                   value={userData.status}
                   onChange={(e) => setUserData({status: e.target.value})}
                   placeholder="Введите статус"
            />
          </div>
          <div className="form-control">
            <label>Фото профиля</label>
            <input type="text"
                   value={userData.avatar}
                   onChange={(e) => setUserData({avatar: e.target.value})}
                   placeholder="Введите ссылку на фото профиля"
            />
          </div>
          <div className="form-control">
            <label>Обой профиля</label>
            <input type="text"
                   value={userData.sidebarBgWallpaper}
                   onChange={(e) => setUserData({sidebarBgWallpaper: e.target.value})}
                   placeholder="Введите ссылку на фото обоя профиля"
            />
          </div>
          <div className="form-control">
            <label>Вертикальный обой сайдбара</label>
            <input type="text"
                   value={userData.sidebarVerticalBgWallpaper}
                   onChange={(e) => setUserData({sidebarVerticalBgWallpaper: e.target.value})}
                   placeholder="Введите ссылку на фото вертикального обоя сайдбара"
            />
          </div>
          <div className="btns-block">
            <Spin spinning={secondLoading === 'pending-editUser'}>
              <button className="btn btn-blue">Сохранить</button>
            </Spin>
          </div>
        </form>
      </section>
    </Preloader>
  )
}