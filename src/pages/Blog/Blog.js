import './Blog.sass';
import {Post} from "../../components/Main/Post/Post";
import {Preloader} from "../../components/Preloader/Preloader";
import {Link} from "react-router-dom";
import {useTitle} from "../../utils/hooks";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectPosts} from "../../store/slices/posts";
import {useEffect} from "react";
import {Page404} from "../Page404/Page404";
import {handleLikePost} from "../../utils/functions";

export const Blog = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Блог');


  /** Получение постов из Redux **/
  const dispatch = useDispatch();
  const {data: posts, isLoading, error} = useSelector(selectPosts);


  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  /** При наличии ошибки от Сервера вернуть 404 страницу **/
  if (error !== null) return <Page404 {...error} />


  return (
    <Preloader isLoading={isLoading}>
      <section className="blog">
        <div className="header" style={{ flexDirection: 'row' }}>
          <h2 className="title">Посты <span style={{ fontSize: 16, fontWeight: 'normal' }}>(Найдено <span style={{ fontWeight: 'bold' }}>{posts?.length}</span> шт.)</span></h2>
        </div>
        <div className="content">
          <div className="posts-list">
            {posts?.map((post) => {
              return <Post
                key={post.id}
                id={post.id}
                image={post.image}
                imageAlt={post.imageAlt}
                title={<Link className="post-title" to={`/post/${post.id}`} >{post.title}</Link>}
                description={post.description.length > 400 ? post.description.slice(0, 400) + '...' : post.description}
                likes={post.likes}
                liked={post.liked}
                likePost={() => handleLikePost(dispatch, post)}
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