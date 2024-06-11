import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, ScrollControls, useScroll } from '@react-three/drei'
import { easing } from 'maath'
import './util'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../../features/posts/postsSlice'
import { Spin } from 'antd'


// MODIFICADOOOOOOO ARANNCAAAAAAAAAAAAAAAAAA
export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);


  const { posts, isLoading } = useSelector((state) => state.posts); 
  const handleCardClick = (postId) => {
    navigate (`/postdetail/${postId}`);
  };

  
  if (isLoading) {
    return <Spin />;
  }

  return (
    <div style={{ height: '550px', 
    
    }}>
      <button onClick={() => {setPage((page) => page + 1), console.log(page)}}>Next</button>
   
          <button onClick={() => {page==1 ? setPage(1) :setPage((page) => page - 1), console.log(page)}}>back</button>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={['#a79', 8.5, 12]} />
        <ScrollControls pages={4} infinite style={{ opacity: 0 }}>
          <Rig rotation={[0, 0,0.02]}>
            <Carousel posts={posts} onCardClick={handleCardClick} />
          </Rig>
        </ScrollControls>
      </Canvas>
    </div>

  )
}

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

function Carousel({ posts, onCardClick, radius = 2.3 }) {

  return posts.map((post, i) => (
    <Card
      key={post._id}
      url={`http://localhost:3000/${post.imgpost}`}
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
        <bentPlaneGeometry args={[0.25, 1.4, 1.2, 20, 20]} />
      </Image>
    </group>
  );
}
export default Home