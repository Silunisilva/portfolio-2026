"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const BLUE   = "#15A6D8";
const PURPLE = "#7145EA";
const BG     = "#0d0b1a";
const CARD_BG= "#13112a";
const SPOKE  = "#2a2060";

interface Project {
  name: string; role: string; accentIdx: number;
  emoji: string; video: string; description?: string; thumbnail?: string; image?: string;
}

const PROJECTS: Project[] = [
  { name: "Carelixa", role: "React · Node.js",  accentIdx: 0, emoji: "🛍️", video: "/videos/Carelixa.mp4", thumbnail: "/thumbnails/9.svg", image: "/thumbnails/Carelixa.png", description: "Full-stack e-commerce solution with real-time inventory and payment processing." },
  { name: "BookNook",      role: "Vue · Tailwind",   accentIdx: 1, emoji: "📚", video: "/videos/BookNook.mp4", thumbnail: "/thumbnails/10.svg", image: "/thumbnails/BookNook.png", description: "Analytics dashboard for enterprise clients with customizable widgets." },
  { name: "Smart-Navigator",      role: "Next.js · GSAP",   accentIdx: 0, emoji: "✦",  video: "/videos/Smart-Navigator.mp4", thumbnail: "/thumbnails/11.svg", image: "/thumbnails/Smart-Navigator.png", description: "Interactive portfolio with smooth animations and 3D elements." },
  { name: "Coffee House",         role: "React Native",     accentIdx: 1, emoji: "☕", video: "/videos/Coffee House.mp4", thumbnail: "/thumbnails/12.svg", image: "/thumbnails/Coffee House.png", description: "Cross-platform booking system with calendar integration." },
  { name: "PHP Login System",   role: "Webflow · CMS",    accentIdx: 0, emoji: "", video: "/videos/PHP Login System.mp4", thumbnail: "/thumbnails/13.svg", image: "/thumbnails/PHP Login System.png", description: "High-conversion landing page with CMS integration." },
];

function accent(idx: number) { return idx % 2 === 0 ? BLUE : PURPLE; }

const NUM = PROJECTS.length, SPOKE_COUNT = 28;
const LOGICAL_W = 600, LOGICAL_H = 600;
const ORBIT_R = 210, WHEEL_R = 240, WCX = 300, WCY = 300;

function getBaseAngle(i: number) { return (i / NUM) * Math.PI * 2 - Math.PI / 2; }

interface CardStyle { left:number; top:number; scale:number; rotate:number; zIndex:number; opacity:number; isActive:boolean; }

function computeCardStyles(rotation: number): CardStyle[] {
  return PROJECTS.map((_, i) => {
    const angle = getBaseAngle(i) + rotation;
    const x = LOGICAL_W/2 + Math.cos(angle) * ORBIT_R;
    const y = LOGICAL_H/2 + Math.sin(angle) * ORBIT_R;
    const norm = ((angle % (Math.PI*2)) + Math.PI*2) % (Math.PI*2);
    const dist = Math.abs(norm - Math.PI*1.5);
    const isActive = dist < 0.4;
    const scale = isActive ? 1.2 : 0.7 + 0.2*Math.cos(dist);
    return {
      left: x-70, top: y-65, scale,
      rotate: (angle*180)/Math.PI+90,
      zIndex: Math.round(10+scale*10),
      opacity: 0.4+0.6*((scale-0.7)/0.5),
      isActive,
    };
  });
}

