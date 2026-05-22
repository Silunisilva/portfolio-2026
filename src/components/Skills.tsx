import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const skills = [
  { name:"React",      tag:"Frontend",   level:90, years:"4+", color:"#61dafb", dim:"rgba(97,218,251,0.13)",
    svgPath:`<ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61dafb" stroke-width="1.8" fill="none"/><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61dafb" stroke-width="1.8" fill="none" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61dafb" stroke-width="1.8" fill="none" transform="rotate(120 20 20)"/><circle cx="20" cy="20" r="3" fill="#61dafb"/>` },
  { name:"Next.js",    tag:"Framework",  level:88, years:"3+", color:"#e2e8f0", dim:"rgba(226,232,240,0.10)",
    svgPath:`<circle cx="20" cy="20" r="14" stroke="#e2e8f0" stroke-width="1.8" fill="none"/><path d="M14 27V14l13 15" stroke="#e2e8f0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M22 14.5v6.5" stroke="#e2e8f0" stroke-width="2.2" stroke-linecap="round"/>` },
  { name:"Tailwind",   tag:"Styling",    level:92, years:"3+", color:"#38bdf8", dim:"rgba(56,189,248,0.13)",
    svgPath:`<path d="M10 18c1.3-5.3 4.7-8 10-8 5.3 0 8.2 2.7 8.5 8-.3-2.7-1.8-4-4.5-4-2.7 0-4.7 2.7-7 4C14.7 20 12.3 20 10 18z" fill="#38bdf8"/><path d="M20 26c1.3-5.3 4.7-8 10-8 .1 0 .2 0 .3.002-.7 5.3-3.3 8-8.3 8-2.7 0-4.7 2.7-7 4-2.3 1.7-4.7 1.7-7 0 1.3-5.3 4.7-8 10-8" fill="#38bdf8" opacity=".55"/>` },
  { name:"Three.js",   tag:"3D / WebGL", level:75, years:"2+", color:"#fb923c", dim:"rgba(251,146,60,0.13)",
    svgPath:`<polygon points="20,6 34,30 6,30" stroke="#fb923c" stroke-width="1.8" fill="none"/><polygon points="20,13 28,27 12,27" fill="#fb923c" opacity="0.22"/><line x1="20" y1="6" x2="20" y2="30" stroke="#fb923c" stroke-width="1.1" opacity="0.5"/><line x1="6" y1="30" x2="28" y2="27" stroke="#fb923c" stroke-width="1.1" opacity="0.5"/><line x1="34" y1="30" x2="12" y2="27" stroke="#fb923c" stroke-width="1.1" opacity="0.5"/>` },
  { name:"TypeScript", tag:"Language",   level:85, years:"3+", color:"#3b82f6", dim:"rgba(59,130,246,0.13)",
    svgPath:`<rect x="6" y="6" width="28" height="28" rx="4" fill="#3b82f6" opacity="0.18" stroke="#3b82f6" stroke-width="1.5"/><text x="10" y="28" font-family="monospace" font-weight="800" font-size="14" fill="#3b82f6">TS</text>` },
  { name:"Node.js",    tag:"Backend",    level:80, years:"4+", color:"#4ade80", dim:"rgba(74,222,128,0.13)",
    svgPath:`<path d="M20 5L33 12.5v15L20 35 7 27.5v-15z" stroke="#4ade80" stroke-width="1.8" fill="none"/><path d="M20 11l8.5 5v10L20 31l-8.5-5V16z" fill="#4ade80" opacity="0.16"/><circle cx="20" cy="20" r="3.2" fill="#4ade80" opacity="0.9"/>` },
  { name:"QA Testing", tag:"Quality",    level:82, years:"3+", color:"#a78bfa", dim:"rgba(167,139,250,0.13)",
    svgPath:`<path d="M12 7h16l2 6.5H10z" stroke="#a78bfa" stroke-width="1.5" fill="none"/><rect x="9" y="13.5" width="22" height="19" rx="2" stroke="#a78bfa" stroke-width="1.5" fill="none"/><path d="M15 23l3.5 3.5 7-7" stroke="#a78bfa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>` },
  { name:"AWS",        tag:"Cloud",      level:65, years:"1+", color:"#f59e0b", dim:"rgba(245,158,11,0.13)",
    svgPath:`<path d="M8 23.5c0-3.2 2.7-5.8 6-5.8.3 0 .6 0 .9.1 1.1-3 3.9-5.3 7.1-5.3 3.9 0 7 3.1 7 7 0 .1 0 .2 0 .3C31.2 20.5 33 22.5 33 25c0 2.5-2.2 4.5-5 4.5H12c-2.2 0-4-1.8-4-4v-1z" stroke="#f59e0b" stroke-width="1.6" fill="none"/><path d="M13 33.5Q17 30 20 33.5Q23 37 27 33.5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" fill="none"/>` },
  { name:"Docker",     tag:"DevOps",     level:60, years:"1+", color:"#0ea5e9", dim:"rgba(14,165,233,0.13)",
    svgPath:`<rect x="8" y="13" width="6" height="5" rx="1.2" stroke="#0ea5e9" stroke-width="1.5" fill="none"/><rect x="16" y="13" width="6" height="5" rx="1.2" stroke="#0ea5e9" stroke-width="1.5" fill="none"/><rect x="16" y="7" width="6" height="5" rx="1.2" stroke="#0ea5e9" stroke-width="1.5" fill="none"/><rect x="24" y="13" width="6" height="5" rx="1.2" stroke="#0ea5e9" stroke-width="1.5" fill="none"/><path d="M6 22.5s2.5 1 6 1c2.5 0 4.5-1 7-1s3.5 1 7 1c2 0 3.5-.5 5.5-1.5" stroke="#0ea5e9" stroke-width="1.5" stroke-linecap="round" fill="none"/><circle cx="33" cy="17.5" r="2.2" fill="#0ea5e9" opacity="0.75"/>` },
  { name:"CI/CD",      tag:"Automation", level:58, years:"1+", color:"#34d399", dim:"rgba(52,211,153,0.13)",
    svgPath:`<circle cx="9" cy="20" r="4.5" stroke="#34d399" stroke-width="1.6" fill="none"/><circle cx="31" cy="20" r="4.5" stroke="#34d399" stroke-width="1.6" fill="none"/><path d="M13.5 20h13" stroke="#34d399" stroke-width="1.4" stroke-dasharray="2.5 2.5"/><path d="M20 9C26 9 29 14 29 20" stroke="#34d399" stroke-width="1.5" fill="none" stroke-linecap="round"/><polygon points="26,7 30,10 23,11" fill="#34d399"/>` },
  { name:"Git",        tag:"Tools",      level:90, years:"5+", color:"#f97316", dim:"rgba(249,115,22,0.13)",
    svgPath:`<circle cx="11" cy="11" r="4" stroke="#f97316" stroke-width="1.6" fill="none"/><circle cx="29" cy="11" r="4" stroke="#f97316" stroke-width="1.6" fill="none"/><circle cx="11" cy="29" r="4" stroke="#f97316" stroke-width="1.6" fill="none"/><path d="M11 15v10" stroke="#f97316" stroke-width="1.6"/><path d="M15 11h10" stroke="#f97316" stroke-width="1.6"/><path d="M29 15Q29 29 15 29" stroke="#f97316" stroke-width="1.6" fill="none"/>` },
  { name:"Figma",      tag:"Design",     level:72, years:"2+", color:"#e879f9", dim:"rgba(232,121,249,0.13)",
    svgPath:`<rect x="12" y="6" width="8" height="8" rx="4" stroke="#e879f9" stroke-width="1.5" fill="none"/><rect x="20" y="6" width="8" height="8" rx="4" stroke="#e879f9" stroke-width="1.5" fill="none"/><rect x="12" y="14" width="8" height="8" stroke="#e879f9" stroke-width="1.5" fill="none"/><rect x="12" y="22" width="8" height="8" rx="4" stroke="#e879f9" stroke-width="1.5" fill="none"/><circle cx="24" cy="18" r="4" stroke="#e879f9" stroke-width="1.5" fill="none"/>` },
];

