import {likePost} from "../store/slices/posts";

// Событие на нажатие кнопки Лайк
export const handleLikePost = (dispatch, post, favorites) => {
  if (favorites.some(favoritePostId => favoritePostId === post.id )) {
    const updatedPost = {
      ...post,
      likes: post.likes - 1
    }

    dispatch(likePost({
      post: updatedPost,
      favorites: favorites.filter(favoritePostId => favoritePostId !== post.id)
    }));
  } else {
    const updatedPost = {
      ...post,
      likes: post.likes + 1
    }

    dispatch(likePost({
      post: updatedPost,
      favorites: [...favorites, post.id]
    }));
  }
}


// Событие на нажатие кнопки Удалить пост
export const handleDeletePost = (post, setDeletePostData) => {
  setDeletePostData({
    showModal: true,
    post: post,
  });
}