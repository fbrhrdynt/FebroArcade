export type Scene={text:string;art:string;choices:{label:string;art:string;next:string}[]};
export const story:Record<string,Scene>={
 start:{text:'Ghaffi ingin piknik bersama teman. Apa yang kita bawa?',art:'basket',choices:[{label:'Bawa apel',art:'apple',next:'apple'},{label:'Bawa roti',art:'bread',next:'bread'}]},
 apple:{text:'Apel sudah di keranjang. Di taman, ada kucing menunggu temannya. Kita mau apa?',art:'cat',choices:[{label:'Duduk dan menunggu bersama',art:'tree',next:'wait'},{label:'Ajak melihat kupu-kupu',art:'butterfly',next:'look'}]},
 bread:{text:'Roti sudah di keranjang. Di taman, ada bebek berjalan. Kita mau apa?',art:'duck',choices:[{label:'Lihat dari jauh',art:'eye',next:'look'},{label:'Duduk di bawah pohon',art:'tree',next:'wait'}]},
 wait:{text:'Asyik duduk di tempat teduh. Sebelum makan, kita cuci tangan bersama pendamping. Setelah piknik, apa yang kita lakukan?',art:'tree',choices:[{label:'Rapikan keranjang',art:'basket',next:'tidy'},{label:'Kumpulkan sampah ke tempatnya',art:'bag',next:'clean'}]},
 look:{text:'Kita mengamati hewan dengan tenang tanpa mengganggu. Sebelum makan, kita cuci tangan bersama pendamping. Setelah piknik, apa yang kita lakukan?',art:'butterfly',choices:[{label:'Rapikan keranjang',art:'basket',next:'tidy'},{label:'Kumpulkan sampah ke tempatnya',art:'bag',next:'clean'}]},
 tidy:{text:'Keranjang sudah rapi. Terima kasih sudah saling membantu. Sampai jumpa, taman!',art:'basket',choices:[]},
 clean:{text:'Taman kembali bersih. Terima kasih sudah merawat tempat bermain. Sampai jumpa, teman!',art:'flower',choices:[]},
};