function snapDelta(rotation: number) {
  let best = Infinity;
  for (let i = 0; i < NUM; i++) {
    const norm = ((getBaseAngle(i)+rotation)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
    const d = ((Math.PI*1.5-norm+Math.PI)%(Math.PI*2))-Math.PI;
    if (Math.abs(d) < Math.abs(best)) best = d;
  }
  return best;
}

const SPOKES_DATA = Array.from({length:SPOKE_COUNT},(_,i)=>{
  const a=(i/SPOKE_COUNT)*Math.PI*2;
  return {x2:WCX+Math.cos(a)*WHEEL_R, y2:WCY+Math.sin(a)*WHEEL_R};
});

// ── WheelSVG ─────────────────────────────────────────────────────────────────
function WheelSVG({rotation}:{rotation:number}) {
  return (
    <svg viewBox={`0 0 ${LOGICAL_W} ${LOGICAL_H}`} fill="none"
      style={{position:"absolute",inset:0,width:"100%",height:"100%",
        transform:`rotate(${rotation*(180/Math.PI)}deg)`,
        transition:"transform 0.05s linear",pointerEvents:"none"}}>
      <defs>
        <linearGradient id="rimG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={BLUE}   stopOpacity="0.8"/>
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0.8"/>
        </linearGradient>
      </defs>
      <circle cx={WCX} cy={WCY} r={WHEEL_R} stroke="url(#rimG)" strokeWidth="2"/>
      {SPOKES_DATA.map((s,i)=>(
        <line key={i} x1={WCX} y1={WCY} x2={s.x2} y2={s.y2} stroke={SPOKE} strokeWidth="0.8"/>
      ))}
      <circle cx={WCX} cy={WCY} r={28} fill={PURPLE} fillOpacity="0.15" stroke={PURPLE} strokeWidth="1.5"/>
      <circle cx={WCX} cy={WCY} r={10} fill={BG} stroke={BLUE} strokeWidth="1.5"/>
    </svg>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({project,style,onClick}:{project:Project;style:CardStyle;onClick:()=>void}) {
  const color = accent(project.accentIdx);
  return (
    <div onClick={onClick} style={{
      position:"absolute",width:140,background:CARD_BG,borderRadius:8,
      border:style.isActive?`1.5px solid ${color}`:`1px solid ${SPOKE}`,
      boxShadow:style.isActive?`0 0 24px ${color}66,0 8px 32px rgba(0,0,0,.5)`:"0 4px 16px rgba(0,0,0,.4)",
      cursor:"pointer",overflow:"hidden",left:style.left,top:style.top,
      transform:`scale(${style.scale}) rotate(${style.rotate}deg)`,
      zIndex:style.zIndex,opacity:style.opacity,
      transition:"border-color .3s,box-shadow .3s,transform .2s"}}>
      <div style={{height:4,background:color}}/>
      <div style={{width:"100%",height:80,background:`linear-gradient(135deg,${color}22,${color}55)`,
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,overflow:"hidden"}}>
        {/* FIX: use thumbnail (SVG) for the card, not image (PNG) */}
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        ) : (
          project.emoji
        )}
      </div>
      <div style={{padding:"8px 10px 10px"}}>
        <div style={{width:20,height:1.5,background:color,marginBottom:5}}/>
        <div style={{fontSize:9,fontWeight:600,letterSpacing:.5,color:"#e8e4ff",textTransform:"uppercase"}}>{project.name}</div>
        <div style={{fontSize:8,color:"#6b6898",marginTop:2}}>{project.role}</div>
      </div>
    </div>
  );
}

// ── VideoPopup — portal-based full-screen overlay ────────────────────────────
function VideoPopup({project,onClose}:{project:Project|null;onClose:()=>void}) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const color     = project ? accent(project.accentIdx) : BLUE;

  useEffect(()=>{ setMounted(true); },[]);

  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",h);
    return ()=>window.removeEventListener("keydown",h);
  },[onClose]);

  useEffect(()=>{
    if(!project && videoRef.current) videoRef.current.pause();
  },[project]);

  if(!mounted || !project) return null;

  const overlay=(
    <div
      onClick={onClose}
      style={{
        position:"fixed",inset:0,zIndex:99999,
        background:"rgba(8,6,20,0.93)",backdropFilter:"blur(14px)",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:24,animation:"wr-fade-in .22s ease",
      }}>
      <div
        onClick={e=>e.stopPropagation()}
        style={{
          width:"min(900px,94vw)",background:CARD_BG,borderRadius:20,overflow:"hidden",
          border:`1px solid ${color}55`,
          boxShadow:`0 0 70px ${color}30,0 28px 90px rgba(0,0,0,.85)`,
          animation:"wr-pop-in .26s cubic-bezier(.34,1.56,.64,1)",
        }}>
        <div style={{width:"100%",aspectRatio:"16/9",background:"#050412",position:"relative"}}>
          {project.video
            ? <video ref={videoRef} src={project.video} controls autoPlay
                style={{width:"100%",height:"100%",objectFit:"contain",display:"block"}}/>
            : <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",gap:16,
                background:`linear-gradient(135deg,${color}10,${PURPLE}10)`}}>
                <span style={{fontSize:72,color,opacity:.45}}>▶</span>
                <span style={{fontSize:14,color:"#4a4770"}}>No video URL set for this project</span>
                <span style={{fontSize:11,color:"#3a3560",maxWidth:320,textAlign:"center"}}>
                  Add a <code style={{color,background:`${color}18`,padding:"1px 6px",borderRadius:4}}>video</code> URL in the PROJECTS array
                </span>
              </div>}
          <button
            onClick={onClose}
            style={{position:"absolute",top:14,right:14,width:36,height:36,borderRadius:"50%",
              background:"rgba(13,11,26,.85)",backdropFilter:"blur(6px)",
              border:`1px solid ${SPOKE}`,display:"flex",alignItems:"center",justifyContent:"center",
              cursor:"pointer",color:"#8880b0",fontSize:18,transition:"border-color .2s,color .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.color=color;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=SPOKE;e.currentTarget.style.color="#8880b0";}}>
            ✕
          </button>
        </div>
        <div style={{padding:"18px 26px",borderTop:`1px solid ${color}22`,display:"flex",alignItems:"center",gap:14}}>
          {/* Popup footer: use image (PNG) for the full-size preview */}
          {project.image ? (
            <img src={project.image} alt={project.name} style={{width:32,height:32,borderRadius:4,objectFit:"cover",flexShrink:0}}/>
          ) : (
            <span style={{fontSize:32}}>{project.emoji}</span>
          )}
          <div style={{flex:1,minWidth:0}}>
            <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color,margin:0,letterSpacing:.5}}>
              {project.name}
            </h3>
            <p style={{fontSize:11,color:"#6b6898",margin:"2px 0 0"}}>{project.role}</p>
          </div>
          <span style={{fontSize:10,color:"#3a3560",letterSpacing:.5,flexShrink:0}}>ESC to close</span>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

