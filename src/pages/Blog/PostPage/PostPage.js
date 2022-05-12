import {Post} from "../../../components/Main/Post/Post";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Preloader} from "../../../components/Preloader/Preloader";
import {SocialBtns} from "../../../components/SocialBtns/SocialBtns";
import {Page404} from "../../Page404/Page404";
import {useDispatch, useSelector} from "react-redux";
import {selectPosts, fetchPosts} from "../../../store/slices/posts";
import {useEffect, useState} from "react";
import "./PostPage.sass";
import {handleLikePost} from "../../../utils/functions";

export const PostPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {data: posts, error, isLoading, favorites} = useSelector(selectPosts);


  const [randPosts, setRandPosts] = useState([]);

  if ((posts.length && !randPosts.length)) {
    setRandPosts(
      posts.filter(post => post.id !== id).sort(() => Math.random() - 0.5).slice(0, 4)
    )
  } else if (randPosts.some(post => post.id === id)) {
    setRandPosts(
      posts.filter(post => post.id !== id).sort(() => Math.random() - 0.5).slice(0, 4)
    )
  }


  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])


  /** Отобразить 404, если нет поста на указанном id **/
  if (posts.length) {
    let isThisPost = posts.filter(post => post.id === id);
    if (error !== null || !isThisPost.length) return (
      <Preloader isLoading={isLoading}>
        <Page404 {...error} />
      </Preloader>
    )
  }




  return (
    <Preloader isLoading={isLoading}>
      <div className="post-page">
        <button className="btn btn-outline-blue" onClick={() => navigate(-1)}>Вернуться назад</button>
        <div className="content">
          <div className="left">
            {posts.filter(post => post.id === id).map(post => {
              /** Указываю название страницы в document.title **/
              document.title = `${post.title} / Мини блог`;

              return <Post
                key={post.id}
                id={post.id}
                image={post.image}
                imageAlt={post.imageAlt}
                title={post.title}
                description={post.description}
                liked={favorites.some(favoritePostId => favoritePostId === post.id)}
                likes={post.likes}
                likePost={() => handleLikePost(dispatch, post, favorites)}
              />
            })}
            <section>
              <h2 className="title">Поделиться постом</h2>
              <SocialBtns style={{ margin: '20px 0' }}/>
            </section>
          </div>
          <aside className="sidebar-right">
            <div className="widgets">
              <div className="widget widget-random-posts">
                <h3 className="widget-title">Похожие посты</h3>
                {randPosts.map(post => {
                  return (
                    <Post
                      key={post.id}
                      id={post.id}
                      image={post.image}
                      imageAlt={post.imageAlt}
                      title={<Link className="post-title" to={`/post/${post.id}`}>{post.title.length >= 60 ? post.title.slice(0, 60) + '...' : post.title }</Link>}
                      liked={post.liked}
                      likes={post.likes}
                    />
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Preloader>
  )
}