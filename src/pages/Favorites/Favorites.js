import {Post} from "../../components/Main/Post/Post";
import {Preloader} from "../../components/Preloader/Preloader";
import {Link} from "react-router-dom";
import {Banner} from "../../components/Banner/Banner";
import {useTitle} from "../../utils/hooks";
import {Page404} from "../Page404/Page404";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectPosts} from "../../store/slices/posts";
import {useEffect, useState} from "react";
import {handleLikePost} from "../../utils/functions";

export const Favorites = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Избранные');

  const dispatch = useDispatch();
  const {data: posts, isLoading, error, favorites} = useSelector(selectPosts);

  // Стейт с Избранными постами
  const [favoritesPosts, setFavoritesPosts] = useState([]);


  useEffect(() => {
    setFavoritesPosts(
      posts?.filter((post) => favorites?.includes(post.id))
    )
  }, [posts])


  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])


  /** При наличии ошибки от Сервера вернуть 404 страницу **/
  if (error !== null) return <Page404 {...error} />


  return (
    <Preloader isLoading={isLoading}>
      <Banner
        title="Так проще запомнить..."
        description={`Когда человек записывает, его мозг освобождается...`}
        bgImage="http://www.ssenari.az/wp-content/uploads/2021/01/497101-1536x864.jpg"
      />
      <section>
        <div className="header" style={{ flexDirection: 'row' }}>
          <h2 className="title">Избранные <span style={{ fontSize: 16, fontWeight: 'normal' }}>(Найдено <span style={{ fontWeight: 'bold' }}>{favoritesPosts?.length}</span> шт.)</span></h2>
        </div>
        <div className="posts-list">
          {favoritesPosts?.map((post) => {
            return <Post
              key={post.id}
              id={post.id}
              image={post.image}
              imageAlt={post.imageAlt}
              title={<Link className="post-title" to={`/post/${post.id}`}>{post.title}</Link>}
              description={post.description.length > 150 ? post.description.slice(0, 150) + '...' : post.description}
              liked={true}
              likePost={() => handleLikePost(dispatch, post, favorites)}
            />
          })}
        </div>
      </section>
    </Preloader>
  )
}