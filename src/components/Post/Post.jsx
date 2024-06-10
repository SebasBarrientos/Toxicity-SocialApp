import { Spin } from "antd";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import commentsService from "../../features/comment/commentService";
import { getPosts, like } from "../../features/posts/postsSlice";
import { HeartTwoTone } from "@ant-design/icons";
import "./Post.scss";

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, Text } from '@react-three/drei'
import { easing } from 'maath'
import './util'

const Post = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [bodyText, setBodyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setBodyText(e.target.value);
  };

  const startEdit = (commentId, commentBody) => {
    setEditingCommentId(commentId);
    setEditedComment(commentBody);
  };

  const handleSaveEditedComment = async (commentId) => {
    await commentsService.modifyComment(commentId, { bodyText: editedComment });
    dispatch(getPosts());
    setEditingCommentId(null);
    setEditedComment("");
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  const handleSubmitComment = async (bodyText, postId) => {
    await commentsService.addComment({ bodyText }, postId);
    dispatch(getPosts());
  };

  const handleCardClick = (postId) => {
    navigate(`/postdetail/${postId}`);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel posts={posts} onCardClick={handleCardClick} />
          </Rig>
        </ScrollControls>
        <Environment preset="night" background blur={0.5} />
      </Canvas>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <Link to={"/postdetail/" + post._id} className="no-underline hover:underline">
              <h3>{post.userId?.userName}</h3>
              <div className="post-image-container">
                <img src={`https://back-end-red-social.onrender.com/${post.imgpost}`} alt="" />
              </div>
              <div className="post-caption">
                <p className="text-gray-700 text-base">{post.caption}</p>
              </div>
            </Link>
            <div className="like-post">
              {post.likes.length} likes
              <HeartTwoTone twoToneColor="#eb2f96" onClick={() => { dispatch(like(post._id)); }} />
            </div>
            <div className="comment-section">
              <input type="text" className="border" name="bodyText" value={bodyText} onChange={onChange} />
              <button onClick={async () => { await handleSubmitComment(bodyText, post._id); }}>
                Submit comment
              </button>
            </div>
            <div className="comments-list">
              {post.commentsIds.map((comment) => (
                <div key={comment._id} className="comment">
                  <p>{comment.userId?.name}</p>
                  {comment._id === editingCommentId ? (
                    <>
                      <input type="text" value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                      <div className="edit-buttons">
                        <button onClick={() => handleSaveEditedComment(comment._id)} className="save-button">
                          Save
                        </button>
                        <button onClick={cancelEdit} className="cancel-button">
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{comment.bodyText}</p>
                      <button onClick={() => startEdit(comment._id, comment.bodyText)} className="edit-button">
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({ posts, onCardClick, radius = 1.4 }) {
  return posts.map((post, i) => (
    <Card
      key={post._id}
      url={`https://back-end-red-social.onrender.com/${post.imgpost}`}
      position={[Math.sin((i / posts.length) * Math.PI * 2) * radius, 0, Math.cos((i / posts.length) * Math.PI * 2) * radius]}
      rotation={[0, Math.PI + (i / posts.length) * Math.PI * 2, 0]}
      onClick={() => onCardClick(post._id)}
      title={post.userId?.userName}
    />
  ));
}

function Card({ url, onClick, title, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);

  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);

  useFrame((state, delta) => {
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
  });

  return (
    <group onClick={onClick}>
      <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
        <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
      </Image>
    </group>
  );
}

export default Post;
