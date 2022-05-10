import {useNavigate, useParams} from "react-router-dom";
import {useTitle} from "../../../utils/hooks";
import {useEffect, useState} from "react";
import {Preloader} from "../../../components/Preloader/Preloader";
import {Post} from "../../../components/Main/Post/Post";
import {Page404} from "../../Page404/Page404";
import {useDispatch, useSelector} from "react-redux";
import {
  editPost,
  fetchPost,
  selectPosts,
} from "../../../store/slices/posts";
import { notification, Spin } from 'antd';
import placeholderImg from "../../../assets/img/placeholder.png";


export const EditPost = () => {
  /** Указываю название страницы в document.title **/
  useTitle('Редактирование поста');

  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {selectPost: post, isLoading, error, secondLoading} = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch])


  // Управляемый компонент для полей ввода
  const [formData, setFormData] = useState({
    ...post,
    id: id,
    image: post.image,
    imageAlt: post.imageAlt,
    title: post.title,
    description: post.description
  });


  useEffect(() => {
    setFormData({
      ...post,
      image: post.image,
      imageAlt: post.imageAlt,
      title: post.title,
      description: post.description,
    });
  }, [post.image, post.imageAlt, post.title, post.description]);


  /** Событие кнопки Изменить пост **/
  const handleEditPost = (e) => {
    e.preventDefault();

    dispatch(editPost(formData))
      .then(() => {
        const key = 'updatable-edit-post';

        notification['success']({
          key,
          top: 80,
          message: 'Пост успешно изменен!',
        })

        setTimeout(() => {
          notification.open({
            key,
            style: {
              width: 600,
            },
            className: 'ant-notification-custom-for-image',
            top: 80,
            icon: <img width={200} src={formData.image || placeholderImg} alt="" onError={(e) => e.target.src = placeholderImg}/>,
            message: <a href={`/post/${formData.id}`}>{formData.title}</a>,
            description: <p className="description">
              {formData.description?.length > 200 ?
                formData.description.slice(0, 200) + "..." :
                formData.description}
            </p>
          });
        }, 1200);


        // Вернутся обратно, если была нажата кнопка с классом goBack
        if (e.nativeEvent.submitter.classList.contains('go-back')) {
          navigate(-1);
        }
      })
  }


  /** Отобразить 404, если по указанному id нет поста **/
  if (error !== null) return (
    <Preloader isLoading={isLoading}>
      <Page404 {...error} />
    </Preloader>
  )


  return (
    <>
      <Preloader isLoading={isLoading}>
        <h2>Редактирование</h2>
        <section id="edit-post-page">
          <Post
            key={formData.id}
            id={formData.id}
            image={formData.image}
            imageAlt={formData.imageAlt}
            title={formData.title}
            description={formData.description}
          />
          <form className="form" style={{width: '100%'}} onSubmit={handleEditPost}>
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
            <Spin spinning={secondLoading === 'pending-editPost'}>
              <div className="btns-block">
                <button className="btn btn-blue">Сохранить изменения</button>
                <button className="btn btn-outline-blue go-back">Сохранить и вернуться</button>
              </div>
            </Spin>
          </form>
        </section>
      </Preloader>
    </>
  )
}