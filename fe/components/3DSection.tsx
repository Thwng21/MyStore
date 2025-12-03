"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { motion } from "framer-motion";
import { Play, Music, Video } from "lucide-react";

export default function YouTubeWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: CSS3DRenderer;
    let controls: TrackballControls;

    const container = containerRef.current!;
    const blocker = blockerRef.current!;

    /** Hàm tạo mỗi video */
    function createElement(id: string, x: number, y: number, z: number, ry: number) {
      const div = document.createElement("div");
      div.style.width = "480px";
      div.style.height = "360px";
      div.style.backgroundColor = "#000";

      const iframe = document.createElement("iframe");
      iframe.style.width = "480px";
      iframe.style.height = "360px";
      iframe.style.border = "0px";
      iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;

      div.appendChild(iframe);

      const object = new CSS3DObject(div);
      object.position.set(x, y, z);
      object.rotation.y = ry;

      return object;
    }

    /** Hàm tạo nút tương tác 3D */
    function createInteractiveElement(x: number, y: number, z: number, ry: number) {
      const div = document.createElement("div");
      div.style.width = "480px";
      div.style.height = "360px";
      div.style.background = "linear-gradient(to right, #fb923c, #dc2626)"; // orange-400 to red-600
      div.style.display = "flex";
      div.style.flexDirection = "column";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.style.boxShadow = "0 0 20px rgba(255, 100, 0, 0.5)";
      div.style.border = "2px solid rgba(255,255,255,0.2)";
      
      const title = document.createElement("h3");
      title.innerText = "ƯU ĐÃI ĐẶC BIỆT";
      title.style.color = "white";
      title.style.fontSize = "32px";
      title.style.fontWeight = "900";
      title.style.marginBottom = "20px";
      title.style.fontFamily = "sans-serif";
      title.style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
      div.appendChild(title);

      const btn = document.createElement("button");
      btn.innerText = "NHẬN NGAY";
      btn.style.padding = "15px 40px";
      btn.style.fontSize = "20px";
      btn.style.fontWeight = "bold";
      btn.style.color = "#dc2626";
      btn.style.background = "white";
      btn.style.border = "none";
      btn.style.borderRadius = "50px";
      btn.style.cursor = "pointer";
      btn.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      btn.style.transition = "all 0.3s ease";
      
      // Hover effect via JS
      btn.onmouseenter = () => { 
        btn.style.transform = "scale(1.05)"; 
        btn.style.boxShadow = "0 10px 15px rgba(0,0,0,0.2)"; 
      };
      btn.onmouseleave = () => { 
        btn.style.transform = "scale(1)"; 
        btn.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"; 
      };
      
      btn.onclick = () => {
        alert("Bạn đã nhận ưu đãi!");
      };

      div.appendChild(btn);

      const object = new CSS3DObject(div);
      object.position.set(x, y, z);
      object.rotation.y = ry;

      return object;
    }

    /** Init */
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.set(500, 350, 750);

    scene = new THREE.Scene();

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    /** Group video */
    const group = new THREE.Group();
    group.add(createElement("CuI925AFUjQ", 0, 0, 240, 0));
    group.add(createElement("CuI925AFUjQ", 240, 0, 0, Math.PI / 2));
    // Thay thế mặt sau bằng nút tương tác
    group.add(createInteractiveElement(0, 0, -240, Math.PI));
    group.add(createElement("CuI925AFUjQ", -240, 0, 0, -Math.PI / 2));
    scene.add(group);

    /** Controls */
    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 4;

    /** Block iframe khi kéo chuột */
    blocker.style.display = "none";

    controls.addEventListener("start", () => {
      blocker.style.display = "";
    });
    controls.addEventListener("end", () => {
      blocker.style.display = "none";
    });

    /** Resize */
    const resize = () => {
      // Tăng chiều rộng render lên 1.5 lần và dịch sang trái 50%
      // Để tâm của khối 3D (nằm giữa renderer) sẽ nằm ở vị trí 25% màn hình (bên trái)
      const width = window.innerWidth * 1.5;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.left = "-50%";
    };
    window.addEventListener("resize", resize);
    resize(); // Gọi ngay lập tức để set vị trí ban đầu

    /** Animation loop */
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.innerHTML = "";
    };
  }, []);

  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/img/tuong.png')" }}
    >
      {/* 3D Scene Container */}
      <div ref={containerRef} className="w-full h-full absolute inset-0" />
      
      {/* Blocker for controls */}
      <div
        ref={blockerRef}
        className="absolute inset-0 z-10 hidden"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end px-4 md:px-20 bg-black/10">
        <div className="max-w-xl pointer-events-auto space-y-8 p-8 rounded-2xl backdrop-blur-sm bg-black/20 border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-orange-500 mb-4">
              <Music className="w-6 h-6 animate-pulse" />
              <span className="font-bold tracking-wider">MUSIC & VIBES</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              KHÔNG KHÍ <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
                SÔI ĐỘNG MỖI ĐÊM
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Đắm chìm trong không gian âm nhạc đỉnh cao với hệ thống âm thanh ánh sáng hiện đại bậc nhất. 
              Nơi cảm xúc thăng hoa cùng những bản mix sôi động từ các DJ hàng đầu.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="w-5 h-5 fill-current" />
                  XEM VIDEO
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-5 h-5 fill-current" />
                  XEM VIDEO
                </span>
              </button>

              <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                <Video className="w-5 h-5" />
                THƯ VIỆN
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {[
              { label: "Videos", value: "100+" },
              { label: "Views", value: "1M+" },
              { label: "Artists", value: "50+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
