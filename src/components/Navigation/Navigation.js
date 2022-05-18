import './Navigation.sass';
import {NavLink} from "react-router-dom";
import {ReactComponent as IconHome} from "../../assets/img/icons/home.svg"
import {ReactComponent as IconBlog} from "../../assets/img/icons/blog.svg"
import {ReactComponent as IconHeart} from "../../assets/img/icons/heart-plain.svg"
import {ReactComponent as IconSettings} from "../../assets/img/icons/settings.svg"
import {ReactComponent as IconBlogPen} from "../../assets/img/icons/blog-create-post.svg"
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggedIn, selectUser} from "../../store/slices/auth";
import {useEffect} from "react";
import {fetchPosts, selectPosts} from "../../store/slices/posts";
import {Badge} from "antd";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const {data: posts, favorites} = useSelector(selectPosts);
  const user = useSelector(selectUser);

  /** Посты пользователя **/
  const userPosts = posts.filter(post => post.userId === user?.id);

  useEffect(() => {
    if (posts !== null) {
      dispatch(fetchPosts())
    }
  }, [dispatch])

  return (
    <nav className="menu">
      <NavLink className="menu__item" to="/">
        <IconHome width={15} height={15} />
        Главная
      </NavLink>
      <NavLink className="menu__item" to="blog">
        <IconBlog width={15} height={15} />
        Блог
      </NavLink>
      {isLoggedIn && (
        <NavLink className="menu__item" to="my-posts">
          <IconBlogPen width={15} height={15} />
          Мои посты
          <Badge
            style={{ backgroundColor: 'rgba(200,200,200, .25)' }}
            overflowCount={99}
            count={userPosts?.length}
          />
        </NavLink>
      )}
      <NavLink className="menu__item" to="favorites">
        <IconHeart width={15} height={15} />
        Избранные
        <Badge
          style={{ backgroundColor: 'rgba(200,200,200, .25)' }}
          overflowCount={99}
          count={favorites?.length}
        />
      </NavLink>
      <NavLink className="menu__item" to="settings">
        <IconSettings width={15} height={15} />
        Настройки
      </NavLink>
    </nav>
  )
}