// Split skills for left and right panels
const leftSkills  = skills.slice(0, 6);
const rightSkills = skills.slice(6, 12);

function fibonacciSphere(n, r) {
  const pts = [], phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, s = Math.sqrt(1 - y * y), t = phi * i;
    pts.push(new THREE.Vector3(Math.cos(t) * s * r, y * r, Math.sin(t) * s * r));
  }
  return pts;
}

function levelLabel(n) {
  if (n >= 87) return { t:"Expert",     c:"#4ade80" };
  if (n >= 75) return { t:"Advanced",   c:"#38bdf8" };
  if (n >= 60) return { t:"Learning",   c:"#f59e0b" };
  return               { t:"Exploring", c:"#a78bfa" };
}

// Animated skill bar row component
function SkillBar({ sk, active, hovered, onClick, loaded }) {
  const isActive  = active  === sk.name;
  const isHovered = hovered === sk.name;
  const ll = levelLabel(sk.level);

  return (
    <div
      onClick={() => onClick(sk.name)}
      style={{
        cursor: "pointer",
        padding: "7px 10px",
        borderRadius: 10,
        border: `1px solid ${isActive ? sk.color + "60" : "rgba(255,255,255,0.05)"}`,
        background: isActive ? sk.color + "12" : isHovered ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "all 0.22s ease",
        marginBottom: 4,
      }}
      onMouseEnter={e => e.currentTarget.style.background = isActive ? sk.color + "14" : "rgba(255,255,255,0.06)"}
      onMouseLeave={e => e.currentTarget.style.background = isActive ? sk.color + "12" : "transparent"}
    >
      {/* Name + pct row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: isActive ? sk.color : "rgba(255,255,255,0.72)",
          letterSpacing: "-.01em",
          transition: "color .2s",
        }}>{sk.name}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fontWeight: 500,
          color: sk.color,
          opacity: 0.9,
        }}>{sk.level}%</span>
      </div>

      {/* Progress track */}
      <div style={{
        height: 3,
        borderRadius: 99,
        background: "rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          borderRadius: 99,
          width: loaded ? `${sk.level}%` : "0%",
          background: `linear-gradient(90deg, ${sk.color}66, ${sk.color})`,
          transition: "width 1.1s cubic-bezier(.16,1,.3,1)",
          boxShadow: isActive ? `0 0 8px ${sk.color}55` : "none",
        }} />
      </div>

      {/* Tag + level row — only when active */}
      {isActive && (
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            padding: "2px 7px",
            borderRadius: 12,
            color: "rgba(255,255,255,0.4)",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            letterSpacing: ".05em",
          }}>{sk.tag}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            padding: "2px 7px",
            borderRadius: 12,
            color: ll.c,
            background: "rgba(0,0,0,0.5)",
            border: `1px solid ${ll.c}44`,
            letterSpacing: ".05em",
          }}>{ll.t}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            padding: "2px 7px",
            borderRadius: 12,
            color: "rgba(255,255,255,0.3)",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
            letterSpacing: ".05em",
          }}>{sk.years} yrs</span>
        </div>
      )}
    </div>
  );
}

