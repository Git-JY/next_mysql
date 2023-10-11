//upload 만 쓰면 [num]이 실행되어서 upload/files로 폴더 2개 만듦
import { queryExecute } from "../../db"; // db연결하는 거 가져오기

export async function GET(){
    const q = 'select * from files'
    const data = await queryExecute(q)

    return Response.json(data);  
}

export async function POST(req){
    console.log('ddddd req', req); // 읽어들이는 데 시간이 걸려서 // title, imgUrl 안 나올 수 있음
    
    const {title, imgUrl} = await req.json(); //await를 건 게 title, imgUrl값 들어오는데 시간이 걸려서 기다리라고 씀
    const q = `insert into files (title, imgUrl) values(?,?)`; // files 테이블에 레코드 삽입


    // const imgUrl = req.nextUrl.searchParams.get('imgUrl');
    // console.log('title, imgUrl', title, imgUrl);

    await queryExecute(q, [title, imgUrl]);
    return Response.json({done: '성공!!!'});
}