import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';

function DiscoBall() {
  const ref = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      metalness: 1,
      roughness: 0.5,
    });
    const sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={ref} />;
}

export default DiscoBall;