// ── VideoPanel — right-hand preview card ──────────────────────────────────────
function VideoPanel({project,onPlayClick}:{project:Project|null;onPlayClick:()=>void}) {
  const color = project ? accent(project.accentIdx) : BLUE;
  const canPlay = !!project;

  return (
    <div style={{
      width:"100%",height:"100%",display:"flex",flexDirection:"column",
      borderRadius:20,overflow:"hidden",border:`1px solid ${color}44`,
      background:`linear-gradient(135deg,${color}08,${BG})`,
      boxShadow:"0 8px 32px rgba(0,0,0,.3)",transition:"border-color .4s,background .5s",
      boxSizing:"border-box",
    }}>
      <div
        onClick={canPlay ? onPlayClick : undefined}
        style={{
          flex:1,minHeight:0,background:"#0a0817",position:"relative",
          cursor:canPlay?"pointer":"default",overflow:"hidden",
        }}>
        {project ? (
          <>
            {/* VideoPanel preview: use image (PNG) */}
            {project.image ? (
              <img src={project.image} alt={project.name} style={{
                position:"absolute",inset:0,width:"100%",height:"100%",
                objectFit:"cover",opacity:0.9,
              }}/>
            ) : (
              <div style={{
                position:"absolute",inset:0,display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",gap:16,
                background:`linear-gradient(135deg,${color}12,${PURPLE}12)`,
              }}>
                <div style={{
                  width:88,height:88,borderRadius:"50%",flexShrink:0,
                  background:`${color}18`,border:`1.5px solid ${color}44`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,
                }}>{project.emoji}</div>
                <span style={{fontSize:13,color,opacity:.7,letterSpacing:.5}}>Click to play</span>
              </div>
            )}
            <div
              style={{
                position:"absolute",inset:0,display:"flex",alignItems:"center",
                justifyContent:"center",background:"rgba(13,11,26,.1)",transition:"background .2s",
              }}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background="rgba(13,11,26,.32)"}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="rgba(13,11,26,.1)"}>
              <div
                style={{
                  width:76,height:76,borderRadius:"50%",flexShrink:0,
                  background:`${color}22`,border:`1.5px solid ${color}88`,
                  backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:30,color,boxShadow:`0 0 32px ${color}44`,transition:"transform .2s,box-shadow .2s",
                }}
                onMouseEnter={e=>{const d=e.currentTarget;d.style.transform="scale(1.12)";d.style.boxShadow=`0 0 52px ${color}66`;}}
                onMouseLeave={e=>{const d=e.currentTarget;d.style.transform="scale(1)";d.style.boxShadow=`0 0 32px ${color}44`;}}>
                ▶
              </div>
            </div>
          </>
        ) : (
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",gap:14}}>
            <div style={{fontSize:60,opacity:.1}}>🎬</div>
            <p style={{color:"#3a3560",fontSize:13,margin:0,letterSpacing:.3}}>Select a project to preview</p>
          </div>
        )}
      </div>

      <div style={{
        flexShrink:0,height:120,minHeight:120,maxHeight:120,
        padding:"0 24px",borderTop:`1px solid ${color}22`,
        display:"flex",flexDirection:"column",justifyContent:"center",
        gap:6,transition:"border-color .4s",boxSizing:"border-box",overflow:"hidden",
      }}>
        {project ? (
          <>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {/* Footer icon: use image (PNG) */}
              {project.image ? (
                <img src={project.image} alt={project.name} style={{width:26,height:26,borderRadius:3,objectFit:"cover",flexShrink:0}}/>
              ) : (
                <span style={{fontSize:26,flexShrink:0,lineHeight:1}}>{project.emoji}</span>
              )}
              <div style={{minWidth:0,flex:1}}>
                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color,margin:0,letterSpacing:.5,
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {project.name}
                </h3>
                <p style={{fontSize:11,color:"#6b6898",margin:"2px 0 0",
                  overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                  {project.role}
                </p>
              </div>
            </div>
            <p style={{fontSize:12,color:"#a0a0c0",lineHeight:1.5,margin:0,
              display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
              {project.description}
            </p>
          </>
        ) : (
          <p style={{fontSize:12,color:"#3a3560",margin:0,textAlign:"center"}}>
            Spin the wheel and click a card
          </p>
        )}
      </div>
    </div>
  );
}

// ── ResizeObserver scaler ─────────────────────────────────────────────────────
function OrbitScaler({logicalSize}:{logicalSize:number}) {
  useEffect(()=>{
    const els = document.querySelectorAll<HTMLElement>(".wr-orbit");
    if(!els.length) return;
    const ro = new ResizeObserver(entries=>{
      for(const e of entries){
        const w = e.contentRect.width || logicalSize;
        const inner = e.target.querySelector<HTMLElement>("[data-orbit-inner]");
        if(inner) inner.style.transform=`translate(-50%,-50%) scale(${w/logicalSize})`;
      }
    });
    els.forEach(el=>ro.observe(el));
    return()=>ro.disconnect();
  },[logicalSize]);
  return null;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function WorkReelShowcase() {
  const [rotation, setRotation]               = useState(0);
  const [activeIdx, setActiveIdx]             = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project|null>(null);
  const [popupProject, setPopupProject]       = useState<Project|null>(null);

  const isDragging=useRef(false), lastAngle=useRef(0), lastTime=useRef(0);
  const velocity=useRef(0), animFrame=useRef<number>(0), areaRef=useRef<HTMLDivElement>(null);
  const rotRef=useRef(rotation); rotRef.current=rotation;
  const selectedProjectRef=useRef<Project|null>(null); selectedProjectRef.current=selectedProject;

  const getAngle=useCallback((cx:number,cy:number)=>{
    if(!areaRef.current) return 0;
    const r=areaRef.current.getBoundingClientRect();
    return Math.atan2(cy-(r.top+r.height/2), cx-(r.left+r.width/2));
  },[]);

  const runAnimation=useCallback(()=>{
    if(isDragging.current) return;
    const snap=snapDelta(rotRef.current);
    if(Math.abs(velocity.current)<0.002&&Math.abs(snap)<0.01){
      setRotation(r=>r+snap*0.15); return;
    }
    velocity.current=velocity.current*0.92+snap*0.03;
    setRotation(r=>r+velocity.current);
    animFrame.current=requestAnimationFrame(runAnimation);
  },[]);

  useEffect(()=>{
    const styles=computeCardStyles(rotation);
    const idx=styles.findIndex(s=>s.isActive);
    if(idx!==-1){ setActiveIdx(idx); if(!selectedProject) setSelectedProject(PROJECTS[idx]); }
  },[rotation, selectedProject]);

  const onMD=useCallback((e:React.MouseEvent)=>{isDragging.current=true;lastAngle.current=getAngle(e.clientX,e.clientY);lastTime.current=Date.now();velocity.current=0;cancelAnimationFrame(animFrame.current);},[getAngle]);
  const onMM=useCallback((e:MouseEvent)=>{if(!isDragging.current)return;const a=getAngle(e.clientX,e.clientY);let d=a-lastAngle.current;if(d>Math.PI)d-=Math.PI*2;if(d<-Math.PI)d+=Math.PI*2;const now=Date.now();velocity.current=(d/Math.max(1,now-lastTime.current))*16;lastAngle.current=a;lastTime.current=now;setRotation(r=>r+d);},[getAngle]);
  const onMU=useCallback(()=>{if(!isDragging.current)return;isDragging.current=false;animFrame.current=requestAnimationFrame(runAnimation);},[runAnimation]);
  const onTS=useCallback((e:React.TouchEvent)=>{isDragging.current=true;lastAngle.current=getAngle(e.touches[0].clientX,e.touches[0].clientY);lastTime.current=Date.now();velocity.current=0;cancelAnimationFrame(animFrame.current);},[getAngle]);
  const onTM=useCallback((e:TouchEvent)=>{if(!isDragging.current)return;const a=getAngle(e.touches[0].clientX,e.touches[0].clientY);let d=a-lastAngle.current;if(d>Math.PI)d-=Math.PI*2;if(d<-Math.PI)d+=Math.PI*2;const now=Date.now();velocity.current=(d/Math.max(1,now-lastTime.current))*16;lastAngle.current=a;lastTime.current=now;setRotation(r=>r+d);},[getAngle]);
  const onTE=useCallback(()=>{if(!isDragging.current)return;isDragging.current=false;animFrame.current=requestAnimationFrame(runAnimation);},[runAnimation]);

  useEffect(()=>{
    window.addEventListener("mousemove",onMM);
    window.addEventListener("mouseup",onMU);
    window.addEventListener("touchmove",onTM,{passive:true});
    window.addEventListener("touchend",onTE);
    return()=>{
      window.removeEventListener("mousemove",onMM);
      window.removeEventListener("mouseup",onMU);
      window.removeEventListener("touchmove",onTM);
      window.removeEventListener("touchend",onTE);
    };
  },[onMM,onMU,onTM,onTE]);

  useEffect(()=>{
    animFrame.current=requestAnimationFrame(runAnimation);
    return()=>cancelAnimationFrame(animFrame.current);
  },[runAnimation]);

  const cardStyles   = computeCardStyles(rotation);
  const activeAccent = accent(PROJECTS[activeIdx]?.accentIdx??0);

  const handleCardClick=(project:Project)=>{
    setSelectedProject(project);
    const idx=PROJECTS.findIndex(p=>p.name===project.name);
    if(idx!==-1&&idx!==activeIdx){
      for(let i=0;i<NUM;i++){
        const norm=((getBaseAngle(i)+rotation)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
        if(Math.abs(norm-Math.PI*1.5)<0.4){
          const delta=((getBaseAngle(idx)-getBaseAngle(i)+Math.PI)%(Math.PI*2))-Math.PI;
          setRotation(rotation-delta); break;
        }
      }
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes wr-fade-in { from{opacity:0} to{opacity:1} }
        @keyframes wr-pop-in  { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }

        .wr-outer {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .wr-root {
          position: relative;
          width: 100%;
          background: ${BG};
          border-radius: 20px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          user-select: none;
          box-sizing: border-box;
          padding: 48px 32px 64px;
        }

        .wr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 840px;
          gap: 28px;
          width: 100%;
          align-items: stretch;
        }

        .wr-wheel-col {
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .wr-video-col {
          min-width: 0;
          overflow: hidden;
        }

        .wr-orbit {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: 840px;
          cursor: grab;
          overflow: visible;
        }
        .wr-orbit:active { cursor: grabbing; }

        @media (max-width: 960px) {
          .wr-outer { padding: 0 16px; }
          .wr-root  { padding: 32px 20px 52px; }
          .wr-grid  {
            grid-template-columns: 1fr;
            grid-template-rows: 600px auto;
            gap: 20px;
          }
          .wr-orbit { max-height: 600px; }
          .wr-video-col { height: 440px; }
        }

        @media (max-width: 560px) {
          .wr-outer { padding: 0 10px; }
          .wr-root  { padding: 24px 14px 48px; border-radius: 14px; }
          .wr-grid  {
            grid-template-rows: 420px auto;
            gap: 16px;
          }
          .wr-orbit { max-height: 420px; }
          .wr-video-col { height: 380px; }
        }
      `}</style>

      <div className="wr-outer">
        <div className="wr-root">
          <div style={{position:"absolute",left:"30%",top:"50%",transform:"translate(-50%,-50%)",
            width:900,height:900,borderRadius:"50%",pointerEvents:"none",
            background:`radial-gradient(circle,${PURPLE}13 0%,transparent 70%)`}}/>

          <div className="wr-grid">
            {/* ── wheel column ── */}
            <div className="wr-wheel-col">
              <div ref={areaRef} className="wr-orbit" onMouseDown={onMD} onTouchStart={onTS}>
                <WheelSVG rotation={rotation}/>
                <div style={{position:"absolute",inset:0,overflow:"visible"}}>
                  <div
                    data-orbit-inner
                    style={{
                      position:"absolute",width:LOGICAL_W,height:LOGICAL_H,
                      top:"50%",left:"50%",
                      transform:"translate(-50%,-50%) scale(1)",
                      transformOrigin:"center center",
                      overflow:"visible",
                    }}>
                    {PROJECTS.map((p,i)=>(
                      <ProjectCard key={i} project={p} style={cardStyles[i]} onClick={()=>handleCardClick(p)}/>
                    ))}
                  </div>
                </div>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
                  zIndex:10,pointerEvents:"none"}}>
                  <div style={{fontSize:11,color:activeAccent,letterSpacing:2,fontWeight:500,
                    background:`${BG}cc`,backdropFilter:"blur(8px)",
                    padding:"6px 14px",borderRadius:40,border:`0.5px solid ${activeAccent}44`}}>
                    {String(activeIdx+1).padStart(2,"0")} / {String(NUM).padStart(2,"0")}
                  </div>
                </div>
              </div>
            </div>

            {/* ── video panel column ── */}
            <div className="wr-video-col">
              <VideoPanel
                project={selectedProject}
                onPlayClick={()=>{
                  const p=selectedProjectRef.current;
                  if(p) setPopupProject(p);
                }}
              />
            </div>
          </div>

          <p style={{position:"absolute",bottom:18,left:"50%",transform:"translateX(-50%)",
            fontSize:10,color:"#3a3560",letterSpacing:.5,textAlign:"center",
            pointerEvents:"none",margin:0,whiteSpace:"nowrap",
            background:`${BG}aa`,padding:"4px 12px",borderRadius:20,backdropFilter:"blur(4px)"}}>
            Drag to spin · Click card to select · Click preview to play
          </p>
        </div>
      </div>

      <VideoPopup project={popupProject} onClose={()=>setPopupProject(null)}/>
      <OrbitScaler logicalSize={LOGICAL_W}/>
    </>
  );
}