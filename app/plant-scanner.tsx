"use client";

import { ChangeEvent, useEffect, useState } from "react";

type Stage="start"|"questions"|"scanning"|"result";

const advice=[
  ["01","Check the soil","Water only if the top 3–5 cm feels dry. Brown edges can come from irregular watering, not simply too little water."],
  ["02","Soften the light","Keep it in bright, indirect light and move it away from harsh afternoon sun."],
  ["03","Raise humidity gently","Group it with other plants or use a humidifier. Avoid misting leaves late in the day."],
];

export default function PlantScanner(){
  const [stage,setStage]=useState<Stage>("start");
  const [photo,setPhoto]=useState<string>();
  const [light,setLight]=useState("Bright indirect");
  const [soil,setSoil]=useState("Dry on top");
  const [done,setDone]=useState<number[]>([]);
  useEffect(()=>()=>{if(photo)URL.revokeObjectURL(photo)},[photo]);
  function choose(e:ChangeEvent<HTMLInputElement>){const file=e.target.files?.[0];if(!file)return;if(photo)URL.revokeObjectURL(photo);setPhoto(URL.createObjectURL(file));setStage("questions")}
  function analyse(){setStage("scanning");window.setTimeout(()=>setStage("result"),1500)}
  function reset(){if(photo)URL.revokeObjectURL(photo);setPhoto(undefined);setStage("start");setDone([])}
  return <main className="app-shell">
    <aside className="story"><span className="kicker">SPROUT / PRODUCT PROTOTYPE</span><h1>A calmer way to understand your plants.</h1><p>One photo, two useful questions, and a care plan that explains its reasoning.</p><div className="proof"><b>Transparent</b><span>Confidence and alternatives shown</span><b>Practical</b><span>Three actions, never a wall of text</span></div></aside>
    <section className="device" aria-label="Sprout interactive prototype">
      <header><button onClick={reset} aria-label="Start over">↙</button><a href="#">◒ <b>sprout</b></a><button aria-label="More information">•••</button></header>
      {stage==="start"&&<div className="camera-screen">
        <div className="plant-art"><i/><i/><i/><i/><span/></div><div className="shade"/>
        <div className="intro"><span className="live">● LIVE CHECK</span><h2>What’s up with<br/>your plant?</h2><p>Use a clear photo of the whole plant.</p></div>
        <div className="focus"><i/><i/><i/><i/></div>
        <label className="shutter"><span>＋</span><input type="file" accept="image/*" capture="environment" onChange={choose}/></label>
        <button className="sample" onClick={()=>setStage("questions")}>Try with sample →</button>
      </div>}
      {stage==="questions"&&<div className="questions">
        <div className="photo-card">{photo?<img src={photo} alt="Plant selected for analysis"/>:<div className="mini-plant">🌿</div>}<span>Photo ready ✓</span></div>
        <div className="question-copy"><span className="step">STEP 2 OF 2</span><h2>A little context makes the answer better.</h2><p>A photo alone can confuse watering, light, and humidity symptoms.</p></div>
        <fieldset><legend>What light does it get?</legend>{["Low light","Bright indirect","Direct sun"].map(x=><button className={light===x?"selected":""} onClick={()=>setLight(x)} key={x}>{x}</button>)}</fieldset>
        <fieldset><legend>How does the soil feel?</legend>{["Still wet","Dry on top","Very dry"].map(x=><button className={soil===x?"selected":""} onClick={()=>setSoil(x)} key={x}>{x}</button>)}</fieldset>
        <button className="primary" onClick={analyse}>Analyse plant</button>
      </div>}
      {stage==="scanning"&&<div className="scanning">{photo&&<img src={photo} alt=""/>}<div className="scanline"/><div><span className="orb">✦</span><h2>Looking for visible clues…</h2><p>Species · leaf condition · environment</p></div></div>}
      {stage==="result"&&<div className="results">
        <div className="result-photo">{photo?<img src={photo} alt="Analysed plant"/>:<div className="big-plant">🌿</div>}<span className="confidence">94% species match</span><div><h2>Peace lily</h2><i>Spathiphyllum wallisii</i></div></div>
        <div className="result-content"><span className="kicker">HEALTH CHECK</span><div className="diagnosis"><h1>Mostly healthy.<br/>A little stressed.</h1><span><b>78</b>/100</span></div><p className="explain">Brown leaf edges plus <b>{soil.toLowerCase()}</b> soil and <b>{light.toLowerCase()}</b> light suggest irregular moisture or dry air. This is a likely explanation—not a certain diagnosis.</p>
        <div className="alternatives"><span>What else could it be?</span><button title="Other plausible causes">Water quality 18%</button><button title="Other plausible causes">Root stress 8%</button></div>
        <section className="plan"><div><span className="kicker">YOUR CARE PLAN</span><b>{done.length}/3 done</b></div>{advice.map(([n,title,text],i)=><button className={done.includes(i)?"care done":"care"} key={n} onClick={()=>setDone(d=>d.includes(i)?d.filter(x=>x!==i):[...d,i])}><span>{done.includes(i)?"✓":n}</span><div><b>{title}</b><p>{text}</p></div></button>)}</section>
        <button className="primary">Save plant & check in later</button><button className="text-button" onClick={reset}>Scan another plant</button><small className="disclaimer">General plant-care guidance only. Confirm serious disease or pesticide decisions with a qualified local expert.</small></div>
      </div>}
    </section>
  </main>
}
