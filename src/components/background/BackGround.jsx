import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import bg1 from '/bg.jpg'; // Asegúrate de que la ruta sea correcta

const BackGround = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const loader = new THREE.TextureLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(14,8,15,9);
    const material = new THREE.MeshBasicMaterial({
      map: loader.load(bg1),
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;

    const count = geometry.attributes.position.count;
    const clock = new THREE.Clock();

    function animate() {
      const time = clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        const anim1 = 0.25 * Math.sin(x + time * 0.7);
        const anim2 = 0.35 * Math.sin(x *1+ time * 0.7);
        const anim3 = 0.1 * Math.sin(y * 15 + time * 0.7);

        geometry.attributes.position.setZ(i, anim1 + anim2+anim3);
      }
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    // Cleanup function to remove event listeners and resources
    return () => {
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef}  style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}/>;
};

export default BackGround;