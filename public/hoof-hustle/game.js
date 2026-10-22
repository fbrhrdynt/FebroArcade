/* Hoof Hustle — original Febro Arcade game. No external assets or dependencies. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const canvas = $('gameCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const pads = [...document.querySelectorAll('.pad')];
  const colors = ['#ed7e91', '#f1c354', '#77b3f2', '#88cf8c'];
  const STORE_KEY = 'febroArcade.hoofHustle.v1';
  const MAX_DISTANCE = 50;
  const DURATION = 90;
  const LEG_KEYS = ['KeyQ', 'KeyW', 'KeyO', 'KeyP'];
  const clamp = (n,a,b) => Math.min(b, Math.max(a, n));
  const lerp = (a,b,t) => a + (b-a)*t;
  let W=920,H=540,scale=1,dpr=1;
  let lastTime=0,toastUntil=0,audio=null,muted=false,frameClock=0;
  let onlineRound=null;
  let state='menu', distance=0, speed=0, time=0, falls=0, steps=0, roll=0, rollSpeed=0, pitch=0, pitchSpeed=0, fallRotation=0, jump=0, wobble=0;
  const down=[false,false,false,false];
  const legs=Array.from({length:4},()=>({phase:0,held:0}));
  const particles=[];
  let record={best:null,furthest:0,runs:0};
  try {const loaded=JSON.parse(localStorage.getItem(STORE_KEY)||'null');if(loaded&&typeof loaded==='object') record={...record,...loaded};}catch(_){/* browser storage can be disabled */}

  function saveRecord(){try{localStorage.setItem(STORE_KEY,JSON.stringify(record));}catch(_){/* non-fatal */}}
  function ui(){
    $('distLabel').innerHTML=`${distance.toFixed(1).replace('.',',')} <small>/ 50 m</small>`;
    $('timeLabel').innerHTML=`${Math.max(0,DURATION-time).toFixed(1).replace('.',',')} <small>s</small>`;
    $('fallsLabel').textContent=String(falls);
    $('progressFill').style.width=`${distance/MAX_DISTANCE*100}%`;
    $('riseBtn').hidden=state!=='fallen';
    $('pauseBtn').hidden=!(state==='playing'||state==='fallen'||state==='paused');
    $('pauseBtn').innerHTML=state==='paused'?'▶ <span>LANJUT</span>':'Ⅱ <span>JEDA</span>';
    $('recordLabel').textContent=record.best===null?'REKOR LOKAL · BELUM ADA':`REKOR LOKAL · ${record.best.toFixed(2).replace('.',',')} DETIK`;
  }
  function sound(freq=200,dur=.06,type='triangle',vol=.09){
    if(muted)return;
    try{
      const A=window.AudioContext||window.webkitAudioContext;
      if(!A)return;
      if(!audio)audio=new A();
      if(audio.state==='suspended')audio.resume().catch(()=>{});
      const t=audio.currentTime, o=audio.createOscillator(), g=audio.createGain();
      o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(40,freq*.65),t+dur);
      g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
      o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+dur+.01);
    }catch(_){/* audio is optional */}
  }
  function toast(msg,life=1300){const el=$('toast');el.textContent=msg;el.classList.add('active');toastUntil=performance.now()+life;}
  function showScreen(type){
    $('screen').hidden=false;
    const title=$('modalTitle'),desc=$('modalDesc'),tip=$('modalTip'),button=$('startBtn'),how=$('howTo');
    if(type==='menu'){
      $('modalEyebrow').textContent='✦ A TINY HORSE CHALLENGE';
      title.innerHTML='HOOF<br><em>HUSTLE!</em>';
      desc.textContent='Empat kaki. Empat tombol. Satu tujuan: bawa si kuda kocak ke garis finis tanpa kebanyakan jatuh.';
      tip.innerHTML='<b>CARA MAIN</b> Tahan tombol untuk mengangkat kaki, lalu <strong>lepas</strong> untuk menendang tanah. Coba gerakkan dua kaki diagonal bergantian.';
      button.innerHTML='MULAI BERLARI <span>↗</span>'; how.hidden=false; $('helpBtn').hidden=false;
    }else if(type==='win'){
      $('modalEyebrow').textContent='✦ FINISH LINE CROSSED';
      title.innerHTML='HEBAT!<br><em>FINIS!</em>';
      desc.textContent=`50 meter tercapai dalam ${time.toFixed(2).replace('.',',')} detik. Kamu jatuh ${falls} kali dan melangkah ${steps} kali.`;
      tip.innerHTML=`<b>${time<18?'LEGENDA KUDA':time<30?'KUDA SUPER':time<50?'KUDA TANGGUH':'KUDA SANTAI'}</b>${record.best!==null&&Math.abs(record.best-time)<.01?'Rekor tercepat baru!':'Coba lagi dan kejar rekor tercepatmu.'}`;
      button.innerHTML='MAIN LAGI <span>↻</span>';how.hidden=true;$('helpBtn').hidden=true;
    }else if(type==='timeout'){
      $('modalEyebrow').textContent='✦ TIME IS UP';
      title.innerHTML='WAKTU<br><em>HABIS!</em>';
      desc.textContent=`90 detik berlalu. Si kuda berhasil berjalan ${distance.toFixed(1).replace('.',',')} meter, jatuh ${falls} kali.`;
      tip.innerHTML='<b>TIPS</b> Tahan sebentar, lalu lepas. Ulangi Q + P, kemudian W + O. Jangan angkat empat kaki bersamaan.';
      button.innerHTML='COBA LAGI <span>↻</span>';how.hidden=true;$('helpBtn').hidden=false;
    }else if(type==='pause'){
      $('modalEyebrow').textContent='✦ TAKE A BREAK';
      title.innerHTML='LAGI<br><em>ISTIRAHAT.</em>';
      desc.textContent='Permainan dijeda. Kuda dan penghitung waktu berhenti sementara.';
      tip.innerHTML='<b>SEBELUM LANJUT</b> Ketuk tombol kaki secara bergantian. Jangan lupa tekan R untuk bangun kalau jatuh.';
      button.innerHTML='LANJUT MAIN <span>▶</span>';how.hidden=true;$('helpBtn').hidden=true;
    }
    ui();
  }
  function hideScreen(){$('screen').hidden=true;}
  function reset(){onlineRound=window.ArcadeScores?.begin('hoof','race50')||null;
    distance=0;speed=0;time=0;falls=0;steps=0;roll=0;rollSpeed=0;pitch=0;pitchSpeed=0;fallRotation=0;wobble=0;jump=0;
    down.fill(false);legs.forEach(l=>{l.phase=0;l.held=0;});particles.length=0;
    pads.forEach(p=>p.classList.remove('pressed'));
    state='playing';hideScreen();ui();
    toast('LETS GO! · 50 METER',1150);sound(330,.11);setTimeout(()=>sound(460,.1),100);
  }
  function finish(win){
    if(state==='win'||state==='timeout')return;
    state=win?'win':'timeout';
    record.runs=(Number(record.runs)||0)+1;
    record.furthest=Math.max(Number(record.furthest)||0,distance);
    if(win){record.best=record.best===null?time:Math.min(record.best,time);if(onlineRound)window.ArcadeScores?.end(onlineRound,Math.round(time*1000));}
    saveRecord();
    down.fill(false);pads.forEach(p=>p.classList.remove('pressed'));
    if(win){[520,660,880].forEach((f,i)=>setTimeout(()=>sound(f,.15),100*i));}
    else sound(100,.35,'sawtooth',.06);
    showScreen(win?'win':'timeout');
  }
  function dust(x,y,n=5){for(let i=0;i<n;i++){particles.push({x,y,dx:(Math.random()-.5)*100-15,dy:-Math.random()*50-10,life:1,size:3+Math.random()*5});}if(particles.length>110)particles.splice(0,particles.length-110);}
  function fall(){
    if(state!=='playing')return;
    state='fallen';falls++;speed*=.15;down.fill(false);pads.forEach(p=>p.classList.remove('pressed'));
    fallRotation=roll>=0?1:-1; if(Math.abs(roll)<.55) fallRotation=pitch>=0?1:-1;
    toast('ADUH, JATUH! · TEKAN BANGUN',2000);sound(104,.36,'sawtooth',.07);ui();
  }
  function rise(){
    if(state!=='fallen')return;
    state='playing';roll=0;rollSpeed=0;pitch=0;pitchSpeed=0;fallRotation=0;
    legs.forEach(l=>{l.phase=0;l.held=0;});
    toast('BANGUN LAGI! YUK LANJUT',1000);sound(360,.12);ui();
  }
  function setLeg(i,isDown){
    if(state!=='playing')return;
    if(down[i]===isDown)return;
    down[i]=isDown;pads[i].classList.toggle('pressed',isDown);
    const l=legs[i];
    if(isDown)l.held=0;
    else{
      const strength=clamp((l.phase-.12)/.66,0,1);
      if(strength>.07){
        // Leg kicks propel the horse; diagonal legs are dynamically more stable.
        speed=clamp(speed+.16+strength*.79,0,5.6);
        jump+=strength*.35;
        steps++;
        rollSpeed+=(i===0||i===2?1:-1)*strength*.043;
        pitchSpeed+=(i<2?-1:1)*strength*.032;
        sound(175+strength*65,.045,'triangle',.09);
        dust(0,0,4);
      }
    }
  }
  function releaseAll(){for(let i=0;i<4;i++)setLeg(i,false);}
  function pauseToggle(){
    if(state==='playing'||state==='fallen'){
      releaseAll();state='paused';showScreen('pause');
    }else if(state==='paused'){
      state='playing';hideScreen();toast('LANJUT!',800);ui();
    }
  }
  $('startBtn').addEventListener('click',()=>{if(state==='paused'){pauseToggle();}else{reset();}});
  $('resetBtn').addEventListener('click',()=>{reset();});
  $('riseBtn').addEventListener('click',rise);
  $('pauseBtn').addEventListener('click',pauseToggle);
  $('helpBtn').addEventListener('click',()=>{const el=$('modalTip');el.innerHTML='<b>KUNCI BERLARI</b> TAHAN kaki sekitar 0,3 detik lalu LEPAS. Angkat Q+P bersamaan, lepas, lalu W+O. Jika jatuh tekan R/BANGUN. Waktumu 90 detik untuk 50 meter.';});
  $('soundBtn').addEventListener('click',()=>{muted=!muted;$('soundBtn').textContent=muted?'♪̸':'♪';$('soundBtn').setAttribute('aria-label',muted?'Nyalakan suara':'Matikan suara');});
  $('fullscreenBtn').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('LAYAR DISESUAIKAN UNTUK HP',1700);}catch(_){toast('FULLSCREEN TIDAK DIDUKUNG BROWSER',1700);}});
  pads.forEach((btn,i)=>{
    btn.addEventListener('pointerdown',e=>{e.preventDefault();try{btn.setPointerCapture(e.pointerId);}catch(_){}setLeg(i,true);});
    btn.addEventListener('pointerup',e=>{e.preventDefault();setLeg(i,false);});
    btn.addEventListener('pointercancel',()=>setLeg(i,false));
    btn.addEventListener('lostpointercapture',()=>setLeg(i,false));
    btn.addEventListener('contextmenu',e=>e.preventDefault());
  });
  document.addEventListener('keydown',e=>{
    if(LEG_KEYS.includes(e.code)){e.preventDefault();if(!e.repeat)setLeg(LEG_KEYS.indexOf(e.code),true);return;}
    if(e.code==='Space'){e.preventDefault();if(state==='menu'||state==='win'||state==='timeout')reset();else pauseToggle();}
    if(e.code==='KeyR'){e.preventDefault();if(state==='fallen')rise();}
    if(e.code==='Escape'&&state==='playing')pauseToggle();
  });
  document.addEventListener('keyup',e=>{if(LEG_KEYS.includes(e.code)){e.preventDefault();setLeg(LEG_KEYS.indexOf(e.code),false);}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&(state==='playing'||state==='fallen'))pauseToggle();});
  window.addEventListener('blur',()=>{if(state==='playing'||state==='fallen')pauseToggle();});

  function roundedRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
  function line(points,stroke,width=2){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
  function ellipse(x,y,rx,ry,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,Math.max(0.01,rx),Math.max(0.01,ry),0,0,Math.PI*2);ctx.fill();}
  function cloud(x,y,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ellipse(-29,1,30,15,'#ffffffd0');ellipse(-5,-9,34,23,'#fffef7e5');ellipse(24,0,27,16,'#ffffffdb');ctx.restore();}
  function hills(W,H,t){
    const horizon=H*.52;
    ctx.fillStyle='#a7dbce';ctx.beginPath();ctx.moveTo(0,H);
    for(let x=-20;x<=W+30;x+=12){ctx.lineTo(x,horizon+12*Math.sin(x*.013+1)+25*Math.sin(x*.006+2));}
    ctx.lineTo(W,H);ctx.fill();
    ctx.fillStyle='#7ac4ad';ctx.beginPath();ctx.moveTo(0,H);
    for(let x=-20;x<=W+30;x+=12){ctx.lineTo(x,horizon+39+13*Math.sin(x*.019+.5+t)+14*Math.sin(x*.009));}
    ctx.lineTo(W,H);ctx.fill();
  }
  function scenery(){
    const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'#7bd9e7');grad.addColorStop(.7,'#e3f8df');grad.addColorStop(1,'#d0eed0');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    ellipse(W*.78,H*.19,Math.max(34,W*.055),Math.max(34,W*.055),'#fff4bb');
    const drift=distance*4;
    cloud(((W*.2-drift*.22)%(W+220)+W+220)%(W+220)-110,H*.15,.9);
    cloud(((W*.6-drift*.16)%(W+240)+W+240)%(W+240)-120,H*.29,.55);
    cloud(((W*.95-drift*.12)%(W+280)+W+280)%(W+280)-140,H*.10,.65);
    hills(W,H,distance*.01);
    const ground=H*.77;
    ctx.fillStyle='#90c87a';ctx.fillRect(0,ground-27,W,H-ground+40);
    ctx.fillStyle='#c8e6a5';ctx.fillRect(0,ground-23,W,25);
    ctx.fillStyle='#dcbd8b';ctx.beginPath();ctx.moveTo(0,ground-2);ctx.lineTo(W,ground-2);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.fill();
    ctx.fillStyle='#f1d8a7';ctx.fillRect(0,ground+12,W,16);
    // Lane markers move opposite the horse's progress, so forward motion is obvious.
    const pxPerMeter=70,offset=distance*pxPerMeter,baseX=W*.42;
    for(let m=0;m<=MAX_DISTANCE;m+=5){
      const x=baseX+(m-distance)*pxPerMeter;
      if(x>-70&&x<W+70){
        if(m%10===0){
          ctx.strokeStyle='#7d9b60';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,ground-25);ctx.lineTo(x,ground+7);ctx.stroke();
          roundedRect(x-20,ground-52,41,20,5);ctx.fillStyle='#fff9e7';ctx.fill();ctx.strokeStyle='#577b54';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#3b5b4a';ctx.textAlign='center';ctx.font='900 11px system-ui';ctx.fillText(m+'m',x,ground-38);
        }else{ellipse(x,ground+40,8,2,'#a58b6c');}
      }
    }
    // Trees and shrubs, procedural and deterministic (no external sprites).
    for(let i=0;i<34;i++){
      let x=((i*173 + i*i*19)-offset*.42)%(W+450); if(x<0)x+=W+450;x-=120;
      const y=ground-35 - (i%3)*7;
      if(i%4===0){
        line([[x,y+26],[x,y-19]],'#806e49',8);ellipse(x-15,y-23,22,19,'#529f72');ellipse(x+14,y-30,21,23,'#438e69');ellipse(x,y-42,24,22,'#70b58a');
      }else{
        ellipse(x,y+30,16+(i%3)*3,8,i%2?'#78aa64':'#85b66c');
        line([[x-7,y+29],[x,y+9],[x+7,y+30]],'#488258',2);
      }
    }
    // Track foreground decorations.
    for(let i=0;i<24;i++){
      let x=((i*251+57-offset)%(W+200)+W+200)%(W+200)-100;
      ellipse(x,ground+72+(i%4)*14,6+(i%4)*2,2.5,'#b99b70');
    }
    // Finish banner appears when approaching 50 meters.
    const fx=baseX+(50-distance)*pxPerMeter;
    if(fx>-90&&fx<W+170){
      line([[fx,ground-8],[fx,ground-220]],'#53424b',9);line([[fx+125,ground-8],[fx+125,ground-220]],'#53424b',9);
      const flagColors=['#fff9e3','#282332'];
      ctx.save();for(let row=0;row<3;row++)for(let col=0;col<10;col++){ctx.fillStyle=flagColors[(row+col)%2];ctx.fillRect(fx+col*12.5,ground-217+row*15,12.5,15);}ctx.restore();
      ctx.fillStyle='#253345';roundedRect(fx+3,ground-240,119,21,4);ctx.fill();ctx.fillStyle='#ffefbd';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText('FINISH!',fx+63,ground-225);
    }
    return ground;
  }
  function drawLeg(hipX,baseY,phase,col,front,far){
    const stride=phase*45;
    const lifted=phase*42;
    const kneeX=hipX+(front?6:-4)+stride*.30;
    const footX=hipX+stride+(front?-2:8);
    const footY=baseY+90-lifted;
    // Horses use a knee-like two-segment articulated silhouette.
    ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
    line([[hipX,baseY],[kneeX,baseY+44-lifted*.18],[footX,footY]],far?'#6b4236':'#a9603f',far?17:19);
    line([[hipX,baseY],[kneeX,baseY+44-lifted*.18],[footX,footY]],far?'#835342':'#c08050',far?11:12);
    roundedRect(kneeX-9,baseY+28-lifted*.12,18,10,4);ctx.fillStyle=colors[col];ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#463a40';ctx.stroke();
    ellipse(footX+8,footY+1,17,9,far?'#302e38':'#423443');
    ellipse(footX+8,footY-2,15,6,far?'#57505b':'#63505a');
    ctx.restore();
  }
  function horse(x,y){
    // Pony visual is original vector-style Canvas geometry with independent legs.
    const phase=legs.map(l=>l.phase);
    const bob=Math.sin(frameClock*9)*Math.min(speed/5,1)*5;
    const rotation=state==='fallen'?fallRotation*1.28 : clamp(roll*.46+pitch*.13,-.65,.65);
    ellipse(x+8,y+75,114,17,'#51453532');
    ctx.save();ctx.translate(x,y-37+bob);ctx.rotate(rotation);
    // rear legs shaded; draw first for depth
    drawLeg(-57,7,phase[1],1,false,true);
    drawLeg(49,6,phase[3],3,true,true);
    // bouncing tail
    ctx.save();ctx.translate(-91,-21);ctx.rotate(.2+Math.sin(frameClock*5)*.11);
    ctx.beginPath();ctx.moveTo(-1,0);ctx.bezierCurveTo(-42,-21,-49,14,-48,28);ctx.bezierCurveTo(-38,40,-27,34,-23,28);ctx.bezierCurveTo(-37,21,-29,8,0,11);ctx.closePath();ctx.fillStyle='#6c3d34';ctx.fill();ctx.restore();
    // body undercolor, highlight, and saddle blanket
    ellipse(-5,-18,104,53,'#8b5039');
    ellipse(-8,-25,98,51,'#bd7851');
    ellipse(-23,-39,69,29,'#cb8860');
    ellipse(-13,9,64,20,'#a45c42');
    // soft mane on neck behind face
    ctx.fillStyle='#6f4236';ctx.beginPath();ctx.moveTo(45,-63);ctx.bezierCurveTo(60,-110,96,-109,116,-80);ctx.bezierCurveTo(96,-78,94,-51,86,-17);ctx.closePath();ctx.fill();
    ctx.save();ctx.translate(67,-44);ctx.rotate(-.18);
    roundedRect(0,-59,42,95,18);ctx.fillStyle='#ad6948';ctx.fill();
    roundedRect(7,-62,31,80,15);ctx.fillStyle='#cb8559';ctx.fill();ctx.restore();
    // head and cheek
    ellipse(104,-92,40,36,'#c58258');
    ellipse(116,-88,26,27,'#d69162');
    // ears
    ctx.fillStyle='#ae6b4f';ctx.beginPath();ctx.moveTo(89,-118);ctx.lineTo(87,-162);ctx.quadraticCurveTo(106,-148,105,-124);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(113,-119);ctx.lineTo(123,-158);ctx.quadraticCurveTo(137,-137,130,-115);ctx.closePath();ctx.fill();
    ctx.fillStyle='#ecad94';ctx.beginPath();ctx.moveTo(92,-129);ctx.lineTo(93,-152);ctx.lineTo(100,-129);ctx.closePath();ctx.fill();
    // nose
    ctx.beginPath();ctx.moveTo(119,-84);ctx.quadraticCurveTo(160,-91,160,-66);ctx.lineTo(153,-52);ctx.quadraticCurveTo(132,-46,117,-56);ctx.closePath();ctx.fillStyle='#e8b18c';ctx.fill();
    ellipse(143,-69,4,3,'#734c45');
    ellipse(114,-99,5.5,7,'#382b2c');ellipse(115,-101,1.8,2.5,'#ffffff');
    ctx.beginPath();ctx.arc(136,-59,8,.25,1.8);ctx.strokeStyle='#915f53';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle='#754439';ctx.beginPath();ctx.moveTo(77,-113);ctx.lineTo(87,-130);ctx.lineTo(97,-125);ctx.lineTo(106,-137);ctx.lineTo(114,-120);ctx.lineTo(88,-110);ctx.closePath();ctx.fill();
    // Colored reins, simple collar
    line([[90,-68],[102,-62],[107,-39]],'#e9c969',4);
    // front near legs
    drawLeg(-61,10,phase[0],0,false,false);
    drawLeg(51,9,phase[2],2,true,false);
    // saddle
    ctx.beginPath();ctx.ellipse(-16,-57,40,17,-.05,0,Math.PI);ctx.fillStyle='#694943';ctx.fill();
    roundedRect(-56,-65,70,13,5);ctx.fillStyle='#45566c';ctx.fill();
    roundedRect(-53,-63,65,6,3);ctx.fillStyle='#6f88a0';ctx.fill();
    ctx.restore();
  }
  function overlayHints(){
    if(state==='playing'&&distance<2&&time<9){
      ctx.textAlign='center';ctx.fillStyle='#343841cb';ctx.font='900 12px system-ui';ctx.fillText('TAHAN Q + P  →  LEPAS  →  W + O',W*.5,H*.18);
    }
    if(state==='fallen'){
      ctx.textAlign='center';ctx.fillStyle='#3c3e48';ctx.font='900 13px system-ui';ctx.fillText('KUDA JATUH! TEKAN BANGUN LAGI',W*.5,H*.26);
    }
  }
  function resize(){
    const rect=canvas.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.max(1,Math.round(rect.width*dpr));canvas.height=Math.max(1,Math.round(rect.height*dpr));
    // Fixed character scale relative to height, so the horse stays large on phones.
    scale=clamp(rect.height/540,.48,1.15);
    W=rect.width/scale;H=rect.height/scale;
  }
  window.addEventListener('resize',resize);
  if(window.ResizeObserver)new ResizeObserver(resize).observe(canvas);
  function tick(dt){
    frameClock+=dt;
    if(state==='playing'||state==='fallen'){
      time=Math.min(DURATION,time+dt);
      if(time>=DURATION){finish(false);return;}
    }
    if(state==='playing'){
      let left=0,right=0,rear=0,front=0,up=0;
      legs.forEach((l,i)=>{
        if(down[i]){l.phase=clamp(l.phase+dt*2.65,0,1);l.held+=dt;}
        else{l.phase=clamp(l.phase-dt*4,0,1);l.held=0;}
        if(i===0||i===2)left+=l.phase;else right+=l.phase;
        if(i<2)rear+=l.phase;else front+=l.phase;
        up+=l.phase;
      });
      const imbalance=left-right;
      const foreDiff=front-rear;
      rollSpeed+= (imbalance*2.1-roll*.88-rollSpeed*1.52)*dt;
      pitchSpeed+= (foreDiff*.9-pitch*.85-pitchSpeed*1.8)*dt;
      roll+=rollSpeed*dt;
      pitch+=pitchSpeed*dt;
      wobble=lerp(wobble,up,dt*3);
      if(up>3.25){rollSpeed+=dt*.8;pitchSpeed+=dt*.9;}
      if(Math.abs(roll)>1.11||Math.abs(pitch)>1.15){fall();}
      speed=Math.max(0,speed-dt*(.7+speed*.18));
      distance=clamp(distance+speed*dt,0,MAX_DISTANCE);
      if(distance>=MAX_DISTANCE){finish(true);return;}
      jump=Math.max(0,jump-dt*3);
    }else if(state==='fallen'){
      speed=0;
      legs.forEach(l=>l.phase=Math.max(0,l.phase-dt*2));
    }else{speed*=Math.max(0,1-dt*3);}
    for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.x+=p.dx*dt;p.y+=p.dy*dt;p.dy+=65*dt;p.life-=dt*2.1;if(p.life<=0)particles.splice(i,1);}
    if(state==='playing'||state==='fallen')ui();
  }
  function draw(){
    if(!canvas.width||!canvas.height)return;
    ctx.setTransform(dpr*scale,0,0,dpr*scale,0,0);ctx.clearRect(0,0,W,H);
    const ground=scenery();
    const horseX=W*.40;
    const horseY=ground-62;
    for(const p of particles){ctx.save();ctx.globalAlpha=Math.max(0,p.life*.5);ellipse(horseX-70+p.x,ground+p.y,Math.max(1,p.size*p.life),Math.max(1,p.size*p.life*.55),'#f9e6bf');ctx.restore();}
    horse(horseX,horseY-Math.sin(jump*3)*jump*5);
    overlayHints();
  }
  function frame(ts){if(!lastTime)lastTime=ts;const dt=Math.min(.05,Math.max(0,(ts-lastTime)/1000));lastTime=ts;if(performance.now()>toastUntil)$('toast').classList.remove('active');tick(dt);draw();requestAnimationFrame(frame);}
  resize();showScreen('menu');ui();requestAnimationFrame(frame);
  // Lightweight developer instrumentation for smoke testing (no score submission or credentials).
  window.__hoofHustle={snapshot:()=>({state,distance,speed,time,falls,steps,roll,pitch,record:structuredClone(record)}),start:reset,rise,pause:pauseToggle};
})();
