import {Preloader} from "../../components/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, selectPosts} from "../../store/slices/posts";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {Post} from "../../components/Main/Post/Post";
import "./Search.sass";
import {ReactComponent as IconSearch} from "../../assets/img/icons/search.svg"
import {handleLikePost} from "../../utils/functions";
import {useTitle} from "../../utils/hooks";

export const Search = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(selectPosts);

  // Результаты поиска
  const [results, setResults] = useState([]);

  // Параметры поиска в URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Получаем значения по параметру query из URL
  const postQuery = searchParams.get('query') || undefined;

  // Управляемое поле ввода
  const [inputValue, setInputValue] = useState(postQuery)


  /** Указываю название страницы в document.title **/
  useTitle(`Результаты поиска по запросу «${postQuery}»`);


  /** Событие кнопки Найти **/
  const handleSearch = (e) => {
    e.preventDefault();

    const form = e.target;
    const query = form.search.value;

    setSearchParams({query: query})
  }


  useEffect(() => {
    if (searchParams.get('query') !== null) {
      dispatch(fetchPosts())
        .then((action) => {
          const posts = action.payload;

          setResults(
            posts.filter(
              post => postQuery && (post.title.toLowerCase().includes(postQuery.toLowerCase()) || post.description.toLowerCase().includes(postQuery.toLowerCase()))
            )
          )
        })
    }
  }, [searchParams])

  return (
    <Preloader isLoading={isLoading}>
      <section id="search-page">
        <h1>Страница поиска</h1>
        {results.length > 0 && (
          <p>Найдено: {results.length} результатов</p>
        )}

        <form className="search-form" onSubmit={handleSearch}>
          <input type="search" name="search" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Найти пост..."/>
          <button className="btn">
            <IconSearch width={16} height={16} fill="#535054" />
          </button>
        </form>
        <div className="posts-list">
          {results?.map(post => {
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
      </section>
    </Preloader>
  )
}