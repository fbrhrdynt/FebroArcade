export type Choice={id:string;label:string;art?:string;color?:string;count?:number;aliases?:string[]};
export type Question={id:string;activity:string;pronunciation?:string;version:1;level:number;prompt:string;spoken?:string;english?:string;target?:Choice;objects?:number;addends?:[number,number];subtract?:[number,number];pattern?:Choice[];choices:Choice[];answer:string;success:string;hints:[string,string]};
export const worlds=[
 {id:'read',name:'Baca & Huruf',sub:'Dari A, jadi cerita',art:'book',color:'sky'},
 {id:'math',name:'Angka & Berhitung',sub:'Hitung satu per satu',art:'apple',color:'yellow'},
 {id:'english',name:'Hello, English!',sub:'Kata baru, teman baru',art:'cat',color:'mint'},
 {id:'hijaiyah',name:'Huruf Hijaiyah',sub:'Kenali bentuk huruf',art:'moon',color:'lavender'},
 {id:'colors',name:'Warna & Bentuk',sub:'Temukan warna di sekitar',art:'palette',color:'pink'},
 {id:'games',name:'Main & Temukan',sub:'Pasangkan dan cari!',art:'puzzle',color:'peach'},
];
export const activities=[
 {id:'R01',world:'read',name:'Kenal Alfabet',desc:'Cari huruf A sampai Z',art:'letter'},
 {id:'R05',world:'read',name:'Suku Kata',desc:'Ayo baca ba, bi, bu!',art:'book'},
 {id:'R07',world:'read',name:'Baca Kata',desc:'Temukan gambar dari kata',art:'ball'},
 {id:'M01',world:'math',name:'Kenal Angka',desc:'Berteman dengan 0–20',art:'number'},
 {id:'M02',world:'math',name:'Hitung Benda',desc:'Sentuh apel, lalu hitung',art:'apple'},
 {id:'M06',world:'math',name:'Tambah Apel',desc:'Gabungkan dua kelompok',art:'basket'},
 {id:'E03',world:'english',name:'English Colors',desc:'Red, blue, yellow!',art:'palette'},
 {id:'E04',world:'english',name:'English Animals',desc:'Cat, dog, bird, and more',art:'cat'},
 {id:'H01',world:'hijaiyah',name:'Kenal Hijaiyah',desc:'Cocokkan 28 bentuk huruf',art:'moon'},
 {id:'S01',world:'colors',name:'Kenal Warna',desc:'Pilih warna yang diminta',art:'palette'},
 {id:'G01',world:'games',name:'Pasangan Rahasia',desc:'Buka dan ingat gambarnya',art:'cards'},
 {id:'G02',world:'games',name:'Cari Gambar',desc:'Di mana benda itu?',art:'search'},
 {id:'G03',world:'games',name:'Nama Hewan Indonesia',desc:'Kucing, sapi, gajah, dan teman lain',art:'cat'},
 {id:'G04',world:'games',name:'Hewan Makan Apa?',desc:'Pilih gambar makanannya',art:'cow'},
 {id:'M08',world:'math',name:'Belasan & Puluhan',desc:'Sepuluh sampai seratus',art:'number'},
 {id:'H02',world:'hijaiyah',name:'Dengar Alif Ba Ta',desc:'Dengarkan nama, cari hurufnya',art:'moon'},
 {id:'R02',world:'read',name:'Huruf Besar & Kecil',desc:'Pasangkan A dengan a',art:'letter'},
 {id:'R03',world:'read',name:'Huruf Awal Kata',desc:'Bola diawali huruf apa?',art:'book'},
 {id:'R04',world:'read',name:'Cari Huruf Vokal',desc:'Kenali A, I, U, E, O',art:'letter'},
 {id:'M03',world:'math',name:'Angka & Jumlah',desc:'Cocokkan angka dan apel',art:'basket'},
 {id:'M07',world:'math',name:'Apel Berkurang',desc:'Diambil berapa, sisanya berapa?',art:'apple'},
 {id:'E02',world:'english',name:'English Numbers',desc:'One, two, three!',art:'number'},
 {id:'S02',world:'colors',name:'Kenal Bentuk',desc:'Lingkaran, segitiga, dan lainnya',art:'shapes'},
 {id:'S04',world:'colors',name:'Lanjutkan Pola',desc:'Lihat urutan, cari lanjutannya',art:'puzzle'},
];
export const colors=[['merah','red','#ed6555'],['biru','blue','#67b9eb'],['kuning','yellow','#ffda5d'],['hijau','green','#8ccc8a'],['merah muda','pink','#ffc1d5'],['ungu','purple','#b6a2f7'],['jingga','orange','#ff986c'],['cokelat','brown','#ad7959'],['hitam','black','#303030'],['putih','white','#ffffff']];
export const animals=[['kucing','cat'],['anjing','dog'],['burung','bird'],['ikan','fish'],['sapi','cow'],['singa','lion'],['kelinci','rabbit'],['bebek','duck'],['gajah','elephant'],['kura-kura','turtle'],['kupu-kupu','butterfly'],['kuda','horse']];
export const words=[['bola','ball'],['buku','book'],['apel','apple'],['sapi','cow'],['ikan','fish'],['topi','hat'],['meja','table'],['kursi','chair'],['mobil','car'],['tas','bag'],['jam','clock'],['rumah','house'],['bunga','flower'],['bulan','moon'],['roti','bread'],['gelas','cup'],['pohon','tree'],['mata','eye'],['pisang','banana'],['bebek','duck']];
export const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const letterNames=['a','be','ce','de','e','ef','ge','ha','i','je','ka','el','em','en','o','pe','ki','er','es','te','u','ve','we','eks','ye','zet'];
export const associations=['apel','bola','cicak','daun','elang','foto','gajah','hujan','ikan','jam','kucing','lampu','mobil','nanas','obat','pohon','Quran','rumah','sapi','topi','ular','vas','wortel','xilofon','yoyo','zebra'];
export const syllables=['ba','bi','bu','be','bo','ma','mi','mu','me','mo','pa','pi','pu','pe','po','sa','si','su','se','so'];
export const arabic='ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن و ه لا ء ي'.split(' ');
export const arabicNames=['Alif','Ba','Ta','Tsa','Jim','Ha tenggorokan','Kha','Dal','Dzal','Ra','Zai','Sin','Syin','Shad','Dhad','Tha','Zha','Ain','Ghain','Fa','Qaf','Kaf','Lam','Mim','Nun','Wau','Ha ringan','Lam Alif','Hamzah','Ya'];
export const singleNumberNames=['nol','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan'];
export function numberName(n:number):string{
 if(n<10)return singleNumberNames[n]||String(n);
 if(n===10)return 'sepuluh';if(n===11)return 'sebelas';
 if(n<20)return `${singleNumberNames[n-10]} belas`;
 if(n<100)return `${singleNumberNames[Math.floor(n/10)]} puluh${n%10?' '+singleNumberNames[n%10]:''}`;
 if(n===100)return 'seratus';return String(n);
}
export const numberNames=Array.from({length:101},(_,i)=>numberName(i));
const numberEnglish=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const num=(n:number):Choice=>({id:String(n),label:String(n),aliases:[numberNames[n],numberEnglish[n]]});
function choices(pool:Choice[],index:number){const out=[0,1,2,3].map(n=>pool[(index+n)%pool.length]); return out.map((_,j)=>out[(j+index)%out.length]);}
const seed=(activity:string,i:number,prompt:string,pool:Choice[],answerIndex:number,extra:Partial<Question>={}):Question=>{
 const target=pool[answerIndex];return {id:`${activity}-${i}`,activity,version:1,level:1,prompt,choices:choices(pool,answerIndex),answer:target.id,success:`Iya, ${target.label}! Kamu sudah mencoba dengan baik.`,hints:[`Perhatikan lagi. Kita mencari ${target.label}.`,`Ini contohnya: ${target.label}. Sentuh kartu yang diberi tanda bintang.`],...extra};
};
export const questions:Question[]=[];
const letters=alphabet.map((x,i)=>({id:x,label:x,aliases:[letterNames[i]]}));
alphabet.forEach((x,i)=>questions.push(seed('R01',i,`Mana huruf ${x}?`,letters,i,{target:letters[i],spoken:`Mana huruf ${letterNames[i]}?`,success:`Betul! Ini huruf ${letterNames[i]}. ${x} untuk ${associations[i]}.`})));
const syl=syllables.map(x=>({id:x,label:x,aliases:[x]}));
syllables.forEach((x,i)=>questions.push(seed('R05',i,`Ayo temukan suku kata “${x}”.`,syl,i,{target:syl[i],success:`Betul, ${x}! Sekarang kita coba suku kata lain.`})));
const wordChoices=words.map(([label,art])=>({id:label,label,art}));
words.forEach(([word],i)=>questions.push(seed('R07',i,`Gambar mana yang cocok dengan kata “${word}”?`,wordChoices,i,{target:{id:word,label:word},success:`Iya, ini ${word}. Kata dan gambarnya cocok!`})));
const nums=Array.from({length:101},(_,i)=>num(i));
nums.forEach((n,i)=>questions.push(seed('M01',i,`Mana angka ${numberNames[i]}?`,nums.slice(0,i<=5?6:i<=10?11:i<=20?21:101),i,{level:i<=5?1:i<=10?2:3,target:n,spoken:`Cari angka ${numberNames[i]}`,success:`Betul! Ini angka ${numberNames[i]}.`})));
const dozenAndTens=[...Array.from({length:10},(_,i)=>i+10),...Array.from({length:9},(_,i)=>(i+2)*10)];
dozenAndTens.forEach((n,i)=>questions.push(seed('M08',i,`Cari angka ${numberName(n)}.`,nums.slice(0,101),n,{level:n<20?2:3,spoken:`Mana angka ${numberName(n)}?`,target:num(n),success:`Hebat! ${n} dibaca ${numberName(n)}.`})));
for(let n=1;n<=10;n++)questions.push(seed('M02',n,'Ada berapa apel? Sentuh setiap apel sambil menghitung.',nums.slice(0,n<=5?6:11),n,{objects:n,level:n<=5?1:2,success:`Iya! Ada ${numberNames[n]} apel. ${numberNames.slice(1,n+1).join(', ')}.`,hints:['Sentuh apel satu per satu. Apel yang sudah dihitung mendapat tanda centang.',`Hitung bersama: ${numberNames.slice(1,n+1).join(', ')}. Ada ${numberNames[n]} apel.`]}));
let ix=0;for(let a=1;a<=5;a++)for(let b=1;b<=5;b++){const total=a+b;questions.push(seed('M06',ix++,`${a} apel ditambah ${b} apel. Jadi berapa?`,nums.slice(0,total<=5?6:11),total,{objects:total,addends:[a,b],level:total<=5?1:2,success:`Betul! ${numberNames[a]} ditambah ${numberNames[b]} sama dengan ${numberNames[total]}.`,hints:['Gabungkan kedua kelompok. Sentuh semua apel untuk menghitung.',`Kita hitung semuanya: ${numberNames.slice(1,total+1).join(', ')}. Jumlahnya ${numberNames[total]}.`]}));}
const colorChoices=colors.map(([id,en,color])=>({id,label:id,color,aliases:[en]}));
colors.forEach(([id,en],i)=>{
 questions.push(seed('S01',i,`Mana warna ${id}?`,colorChoices,i,{target:colorChoices[i],success:`Iya, ini warna ${id}!`}));
 questions.push(seed('E03',i,`“${en}” artinya ${id}. Pilih warnanya.`,colorChoices,i,{english:en,target:{id:en,label:en},success:`Betul! ${en} berarti ${id}.`}));
});
const animalChoices=animals.map(([label,art])=>({id:art,label,art,aliases:[art]}));
animals.forEach(([id,en],i)=>questions.push(seed('E04',i,`“${en}” adalah ${id}. Mana gambarnya?`,animalChoices,i,{english:en,target:{id:en,label:en},success:`Iya! ${en} adalah ${id}.`})))
const arabicChoices=arabic.map((x,i)=>({id:x,label:x,aliases:[arabicNames[i]]}));
arabic.forEach((x,i)=>{
 const name=arabicNames[i];
 questions.push(seed('H01',i,`Mana huruf ${name}?`,arabicChoices,i,{spoken:`Cari huruf ${name}. ${name}.`,pronunciation:name,success:`Bagus! Ini huruf ${name}.`,hints:[`Cari bentuk ${name}. Lihat jumlah titik pada hurufnya.`,`Ini huruf ${name}. Pilih kartu bertanda bintang.`]}));
 questions.push(seed('H02',i,`Dengarkan: ${name}. Cari hurufnya!`,arabicChoices,i,{spoken:`Dengarkan. ${name}. Sekali lagi: ${name}.`,pronunciation:name,success:`Betul! ${name}.`,hints:[`Dengarkan nama ${name}. Perhatikan bentuk hurufnya.`,`Huruf ${name} ada di kartu berbintang.`]}));
});
words.forEach(([word],i)=>questions.push(seed('G02',i,`Di mana ${word}?`,wordChoices,i,{success:`Ketemu! Ini ${word}. Yuk, cari benda lainnya.`})));
// Gambar pilihan hewan & makanan dibuat di Art.tsx, tidak bergantung CDN.
const animalIndonesian=animals.map(([label,art])=>({id:label,label,art,aliases:[label]}));
animals.forEach(([label],i)=>questions.push(seed('G03',i,`Cari hewan yang bernama ${label}.`,animalIndonesian,i,{spoken:`Hewan mana namanya ${label}?`,success:`Benar! Ini ${label}.`})));
export const foodCards:Choice[]=[
 {id:'rumput',label:'Rumput',art:'grass'},
 {id:'daun',label:'Daun',art:'leaves'},
 {id:'biji-bijian',label:'Biji-bijian',art:'seeds'},
 {id:'ikan',label:'Ikan',art:'fish'},
 {id:'daging',label:'Daging',art:'meat'},
 {id:'wortel',label:'Wortel',art:'carrot'},
 {id:'pisang',label:'Pisang',art:'banana'},
 {id:'bambu',label:'Bambu',art:'bamboo'},
 {id:'nektar',label:'Nektar bunga',art:'flower'},
 {id:'serangga',label:'Serangga',art:'insect'},
 {id:'sayuran',label:'Sayuran',art:'vegetable'},
 {id:'cacing',label:'Cacing',art:'worm'},
];
// Pertanyaan dibuat spesifik dan sederhana. Beberapa hewan memakan banyak jenis makanan.
export const animalFoods:[string,string,string][]=[
 ['sapi','cow','rumput'],['kuda','horse','rumput'],['kelinci','rabbit','rumput'],
 ['gajah','elephant','daun'],['burung pipit','bird','biji-bijian'],
 ['kucing','cat','ikan'],['singa','lion','daging'],['anjing','dog','daging'],
 ['kupu-kupu','butterfly','nektar'],['bebek','duck','serangga'],
 ['kura-kura darat','turtle','sayuran'],['ulat','worm','daun'],
 ['panda','panda','bambu'],['monyet','monkey','pisang'],
 ['ayam','chicken','biji-bijian'],['burung pelatuk','bird','serangga'],
];
animalFoods.forEach(([animal,art,food],i)=>{
 const answerIndex=foodCards.findIndex(f=>f.id===food);
 questions.push(seed('G04',i,`${animal[0].toUpperCase()+animal.slice(1)} makan apa?`,foodCards,answerIndex,{
  target:{id:animal,label:animal,art},spoken:`${animal} makan apa? Pilih gambarnya.`,
  success:`Benar! ${animal} bisa makan ${food}.`,hints:[`Coba cari gambar ${food}.`,`Pilih gambar ${food}, ya.`]
 }));
});
export const memorySets=[['apple','ball','book','cat'],['fish','cow','hat','car'],['bird','dog','moon','tree'],['cup','banana','flower','bag'],['rabbit','duck','clock','bread']];
export const artLabels:Record<string,string>=Object.fromEntries([...words,...animals].map(([id,art])=>[art,id]));
export function getPool(id:string,level:number){return questions.filter(q=>q.activity===id&&q.level<=level);}
export type QuestionOrder='sequential'|'random';
export type SessionLength='short'|'all';
export function sessionQuestions(id:string,level:number,offset:number,order:QuestionOrder='sequential',length:SessionLength='short'){
 // Materi penuh dapat dijangkau di semua level; level hanya membatasi jumlah pilihan.
 const pool=getPool(id,4);
 if(!pool.length)return [];
 const count=length==='all'?pool.length:Math.min(10,pool.length);
 const start=length==='all'?0:offset*count;
 if(order==='sequential')return Array.from({length:count},(_,i)=>pool[(start+i)%pool.length]);
 const byCycle=new Map<number,Question[]>();
 return Array.from({length:count},(_,i)=>{
  const absolute=start+i,cycle=Math.floor(absolute/pool.length);
  if(!byCycle.has(cycle))byCycle.set(cycle,shuffleQuestions(pool,id,cycle));
  return byCycle.get(cycle)![absolute%pool.length];
 });
}
function shuffleQuestions(pool:Question[],activity:string,cycle:number){
 const items=[...pool];let seed=2166136261;
 for(const ch of activity)seed=Math.imul(seed^ch.charCodeAt(0),16777619)>>>0;
 seed=(seed+cycle*9973+7)>>>0;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}
 return items;
}
export function visibleChoices(q:Question,level:number,errors=0){const limit=errors>=2?2:level===1?2:level===4?4:3;const correct=q.choices.find(c=>c.id===q.answer)!;const wrong=q.choices.filter(c=>c.id!==q.answer).slice(0,limit-1);const out=[...wrong];out.splice((q.id.split('').reduce((a,c)=>a+c.charCodeAt(0),0))%limit,0,correct);return out;}

