import React from "react";
import './Post.sass';
import placeholderImg from '../../../assets/img/placeholder.png';
import {ReactComponent as IconHeart} from '../../../assets/img/icons/heart-plain.svg';
import {ReactComponent as IconEdit} from '../../../assets/img/icons/edit.svg';
import {ReactComponent as IconDelete} from '../../../assets/img/icons/delete.svg';
import {Link} from "react-router-dom";

const PostUI = (post) => {
  return (
    <article className="post" key={post.id}>
      <img className="post-img" height={160} src={post.image || placeholderImg} alt={post.imageAlt} onError={(e) => e.target.src = placeholderImg}/>
      <h2 className="post-title">{post.title}</h2>
      {post.description && (
        <p className="post-description">{post.description}</p>
      )}
      <div className="post-footer">
        {post.likePost && (
          <button className="btn btn-like" onClick={post.likePost}>
            <IconHeart width={20} fill={post.liked ? 'var(--red)' : 'black'} />
            {post.likes}
          </button>
        )}
        {post.editPost && (
          <Link className="btn btn-edit" to={post.editPost}>
            <IconEdit width={20} fill={'var(--darkBlue)'} />
          </Link>
        )}
        {post.deletePost && (
          <button className="btn btn-delete" onClick={post.deletePost}>
            <IconDelete width={20} fill={'var(--red)'} />
          </button>
        )}
      </div>
    </article>
  )
}

export const Post = React.memo(PostUI);