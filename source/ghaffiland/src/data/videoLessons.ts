import manifest from './videos.json';
import {questions} from './curriculum';
export const videoLessons=manifest;
export function videoQuestion(lesson:number,scene:number){
 const id=videoLessons[lesson].clips[scene].questionId;
 const question=questions.find(q=>q.id===id);
 if(!question)throw new Error(`Missing video question ${id}`);
 return question;
}
export function videoLabel(id:string){return videoLessons.find(v=>v.id===id)?.title;}
export function mediaUrl(id:string,ext:'mp4'|'jpg'){
 const embedded=(window as Window&{__GHAFFI_MEDIA__?:Record<string,string>}).__GHAFFI_MEDIA__;
 return embedded?.[`${id}.${ext}`]||`./videos/${id}.${ext}`;
}
