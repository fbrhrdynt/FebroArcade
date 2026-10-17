/* Febro Arcade high score bridge: request a server-issued session when the player presses Play.
   Client scores undergo plausibility checks on the API but are NOT cheat-proof. */
(() => {
 'use strict';
 const API='/api/leaderboard';
 const send=async(route,body)=>{
  const r=await fetch(`${API}/${route}`,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(6500)});
  const data=await r.json();if(!r.ok)throw new Error(data.error||'Server leaderboard tidak tersedia');return data;
 };
 document.addEventListener('arcade:score-saved',e=>{const el=document.getElementById('onlineScoreStatus');if(el)el.textContent=`✓ Skor ${e.detail.score} tersimpan online. Peringkatmu: #${e.detail.rank||'—'}. Buka /leaderboard/ untuk melihatnya.`;});
 document.addEventListener('arcade:score-error',e=>{const el=document.getElementById('onlineScoreStatus');if(el)el.textContent='⚠ Skor belum masuk leaderboard: '+e.detail.message;});
 window.ArcadeScores={
  begin(game,mode){
   const pending=send('start',{game,mode}).catch(()=>null);
   return {game,mode,pending,sent:false};
  },
  async end(round,score){
   if(!round||round.sent||!Number.isSafeInteger(score)||score<=0)return null;
   round.sent=true;
   try{
    const session=await round.pending;
    if(!session)return null;
    const result=await send('finish',{runId:session.runId,score});
    document.dispatchEvent(new CustomEvent('arcade:score-saved',{detail:result}));return result;
   }catch(e){console.info('Leaderboard: skor tidak tersimpan:',e.message);document.dispatchEvent(new CustomEvent('arcade:score-error',{detail:{message:e.message}}));return null;}
  }
 };
})();
