import {Post} from "../../../components/Main/Post/Post";
import {Page404} from "../../Page404/Page404";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTitle} from "../../../utils/hooks";
import {useDispatch, useSelector} from "react-redux";
import {createPost, selectPosts} from "../../../store/slices/posts";
import {notification, Spin} from "antd";
import {Preloader} from "../../../components/Preloader/Preloader";
import placeholderImg from '../../../assets/img/placeholder.png';
import {selectUser} from "../../../store/slices/auth";

export const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error, secondLoading, isLoading} = useSelector(selectPosts);
  const user = useSelector(selectUser);

  /** Указываю название страницы в document.title **/
  useTitle('Создать пост');

  // Управляемый компонент для полей ввода
  const [formData, setFormData] = useState({
    userId: user.id,
    image: '',
    imageAlt: '',
    title: '',
    description: '',
    likes: 0,
    liked: false
  });


  /** Событие кнопки Добавить пост **/
  const handleCreatePost = async (e) => {
    e.preventDefault();

    dispatch(createPost(formData))
      .then((action) => {
        const post = action.payload;
        const key = 'updatable-create-post';

        notification.success({
          key,
          top: 80,
          message: 'Пост успешно создан!',
        })

        setTimeout(() => {
          notification.open({
            key,
            style: {
              width: 600,
            },
            className: 'ant-notification-custom-for-image',
            top: 80,
            icon: <img width={200} src={post?.image || placeholderImg} alt="" onError={(e) => e.target.src = placeholderImg}/>,
            message: <a href={`/post/${post?.id}`}>{post?.title}</a>,
            description: <p className="description">
              {post?.description?.length > 200 ?
                post?.description.slice(0, 200) + "..." :
                post?.description}
            </p>
          });
        }, 1200);

        setFormData({
          image: '',
          imageAlt: '',
          title: '',
          description: '',
          likes: 0,
          liked: false
        })

        // Вернутся обратно, если была нажата кнопка с классом goBack
        if (e.nativeEvent.submitter.classList.contains('go-back')) {
          navigate(-1);
        }
      })
  }


  /** Отобразить 404, если возникнет ошибки при создании поста **/
  if (error !== null) return <Page404 {...error} />


  return (
    <Preloader isLoading={isLoading}>
      <div className="header">
        <button
          className="btn btn-red"
          style={{ width: 200 }}
          onClick={() => navigate(-1)}
        >Вернуться назад</button>
        <h2 className="title">Новый пост</h2>
      </div>
      <section id="edit-post-page">
        <Post
          key={formData.id}
          id={formData.id}
          image={formData.image}
          imageAlt={formData.imageAlt}
          title={formData.title === '' ? 'Название поста' : formData.title}
          description={formData.description === '' ? 'Описание поста' : formData.description}
        />
        <form className="form" style={{width: '100%'}} onSubmit={handleCreatePost}>
          <div className="form-control">
            <input type="text"
                   value={formData.image}
                   onChange={(e) => setFormData({...formData, image: e.target.value})}
                   placeholder="Введите ссылку на картинку поста"
            />
          </div>
          <div className="form-control">
            <input type="text"
                   value={formData.imageAlt}
                   onChange={(e) => setFormData({...formData, imageAlt: e.target.value})}
                   placeholder="Введите описание картинки поста"
            />
          </div>
          <div className="form-control">
            <input type="text"
                   value={formData.title}
                   name="title"
                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                   placeholder="Введите название поста"
            />
          </div>
          <div className="form-control">
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Введите описание поста"
          />
          </div>
          <Spin spinning={secondLoading === 'pending-createPost'}>
            <div className="btns-block">
              <button className="btn btn-blue">Создать пост</button>
              <button className="btn btn-outline-blue go-back">Создать и вернуться назад</button>
            </div>
          </Spin>
        </form>
      </section>
    </Preloader>
  )
}