import './MyPosts.sass';
import {Post} from "../../components/Main/Post/Post";
import {Preloader} from "../../components/Preloader/Preloader";
import {Link} from "react-router-dom";
import {useTitle} from "../../utils/hooks";
import {useDispatch, useSelector} from "react-redux";
import {selectPosts, fetchPosts} from "../../store/slices/posts";
import {useEffect, useReducer} from "react";
import {Page404} from "../Page404/Page404";
import {selectUser} from "../../store/slices/auth";
import {handleDeletePost, handleLikePost} from "../../utils/functions";
import {ModalDeletePost} from "../../components/ModalDeletePost/ModalDeletePost";

export const MyPosts = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Мои посты');


  /** Получение постов из Redux **/
  const dispatch = useDispatch();
  const {data: posts, isLoading, error, secondLoading, favorites} = useSelector(selectPosts);

  /** Получение пользователя из Redux **/
  const user = useSelector(selectUser);

  /** Посты пользователя **/
  const userPosts = posts.filter(post => post.userId === user.id);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  // Состояние Данных поста Удаления и Модального окна
  const [deletePostData, setDeletePostData] = useReducer((deletePostData, newDeletePostData) => {
    return {...deletePostData, ...newDeletePostData}
  }, {
    showModal: false,
    post: {},
  })


  /** При наличии ошибки от Сервера вернуть 404 страницу **/
  if (error !== null) return <Page404 {...error} />


  return (
    <Preloader isLoading={isLoading}>
      <ModalDeletePost
        deletePostData={deletePostData}
        setDeletePostData={setDeletePostData}
        secondLoading={secondLoading}
      />

      <section className="blog">
        <div className="header" style={{ flexDirection: 'row' }}>
          <h2 className="title">Мои посты <span style={{ fontSize: 16, fontWeight: 'normal' }}>(Найдено <span style={{ fontWeight: 'bold' }}>{userPosts?.length}</span> шт.)</span></h2>
          <Link className="btn btn-blue" to="/create-post">Добавить новый</Link>
        </div>
        <div className="content">
          <div className="posts-list">
            {userPosts?.map((post) => {
              return <Post
                key={post.id}
                id={post.id}
                image={post.image}
                imageAlt={post.imageAlt}
                title={<Link className="post-title" to={`/post/${post.id}`} >{post.title}</Link>}
                description={post.description.length > 400 ? post.description.slice(0, 400) + '...' : post.description}
                likes={post.likes}
                liked={favorites.some(favoritePostId => favoritePostId === post.id)}
                likePost={() => handleLikePost(dispatch, post, favorites)}
                editPost={`/post/${post.id}/edit`}
                deletePost={() => handleDeletePost(post, setDeletePostData)}
              />
            })}
          </div>
          <aside className="sidebar-right">
            <div className="widgets">
              <div className="widget">
                <h2>Название виджета 1</h2>
              </div>
              <div className="widget">
                <h2>Название виджета 2</h2>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Preloader>
  )
}