// T0-B expansion: concrete, curated variations on the same tested dialog engine.
const lower=alphabet.map((x,i)=>({id:x.toLowerCase(),label:x.toLowerCase(),aliases:[letterNames[i]]}));
alphabet.forEach((x,i)=>questions.push(seed('R02',i,`Huruf kecil dari ${x} yang mana?`,lower,i,{target:{id:x,label:x},spoken:`Mana huruf kecil dari ${letterNames[i]}?`,success:`Betul! ${x} besar berpasangan dengan ${x.toLowerCase()} kecil.`})));
words.forEach(([word,art],i)=>{const first=word[0].toUpperCase();questions.push(seed('R03',i,`Kata ${word} diawali huruf apa?`,letters,alphabet.indexOf(first),{target:{id:word,label:word,art},success:`Betul! ${word} diawali huruf ${letterNames[alphabet.indexOf(first)]}.`}));});
const vowels=['A','I','U','E','O'].map(label=>({id:label,label}));
vowels.forEach((v,i)=>questions.push(seed('R04',i,`Cari huruf vokal ${v.label}.`,vowels,i,{target:v,success:`Ya, ${v.label} adalah salah satu huruf vokal.`})));
const groups=Array.from({length:10},(_,i)=>({id:String(i+1),label:`${i+1} apel`,count:i+1,aliases:[numberNames[i+1]]}));
for(let n=1;n<=10;n++)questions.push(seed('M03',n,`Pilih kelompok yang berisi ${numberNames[n]} apel.`,groups.slice(0,n<=5?5:10),n-1,{target:num(n),level:n<=5?1:2,success:`Cocok! Angka ${n} berarti ada ${numberNames[n]} apel.`}));
let subIndex=0;for(let n=1;n<=5;n++)for(let taken=1;taken<=n;taken++)questions.push(seed('M07',subIndex++,`Ada ${n} apel. Diambil ${taken}. Berapa yang tersisa?`,nums.slice(0,6),n-taken,{subtract:[n,taken],objects:n-taken,success:`Betul! ${n} dikurangi ${taken} sama dengan ${n-taken}.`,hints:['Apel bertanda silang sudah diambil. Hitung yang masih utuh.',`Ada ${n} apel, ${taken} diambil. Sisanya ${numberNames[n-taken]}.`]}));
for(let n=1;n<=10;n++)questions.push(seed('E02',n,`“${numberEnglish[n]}” artinya ${numberNames[n]}. Pilih angkanya.`,nums.slice(0,n<=5?6:11),n,{english:numberEnglish[n],target:{id:numberEnglish[n],label:numberEnglish[n]},level:n<=5?1:2,success:`Betul! ${numberEnglish[n]} berarti ${numberNames[n]}.`}));
export const shapes:Choice[]=[['lingkaran','circle'],['persegi','square'],['segitiga','triangle'],['oval','oval'],['bintang','star'],['persegi panjang','rectangle']].map(([label,art])=>({id:label,label,art}));
shapes.forEach((s,i)=>questions.push(seed('S02',i,`Mana bentuk ${s.label}?`,shapes,i,{target:s,success:`Tepat! Ini bentuk ${s.label}.`}))); 
for(let i=0;i<10;i++){const a=colorChoices[i],b=colorChoices[(i+1)%10];questions.push(seed('S04',i,`Pola ${a.label}, ${b.label}, ${a.label}. Warna apa berikutnya?`,colorChoices,(i+1)%10,{pattern:[a,b,a],success:`Betul! ${a.label}, ${b.label}, ${a.label}, ${b.label}. Polanya berulang.`,hints:[`Setelah ${a.label}, warna ${b.label}. Lihat urutan pertama.`,`Kita ulangi: ${a.label}, ${b.label}, ${a.label}, ${b.label}. Pilih ${b.label}.`]}));}
