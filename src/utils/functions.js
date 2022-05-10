import {editPost} from "../store/slices/posts";


// Событие на нажатие кнопки Лайк
export const handleLikePost = (dispatch, post) => {
  const updatedPost = {
    ...post,
    liked: !post.liked,
    likes: post.liked ? post.likes - 1 : post.likes + 1
  }

  dispatch(editPost(updatedPost));
}


// Событие на нажатие кнопки Удалить пост
export const handleDeletePost = (post, setDeletePostData) => {
  setDeletePostData({
    showModal: true,
    post: post,
  });
}



