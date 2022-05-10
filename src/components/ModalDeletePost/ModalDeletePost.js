import {Modal, notification} from "antd";
import {deletePost} from "../../store/slices/posts";
import {useDispatch} from "react-redux";

export const ModalDeletePost = ({deletePostData, setDeletePostData, secondLoading }) => {
  const dispatch = useDispatch()

  /** Событие кнопки Удалить (в Модальном окне) **/
  const handleDeletePostModalOk = () => {
    dispatch(deletePost(deletePostData?.post?.id))
      .then(() => {
        setDeletePostData({
          showModal: false
        })

        notification['success']({
          top: 80,
          message: <>Пост <strong><i>"{deletePostData.post.title}"</i></strong> успешно удален!</>
        })
      });
  }

  return (
    <Modal
      title="Вы точно хотите удалить пост?"
      visible={deletePostData.showModal}
      onOk={handleDeletePostModalOk}
      okText={'Удалить'}
      onCancel={ () => setDeletePostData({showModal: false}) }
      cancelText={'Отмена'}
      confirmLoading={secondLoading === "pending-deletePost"}
      okType="danger"
    >
      <p>Обратите внимание, что пост: <strong><i>"{deletePostData.post.title}"</i></strong>, будет уничтожен без возможности восстановления!</p>
    </Modal>
  )
}