import { queryExecute } from './db';



// axios('/api') // => export function GET(){} 실행
// axios.post('/api') // => export function POST(){} 실행
// axios.post('/api/1234') // => api폴더 안에 1234폴더 안의 export function POST(){} 실행

export async function POST(req){
    const {id, name, email} = await req.json();
    console.log('-----', id, name, email);
    const data = await queryExecute(`insert into member (id, name, email) values (?,?,?)`, [id,name,email]);
    
    return Response.json("성공!");
}


export async function GET(){
    const host = process.env.NEXT_PUBLIC_HOST;
    console.log('host:', host);

    // DML)
    const data = await queryExecute('SELECT * from member');       // 레코드 내용에 하이픈(-) 넣지마삼, 언더바(_)는 가능 (ex. e-mail (x), e_mail(o) )    

    return Response.json(data); //객체 형태로 내보낼거다.
}






// DML)
    // const data = await queryExecute('SELECT * from member');       // 레코드 내용에 하이픈(-) 넣지마삼, 언더바(_)는 가능 (ex. e-mail (x), e_mail(o) )
    // const data = await queryExecute("insert into member (id, name, email) values ('abc', '홍길동', 'hong@gmail.com')"); 
                                // 레코드 삽입 // member 테이블에. (id, name, email)형식을 //()값으로  
    // const data = await queryExecute(`update member set name = '이지혜' where num = 6`); // num이 6번인 레코드의 name을 이지혜로 바꾸세요.
    // const data = await queryExecute(`delete from member where num = 2`); // num이 8인 레코드 제거 // where이라는 조건문이 없으면 모든 레코드를 제거함
    
// DDL)
    // const data = await queryExecute(`
    //     create table contact (
    //         name varchar(30),
    //         email varchar(100),
    //         contents text, 
    //         num int not null auto_increment,
    //         primary key(num)
    //     )
    // `); // contact라는 이름의 테이블 생성 // text라는 데이터 종류는 딱히 크기를 안 적어도 됨
    // const data = await queryExecute(`drop table contact`); // contact 테이블 삭제