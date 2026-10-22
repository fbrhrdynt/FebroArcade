/* Octo Ascent — original Febro Arcade 2D climbing game. */
(()=>{'use strict';
 const $=id=>document.getElementById(id),canvas=$('scene'),ctx=canvas.getContext('2d',{alpha:false});
 const keys=['KeyW','KeyE','KeyI','KeyO','KeyS','KeyD','KeyK','KeyL'];
 const hues=['#f58da2','#f6c765','#8ee2db','#99adf7','#c3a1fa','#f59d62','#b0e77b','#e3a0da'];
 const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));const GOAL=8,LIMIT=90;
 let w=800,h=580,dpr=1,mode='menu',time=0,y=0,fall=0,fails=0,stuck=0,shake=0,onlineRound=null,record=null,alertUntil=0,muted=false,ac=null,clock=0;
 const arms=Array.from({length:8},(_,i)=>({anchor:.40+(i%4)*.11,reach:.4,active:true,t:.0}));
 const bots=[{name:'RUBY',col:'#f4a4aa',y:0,speed:.112},{name:'MINT',col:'#82caa9',y:0,speed:.096},{name:'PLUM',col:'#aaa1e0',y:0,speed:.083}];
 try{record=JSON.parse(localStorage.getItem('febroArcade.octoAscent.v1')||'null')}catch{};record=record&&typeof record==='object'?record:{best:null,wins:0};
 const pads=$('pads');const controls=keys.map((code,i)=>{const b=document.createElement('button');b.className='pad';b.style.setProperty('--pad',hues[i]);b.innerHTML=`<span>${code.slice(3)}</span><small>STICK</small>`;b.setAttribute('aria-label','Tentakel '+(i+1));pads.appendChild(b);b.addEventListener('click',()=>toggle(i));return b;});
 function sound(freq,dur=.08){if(muted)return;try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;if(!ac)ac=new A();if(ac.state==='suspended')ac.resume();const o=ac.createOscillator(),g=ac.createGain(),at=ac.currentTime;o.type='triangle';o.frequency.value=freq;g.gain.setValueAtTime(.045,at);g.gain.exponentialRampToValueAtTime(.001,at+dur);o.connect(g);g.connect(ac.destination);o.start(at);o.stop(at+dur);}catch{}}
 function note(text){$('alert').textContent=text;$('alert').classList.add('shown');alertUntil=performance.now()+1700;}
 function hud(){
  $('height').innerHTML=`${y.toFixed(1)} <small>/ 8m</small>`;$('timer').innerHTML=`${Math.max(0,LIMIT-time).toFixed(1)} <small>s</small>`;
  $('place').textContent=`${1+bots.filter(b=>b.y>y).length} / 4`;$('falls').textContent=fails;
  $('bar').style.height=clamp(y/GOAL*100,0,100)+'%';$('pause').hidden=mode!=='play';
  arms.forEach((a,i)=>{controls[i].classList.toggle('free',!a.active);controls[i].querySelector('small').textContent=a.active?'STICK':'LIFT';});
 }
 function show(title,desc,cta){
  const ov=$('overlay');ov.hidden=false;$('title').innerHTML=title;$('description').textContent=desc;$('start').textContent=cta;
 }
 function reset(){
  y=0;time=0;fails=0;stuck=0;shake=0;clock=0;
  arms.forEach((a,i)=>{a.active=true;a.anchor=.43+(i%4)*.10;a.reach=a.anchor;a.t=0;});
  bots.forEach((b,i)=>{b.y=0;b.speed=[.112,.096,.083][i]*(.95+Math.random()*.1)});
  onlineRound=window.ArcadeScores?.begin('octopus','climb8')||null;mode='play';$('overlay').hidden=true;hud();note('Ayo panjat! Gerakkan tentakel bergantian.');sound(540);
 }
 function end(won){
  if(mode!=='play')return;mode='done';const place=1+bots.filter(b=>b.y>=GOAL).length;
  if(won){if(record.best===null||time<record.best)record.best=time;record.wins++;try{localStorage.setItem('febroArcade.octoAscent.v1',JSON.stringify(record))}catch{}
   window.ArcadeScores?.end(onlineRound,Math.round(time*1000));sound(900,.23);
   show('FINISH!<br><em>HEBAT!</em>',`Kamu mencapai 8 meter dalam ${time.toFixed(2)} detik. Jatuh ${fails} kali. Rekor lokal: ${record.best.toFixed(2)} detik.`,'MAIN LAGI ↗');
  }else{sound(150,.35);show('WAKTU<br><em>HABIS!</em>',`Kamu mencapai ${y.toFixed(1)} meter. Kalahkan lawan dengan menukar tentakel yang sudah rendah.`, 'COBA LAGI ↻');}
  hud();
 }
 function tumble(){fails++;stuck=0;shake=0.9;y=0;arms.forEach((a,i)=>{a.active=true;a.anchor=.42+(i%4)*.10;a.reach=a.anchor;a.t=0;});note('JATUH! Mulai lagi dari bawah.');sound(175,.28)}
 function toggle(i){if(mode!=='play')return;const a=arms[i];if(a.active){a.active=false;a.reach=Math.max(y+.16,a.anchor);a.t=0;sound(370+i*45,.05);}else{a.active=true;a.anchor=clamp(a.reach,y+.13,y+1.40);a.t=0;sound(260+i*27,.07);}hud();}
 document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea'))return;const i=keys.indexOf(e.code);if(i>=0){e.preventDefault();if(!e.repeat)toggle(i);}else if(e.code==='Space'){e.preventDefault();if(mode==='menu'||mode==='done')reset();else if(mode==='play')pause();else if(mode==='pause')pause();}});
 function pause(){if(mode==='play'){mode='pause';show('JEDA<br><em>DULU.</em>','Balapan sedang berhenti. Lanjut saat siap.','LANJUTKAN ▶');}else if(mode==='pause'){mode='play';$('overlay').hidden=true;}hud();}
 $('start').addEventListener('click',()=>mode==='pause'?pause():reset());$('pause').addEventListener('click',pause);$('reset').addEventListener('click',reset);
 $('sound').addEventListener('click',()=>{muted=!muted;$('sound').textContent=muted?'♬̸':'♪';});
 $('full').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else document.documentElement.requestFullscreen?.().catch(()=>note('Gunakan mode landscape atau Tambahkan ke Layar Utama'));});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='play')pause();});
 function resize(){const b=canvas.getBoundingClientRect();if(!b.width||!b.height)return;w=b.width;h=b.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.floor(w*dpr);canvas.height=Math.floor(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
 window.addEventListener('resize',resize);resize();
 function roundRect(x,y,ww,hh,r,fill,stroke,line=2){ctx.beginPath();ctx.roundRect(x,y,ww,hh,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=line;ctx.stroke();}}
 function bubble(x,y,r,c){ctx.beginPath();ctx.arc(x,y,Math.max(.1,r),0,Math.PI*2);ctx.fillStyle=c;ctx.fill();}
 function line(ax,ay,bx,by,c,width=4){ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.lineWidth=width;ctx.strokeStyle=c;ctx.lineCap='round';ctx.stroke();}
 function limb(x0,y0,x1,y1,col,i){
  const bend=(i%2?-1:1)*(18+Math.abs(y1-y0)*.14);const cx=(x0+x1)/2+bend,cy=(y0+y1)/2;
  ctx.beginPath();ctx.moveTo(x0,y0);ctx.quadraticCurveTo(cx,cy,x1,y1);ctx.strokeStyle='#24364f';ctx.lineWidth=Math.max(8,Math.min(w/67,15));ctx.lineCap='round';ctx.stroke();
  ctx.strokeStyle=col;ctx.lineWidth=Math.max(5,Math.min(w/85,10));ctx.stroke();bubble(x1,y1,8,col);bubble(x1,y1,3,'#fff6e4');
 }
 function player(x,yy,sc=1){
  const yy2=yy;ctx.save();ctx.translate(x,yy2);ctx.scale(sc,sc);
  // rear tentacles first
  const anchorPos=i=>({x:(i%4-1.5)*30+(i<4?-26:26),z:arms[i].active?arms[i].anchor:arms[i].reach});
  const toY=z=>(y-z)*92-25;
  for(let i=0;i<8;i++){const a=arms[i],v=anchorPos(i);limb((i%4-1.5)*14,8,v.x,toY(v.z),hues[i],i);}
  bubble(0,0,35,'#283951');bubble(0,-3,31,'#f290ad');bubble(-13,-12,12,'#f8b1ca');
  bubble(-11,-5,7,'white');bubble(12,-5,7,'white');bubble(-9,-4,3.8,'#24354e');bubble(14,-4,3.8,'#24354e');
  ctx.beginPath();ctx.arc(2,6,7,0,Math.PI);ctx.strokeStyle='#384059';ctx.lineWidth=2.5;ctx.stroke();bubble(-25,8,5,'#faadc4');bubble(25,8,5,'#faadc4');
  ctx.restore();
 }
 function background(camera){
  const sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#78b8e1');sky.addColorStop(.53,'#c9e4e9');sky.addColorStop(1,'#b8d6b5');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
  // Midground castle on cliff, original handdrawn shapes
  const sp=Math.max(1,w*.0015);ctx.fillStyle='#84b3ba';
  for(let k=0;k<7;k++){const x=(k*147+23)%w,by=h*.63+(k%3)*11;ctx.beginPath();ctx.moveTo(x-40,by);ctx.lineTo(x,by-75);ctx.lineTo(x+74,by);ctx.fill();}
  ctx.fillStyle='#55788b';ctx.fillRect(0,h*.67,w,h*.33);
  const left=w*.16,right=w*.84,ww=right-left;
  ctx.fillStyle='#dfcaad';ctx.fillRect(left,0,ww,h);
  for(let k=Math.floor(camera*2)-12;k<Math.ceil(camera*2)+32;k++){
   const zy=h*.77-(k/2-camera)*92;
   if(zy< -45||zy>h+50)continue;
   for(let i=-1;i<12;i++){
    const bw=ww/7,shift=(k%2)*bw/2;
    roundRect(left+i*bw+shift+1,zy,bw-3,43,3,(i+k)%3===0?'#e4d5ba':'#e8d9c1','#bfae98',1);
   }
  }
  // climbing track lanes
  for(let i=0;i<5;i++){const lx=left+ww*i/4;line(lx,0,lx,h,'#9c969b',1.5);}
  const finishY=h*.77-(8-camera)*92;
  if(finishY>-70 && finishY<h+20){roundRect(left,finishY,ww,15,3,'#ffc765','#29344d',2);ctx.fillStyle='#26364e';ctx.font='900 11px system-ui';ctx.fillText('FINISH 8 M',left+8,finishY-6);}
  return {left,right,ww};
 }
 function rivals(camera,bounds){
  bots.forEach((b,i)=>{
   const xx=bounds.left+bounds.ww*(.18+i*.30);const by=h*.77-(b.y-camera)*92;
   if(by< -30||by>h+30)return;
   for(let t=0;t<6;t++){const a=t/6*Math.PI*2+(clock*1.2+i),px=xx+Math.sin(a)*18,py=by+20+Math.cos(a)*15;line(xx,by,px,py,b.col,5);}
   bubble(xx,by,19,'#293a55');bubble(xx,by,16,b.col);bubble(xx-5,by-4,3,'white');bubble(xx+7,by-4,3,'white');
   ctx.fillStyle='#27314e';ctx.font='bold 9px system-ui';ctx.textAlign='center';ctx.fillText(b.name,xx,by-27);ctx.textAlign='left';
  });
 }
 function draw(){
  if(!w||!h)return;ctx.save();ctx.clearRect(0,0,w,h);
  if(shake>0)ctx.translate(Math.sin(clock*38)*shake*6,0);
  const camera=Math.max(0,y-2.55);
  const bounds=background(camera);rivals(camera,bounds);
  const xx=bounds.left+bounds.ww*.53;const by=h*.77-(y-camera)*92;
  player(xx,by,clamp(w/620,.70,1));
  ctx.fillStyle='#27344d';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('YOU',xx,by-43);ctx.textAlign='left';
  if(performance.now()>alertUntil)$('alert').classList.remove('shown');
  ctx.restore();
 }
 let last=0;function tick(now){requestAnimationFrame(tick);const dt=Math.min(.045,(now-last)/1000||0);last=now;clock+=dt;
  if(mode==='play'){
   time+=dt;let above=0,n=0,min=Infinity;
   for(const a of arms){if(a.active){n++;if(a.anchor>y+.12){above++;min=Math.min(min,a.anchor);} }else{a.t+=dt;a.reach=clamp(a.reach+dt*.64,y+.15,y+1.35);}}
   if(n<2||above===0)stuck+=dt;else stuck=Math.max(0,stuck-dt*2);
   if(stuck>1.7)tumble();
   const pull=clamp(above*.083,0,.56);
   if(above>=2)y=clamp(y+Math.min(dt*pull,(min-y-.12)*.16),0,GOAL+1);
   bots.forEach((b,i)=>{b.y=Math.min(GOAL,b.y+dt*b.speed*(.82+.17*Math.sin(time*1.1+i)));});
   if(y>=GOAL)end(true);else if(time>=LIMIT)end(false);
   shake=Math.max(0,shake-dt);hud();
  }
  draw();}
 requestAnimationFrame(tick);hud();
})();