// Side panel wrapper
function SidePanel({ skillList, title, active, hovered, onSkillClick, loaded, side }) {
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      [side]: 0,
      transform: "translateY(-50%)",
      zIndex: 22,
      width: "clamp(140px, 14vw, 200px)",
      padding: "14px 10px",
      borderRadius: side === "left" ? "0 14px 14px 0" : "14px 0 0 14px",
      background: "rgba(6,6,18,0.72)",
      backdropFilter: "blur(16px)",
      border: `1px solid rgba(255,255,255,0.07)`,
      borderLeft:  side === "left"  ? "none" : undefined,
      borderRight: side === "right" ? "none" : undefined,
    }}>
      {/* panel title */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 7.5,
        letterSpacing: ".22em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.2)",
        marginBottom: 10,
        paddingLeft: 2,
      }}>{title}</div>

      {skillList.map((sk) => (
        <SkillBar
          key={sk.name}
          sk={sk}
          active={active}
          hovered={hovered}
          onClick={onSkillClick}
          loaded={loaded}
        />
      ))}
    </div>
  );
}

export default function Skills3D() {
  const mountRef   = useRef(null);
  const sceneRef   = useRef({});
  const targetRot  = useRef({ x: -0.2, y: 0 });
  const curRot     = useRef({ x: -0.2, y: 0 });
  const isDrag     = useRef(false);
  const lastPtr    = useRef({ x:0, y:0 });

  const [active,       setActive]       = useState(null);       // skill index (3D globe)
  const [activeBar,    setActiveBar]    = useState(null);       // skill name (side bars)
  const [hovered,      setHovered]      = useState(null);
  const [loaded,       setLoaded]       = useState(false);
  const [scrollPct,    setScrollPct]    = useState(0);
  const [nodePos,      setNodePos]      = useState([]);

  // Map skill name → index for cross-sync
  const nameToIdx = Object.fromEntries(skills.map((s,i)=>[s.name, i]));

  function handleBarClick(name) {
    setActiveBar(prev => prev === name ? null : name);
    const idx = nameToIdx[name];
    setActive(prev => prev === idx ? null : idx);
  }

  useEffect(() => {
    const container = mountRef.current;
    const W = container.clientWidth, H = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0, 0);
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W/H, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    scene.add(new THREE.AmbientLight(0xffffff, 0.28));
    const pA = new THREE.PointLight(0x7effd4, 3, 20);  pA.position.set(4,3,5);   scene.add(pA);
    const pB = new THREE.PointLight(0xc09fff, 2.5, 16); pB.position.set(-4,-3,2); scene.add(pB);
    const pC = new THREE.PointLight(0x38bdf8, 1.8, 14); pC.position.set(0,4,-3);  scene.add(pC);

    const core  = new THREE.Mesh(new THREE.IcosahedronGeometry(1.28,1),
      new THREE.MeshStandardMaterial({ color:0x0c0c22, metalness:0.95, roughness:0.12, transparent:true, opacity:0.92 }));
    scene.add(core);
    const wireA = new THREE.Mesh(new THREE.IcosahedronGeometry(1.32,1),
      new THREE.MeshBasicMaterial({ color:0x7effd4, wireframe:true, transparent:true, opacity:0.07 }));
    scene.add(wireA);
    const wireB = new THREE.Mesh(new THREE.IcosahedronGeometry(2.5,2),
      new THREE.MeshBasicMaterial({ color:0xc09fff, wireframe:true, transparent:true, opacity:0.035 }));
    scene.add(wireB);

    const group = new THREE.Group();
    scene.add(group);

    const positions = fibonacciSphere(skills.length, 2.18);
    const dotMeshes = [];

    (async () => {
      for (let i = 0; i < skills.length; i++) {
        const pos = positions[i];
        const sk  = skills[i];
        const sz  = 192;
        const cv  = document.createElement("canvas");
        cv.width  = sz; cv.height = sz;
        const ctx = cv.getContext("2d");

        const grd = ctx.createRadialGradient(sz/2,sz/2,sz*.22,sz/2,sz/2,sz*.5);
        grd.addColorStop(0, sk.color+"44"); grd.addColorStop(1,"transparent");
        ctx.fillStyle = grd; ctx.fillRect(0,0,sz,sz);

        ctx.beginPath(); ctx.arc(sz/2,sz/2,sz*.33,0,Math.PI*2);
        ctx.fillStyle="rgba(8,8,20,0.88)"; ctx.fill();
        ctx.strokeStyle=sk.color+"cc"; ctx.lineWidth=2.8; ctx.stroke();

        const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="${sz*.42}" height="${sz*.42}">${sk.svgPath}</svg>`;
        await new Promise(res=>{
          const img=new Image(), blob=new Blob([iconSvg],{type:"image/svg+xml"}), url=URL.createObjectURL(blob);
          img.onload=()=>{ ctx.drawImage(img,sz/2-sz*.21,sz/2-sz*.21,sz*.42,sz*.42); URL.revokeObjectURL(url); res(); };
          img.src=url;
        });

        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map:new THREE.CanvasTexture(cv), transparent:true, depthWrite:false }));
        sprite.scale.set(0.72,0.72,1);
        sprite.position.copy(pos);
        sprite.userData = { skillIndex:i };
        group.add(sprite);

        const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), pos]);
        group.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color:new THREE.Color(sk.color), transparent:true, opacity:0.09 })));

        dotMeshes.push({ sprite, pos, skillIndex:i });
      }
      sceneRef.current.dotMeshes = dotMeshes;
      setLoaded(true);
    })();

    const pCnt = 200, pPos = new Float32Array(pCnt*3);
    for (let i=0;i<pCnt;i++){
      const θ=Math.random()*Math.PI*2, φ=Math.acos(2*Math.random()-1), r=2.9+Math.random()*1.7;
      pPos[i*3]=r*Math.sin(φ)*Math.cos(θ); pPos[i*3+1]=r*Math.sin(φ)*Math.sin(θ); pPos[i*3+2]=r*Math.cos(φ);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos,3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color:0x7effd4, size:0.022, transparent:true, opacity:0.26 })));

    const raycaster = new THREE.Raycaster();
    raycaster.params.Sprite = { threshold:0.3 };
    const mouse = new THREE.Vector2();

    function getHit(e) {
      const rect = container.getBoundingClientRect();
      mouse.x  =  ((e.clientX-rect.left)/rect.width)*2-1;
      mouse.y  = -((e.clientY-rect.top)/rect.height)*2+1;
      raycaster.setFromCamera(mouse, camera);
      const sprites = (sceneRef.current.dotMeshes||[]).map(d=>d.sprite);
      return raycaster.intersectObjects(sprites);
    }

    function onScroll(){
      const el=container.closest("section")||container.parentElement;
      const rect=el.getBoundingClientRect();
      const tot=el.offsetHeight-window.innerHeight;
      const p=Math.max(0,Math.min(1,-rect.top/Math.max(1,tot)));
      targetRot.current.y=p*Math.PI*4; targetRot.current.x=p*Math.PI*.7-.2;
      setScrollPct(Math.round(p*100));
    }
    window.addEventListener("scroll",onScroll,{passive:true});

    function onDown(e){ isDrag.current=true; lastPtr.current={x:e.clientX,y:e.clientY}; container.style.cursor="grabbing"; }
    function onMove(e){
      if(isDrag.current){
        targetRot.current.y+=(e.clientX-lastPtr.current.x)*0.007;
        targetRot.current.x+=(e.clientY-lastPtr.current.y)*0.007;
        lastPtr.current={x:e.clientX,y:e.clientY};
      }
      const hits=getHit(e);
      if(hits.length>0){ setHovered(hits[0].object.userData.skillIndex); container.style.cursor="pointer"; }
      else{ setHovered(null); container.style.cursor=isDrag.current?"grabbing":"grab"; }
    }
    function onUp(e){
      if(!isDrag.current)return; isDrag.current=false; container.style.cursor="grab";
      const hits=getHit(e);
      if(hits.length>0){
        const idx=hits[0].object.userData.skillIndex;
        setActive(a=>a===idx?null:idx);
        setActiveBar(prev => prev === skills[idx].name ? null : skills[idx].name);
      }
    }
    container.addEventListener("pointerdown",onDown);
    window.addEventListener("pointermove",onMove);
    window.addEventListener("pointerup",onUp);

    function onResize(){
      const W2=container.clientWidth,H2=container.clientHeight;
      camera.aspect=W2/H2; camera.updateProjectionMatrix(); renderer.setSize(W2,H2);
    }
    window.addEventListener("resize",onResize);

    sceneRef.current = { ...sceneRef.current, renderer, scene, camera, core, wireA, wireB, pA, pB, pC, group };

    let raf, t=0;
    const v3=new THREE.Vector3();
    function animate(){
      raf=requestAnimationFrame(animate); t+=0.008;
      curRot.current.x+=(targetRot.current.x-curRot.current.x)*0.055;
      curRot.current.y+=(targetRot.current.y-curRot.current.y)*0.055;
      if(!isDrag.current) targetRot.current.y+=0.0018;

      core.rotation.x=curRot.current.x; core.rotation.y=curRot.current.y;
      wireA.rotation.x=curRot.current.x; wireA.rotation.y=curRot.current.y;
      wireB.rotation.y=-curRot.current.y*.25+t*.12; wireB.rotation.x=curRot.current.x*.15;
      group.rotation.x=curRot.current.x; group.rotation.y=curRot.current.y;

      pA.position.x=Math.cos(t*.35)*5; pA.position.z=Math.sin(t*.35)*5;
      pB.position.x=Math.cos(t*.28+2)*-4.5; pB.position.z=Math.sin(t*.28+2)*3.5;
      pA.intensity=2.5+Math.sin(t*1.1)*.7; pB.intensity=2+Math.cos(t*.9)*.6;

      const dm=sceneRef.current.dotMeshes||[];
      const W2=container.clientWidth, H2=container.clientHeight;
      const newPos=[];
      dm.forEach(({sprite,skillIndex})=>{
        const isHov=sceneRef.current._hov===skillIndex, isAct=sceneRef.current._act===skillIndex;
        const tgt=isHov||isAct?0.96:0.72;
        sprite.scale.x+=(tgt-sprite.scale.x)*.12; sprite.scale.y=sprite.scale.x;
        v3.setFromMatrixPosition(sprite.matrixWorld); v3.project(camera);
        newPos.push({ x:(v3.x*.5+.5)*W2, y:(-v3.y*.5+.5)*H2, z:v3.z, skillIndex });
      });
      setNodePos([...newPos]);
      renderer.render(scene,camera);
    }
    animate();

    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll",onScroll);
      window.removeEventListener("pointermove",onMove);
      window.removeEventListener("pointerup",onUp);
      window.removeEventListener("resize",onResize);
      container.removeEventListener("pointerdown",onDown);
      renderer.dispose();
      if(container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  },[]);

  useEffect(()=>{ if(sceneRef.current){ sceneRef.current._act=active; } },[active]);
  useEffect(()=>{ if(sceneRef.current){ sceneRef.current._hov=hovered; } },[hovered]);

  const activeSkill  = active  !==null ? skills[active]  : null;
  const hoveredSkill = hovered !==null ? skills[hovered] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        #sk3d,#sk3d *{box-sizing:border-box;}
        @keyframes sk-fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes sk-cardIn{from{opacity:0;transform:translate(-50%,14px) scale(.96)}to{opacity:1;transform:translate(-50%,0) scale(1)}}
        @keyframes sk-nodePop{0%{transform:translate(-50%,-50%) scale(.65);opacity:0}65%{transform:translate(-50%,-50%) scale(1.1);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        @keyframes sk-progFill{from{width:0}}
        @keyframes sk-glowPulse{0%,100%{opacity:.65}50%{opacity:1}}
        @keyframes sk-orbiting{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes sk-panelIn{from{opacity:0;transform:translateY(-50%) translateX(-18px)}to{opacity:1;transform:translateY(-50%) translateX(0)}}
        @keyframes sk-panelInR{from{opacity:0;transform:translateY(-50%) translateX(18px)}to{opacity:1;transform:translateY(-50%) translateX(0)}}
        .sk-node{position:absolute;transform:translate(-50%,-50%);pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:3px;}
        .sk-pill{font-family:'JetBrains Mono',monospace;font-size:9.5px;font-weight:500;letter-spacing:.06em;padding:3px 10px;border-radius:20px;white-space:nowrap;backdrop-filter:blur(10px);border:1px solid;transition:transform .2s,box-shadow .2s,opacity .2s;}
        .sk-side-left{animation:sk-panelIn .7s cubic-bezier(.16,1,.3,1) both;}
        .sk-side-right{animation:sk-panelInR .7s cubic-bezier(.16,1,.3,1) both;}
        @media(max-width:900px){.sk-side-panel{display:none!important;}}
      `}</style>

      <section id="sk3d" style={{
        width:"100vw", marginLeft:"calc(-50vw + 50%)", height:"100vh",
        background:"#06060f", fontFamily:"'Space Grotesk',sans-serif", color:"#fff",
        position:"relative", overflow:"hidden",
        display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"flex-start",
      }}>
        {/* bg glow */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          background:"radial-gradient(ellipse 72% 65% at 50% 52%,rgba(126,255,212,.055) 0%,transparent 62%),radial-gradient(ellipse 50% 45% at 16% 80%,rgba(192,159,255,.065) 0%,transparent 55%),radial-gradient(ellipse 42% 38% at 84% 18%,rgba(56,189,248,.048) 0%,transparent 55%)"}}/>
        {/* scanlines */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:28,opacity:.016,
          backgroundImage:"repeating-linear-gradient(0deg,rgba(255,255,255,.22) 0px,rgba(255,255,255,.22) 1px,transparent 1px,transparent 4px)"}}/>

        {/* ── LEFT-ALIGNED HEADER ── */}
        <div style={{
          position:"absolute",top:30,left:"clamp(36px,4vw,56px)",zIndex:22,
          display:"flex",flexDirection:"column",alignItems:"flex-start",
          animation:"sk-fadeUp .65s ease both",
        }}>
          {/* eyebrow */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={{width:22,height:1,background:"linear-gradient(90deg,transparent,#7effd4bb)"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8.5,letterSpacing:".42em",textTransform:"uppercase",color:"#7effd4",opacity:.75}}>tech · stack</span>
          </div>
          <h2 style={{margin:0,fontSize:"clamp(22px,3.2vw,42px)",fontWeight:700,letterSpacing:"-.03em",lineHeight:1.05,textAlign:"left"}}>
            Skills &amp;{" "}
            <span style={{background:"linear-gradient(118deg,#c09fff 0%,#7effd4 55%,#38bdf8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Expertise</span>
          </h2>
          <p style={{marginTop:8,fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"rgba(255,255,255,.28)",letterSpacing:".06em"}}>drag to rotate · click icons · scroll to spin</p>
        </div>

        {/* Stats — now under heading, left-aligned */}
        <div style={{
          position:"absolute",top:130,left:"clamp(36px,4vw,56px)",zIndex:22,
          display:"flex",flexDirection:"row",gap:18,
          animation:"sk-fadeUp .7s ease both",
        }}>
          {[{v:skills.length,l:"skills",c:"#7effd4"},{v:"5+",l:"yrs exp",c:"#c09fff"},{v:"3",l:"domains",c:"#38bdf8"}].map(s=>(
            <div key={s.l} style={{display:"flex",alignItems:"baseline",gap:5}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:500,color:s.c,lineHeight:1,textShadow:`0 0 16px ${s.c}55`}}>{s.v}</span>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:7.5,color:"rgba(255,255,255,.22)",letterSpacing:".14em",textTransform:"uppercase"}}>{s.l}</span>
            </div>
          ))}
        </div>

      

        {/* THREE canvas */}
        <div ref={mountRef} style={{position:"absolute",inset:0,zIndex:10,cursor:"grab",opacity:loaded?1:0,transition:"opacity .9s ease"}}/>

        {/* ── LEFT SIDE PANEL ── */}
        <div className="sk-side-panel sk-side-left" style={{
          position:"absolute",
          top:"50%",
          left:0,
          transform:"translateY(-50%)",
          zIndex:22,
          width:"clamp(280px,13vw,396px)",
          padding:"16px 12px 16px 14px",
          borderRadius:"0 16px 16px 0",
          background:"rgba(6,6,18,0.72)",
          backdropFilter:"blur(18px)",
          border:"1px solid rgba(255,255,255,0.07)",
          borderLeft:"none",
        }}>
          <div style={{
            fontFamily:"'JetBrains Mono',monospace",fontSize:7.5,
            letterSpacing:"1.22em",textTransform:"uppercase",
            color:"rgba(255,255,255,0.2)",marginBottom:10,paddingLeft:2,
          }}>Core</div>
          {leftSkills.map(sk => (
            <SkillBar key={sk.name} sk={sk} active={activeBar} hovered={null} onClick={handleBarClick} loaded={loaded}/>
          ))}
        </div>

        {/* ── RIGHT SIDE PANEL ── */}
        <div className="sk-side-panel sk-side-right" style={{
          position:"absolute",
          top:"50%",
          right:0,
          transform:"translateY(-50%)",
          zIndex:22,
          width:"clamp(280px,13vw,396px)",
          padding:"16px 14px 16px 12px",
          borderRadius:"16px 0 0 16px",
          background:"rgba(6,6,18,0.72)",
          backdropFilter:"blur(18px)",
          border:"1px solid rgba(255,255,255,0.07)",
          borderRight:"none",
        }}>
          <div style={{
            fontFamily:"'JetBrains Mono',monospace",fontSize:7.5,
            letterSpacing:".22em",textTransform:"uppercase",
            color:"rgba(255,255,255,0.2)",marginBottom:10,paddingLeft:2,
          }}>Tools</div>
          {rightSkills.map(sk => (
            <SkillBar key={sk.name} sk={sk} active={activeBar} hovered={null} onClick={handleBarClick} loaded={loaded}/>
          ))}
        </div>

        {/* Node labels */}
        <div style={{position:"absolute",inset:0,zIndex:18,pointerEvents:"none"}}>
          {nodePos.map(({x,y,z,skillIndex})=>{
            if(z>1) return null;
            const sk=skills[skillIndex], isHov=hovered===skillIndex, isAct=active===skillIndex;
            const ll=levelLabel(sk.level), behind=z>0.97;
            return (
              <div key={skillIndex} className="sk-node"
                style={{left:x,top:y,opacity:behind?.28:(isHov||isAct?1:0.48),zIndex:isHov||isAct?6:1,
                  animation:isAct?"sk-nodePop .32s cubic-bezier(.16,1,.3,1) both":undefined}}>

                {(isHov||isAct) && (
                  <div style={{
                    position:"absolute",left:0,top:0,
                    width:58,height:58,borderRadius:"50%",
                    border:`1px dashed ${sk.color}55`,
                    transform:"translate(-50%,-50%)",
                    animation:"sk-orbiting 3s linear infinite",
                    pointerEvents:"none",
                  }}/>
                )}

                <div className="sk-pill" style={{
                  color:sk.color,
                  borderColor:isHov||isAct?`${sk.color}88`:`${sk.color}30`,
                  background:isHov||isAct?"rgba(4,4,16,.82)":"rgba(4,4,16,.58)",
                  transform:isHov||isAct?"scale(1.1)":"scale(1)",
                  boxShadow:isHov||isAct?`0 0 18px ${sk.color}44,0 2px 14px rgba(0,0,0,.6)`:"none",
                  marginTop:44,
                }}>{sk.name}</div>

                {(isHov||isAct) && (
                  <div style={{display:"flex",gap:4,marginTop:3}}>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,padding:"2px 7px",borderRadius:12,
                      color:"rgba(255,255,255,.4)",background:"rgba(0,0,0,.62)",border:"1px solid rgba(255,255,255,.1)",letterSpacing:".05em"}}>{sk.tag}</span>
                    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,padding:"2px 7px",borderRadius:12,
                      color:ll.c,background:"rgba(0,0,0,.62)",border:`1px solid ${ll.c}44`,letterSpacing:".05em"}}>{ll.t}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active detail card */}
        {activeSkill && (
          <div key={active} style={{
            position:"absolute",bottom:42,left:"50%",zIndex:26,width:"min(430px,90vw)",
            background:"rgba(6,6,18,.94)",border:`1px solid ${activeSkill.color}44`,borderRadius:18,padding:"22px 24px",
            backdropFilter:"blur(24px)",
            boxShadow:`0 0 0 1px ${activeSkill.color}16,0 14px 70px ${activeSkill.color}20,inset 0 1px 0 rgba(255,255,255,.05)`,
            animation:"sk-cardIn .3s cubic-bezier(.16,1,.3,1) both",
          }}>
            <div style={{height:2,margin:"-22px -24px 18px",borderRadius:"18px 18px 0 0",
              background:`linear-gradient(90deg,transparent,${activeSkill.color},transparent)`}}/>

            <div style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:16}}>
              <div style={{width:54,height:54,flexShrink:0,borderRadius:14,
                background:"rgba(0,0,0,.5)",border:`1px solid ${activeSkill.color}44`,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`0 0 22px ${activeSkill.color}20,inset 0 1px 0 rgba(255,255,255,.04)`}}>
                <svg viewBox="0 0 40 40" width="32" height="32" dangerouslySetInnerHTML={{__html:activeSkill.svgPath}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{fontSize:18,fontWeight:700,letterSpacing:"-.02em"}}>{activeSkill.name}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:30,fontWeight:400,color:activeSkill.color,lineHeight:1,letterSpacing:"-.04em",textShadow:`0 0 24px ${activeSkill.color}88`}}>
                    {activeSkill.level}<span style={{fontSize:13,opacity:.4}}>%</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
                  {[
                    {t:activeSkill.tag,c:activeSkill.color},
                    {t:levelLabel(activeSkill.level).t,c:levelLabel(activeSkill.level).c},
                    {t:`${activeSkill.years} yrs`,c:"rgba(255,255,255,.3)"},
                  ].map(b=>(
                    <span key={b.t} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8.5,padding:"2px 9px",borderRadius:20,
                      color:b.c,background:"rgba(0,0,0,.45)",border:`1px solid ${b.c}40`,letterSpacing:".05em"}}>{b.t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{height:5,borderRadius:99,background:"rgba(255,255,255,.07)",overflow:"hidden",marginBottom:10}}>
              <div style={{height:"100%",borderRadius:99,width:`${activeSkill.level}%`,
                background:`linear-gradient(90deg,${activeSkill.color}77,${activeSkill.color})`,
                boxShadow:`0 0 10px ${activeSkill.color}66`,animation:"sk-progFill .9s cubic-bezier(.16,1,.3,1) both"}}/>
            </div>

            <div style={{display:"flex",gap:3,marginBottom:14}}>
              {Array.from({length:10}).map((_,i)=>(
                <div key={i} style={{flex:1,height:3,borderRadius:99,
                  background:i<Math.round(activeSkill.level/10)?activeSkill.color:"rgba(255,255,255,.07)",
                  opacity:i<Math.round(activeSkill.level/10)?(0.35+i*.07):1,
                  transition:`background .4s ${i*.04}s`}}/>
              ))}
            </div>

            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,color:"rgba(255,255,255,.18)",textAlign:"center",letterSpacing:".12em"}}>CLICK NODE TO CLOSE</div>
          </div>
        )}

        {/* hover hint */}
        {hoveredSkill && active===null && (
          <div style={{position:"absolute",bottom:42,left:"50%",transform:"translateX(-50%)",zIndex:24,
            fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"rgba(255,255,255,.32)",
            letterSpacing:".08em",pointerEvents:"none",animation:"sk-fadeUp .2s ease both"}}>
            click to inspect{" "}<span style={{color:hoveredSkill.color}}>{hoveredSkill.name}</span>
          </div>
        )}

       
      </section>
    </>
  );
}