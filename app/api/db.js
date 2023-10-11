var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.NEXT_PUBLIC_HOST,
  user     : process.env.NEXT_PUBLIC_USER,
  password : process.env.NEXT_PUBLIC_PASSWORD,
  database : process.env.NEXT_PUBLIC_DATABASE,
  port : process.env.NEXT_PUBLIC_PORT
});
 
connection.connect();
 
export async function queryExecute(str, value){
    
    
    //await는 비동기함수만 작동하는데 connection이 동기 함수라서 작동안하므로 new Promise로 비동기로 만듦

    // return await new Promise((resolve, reject) => { // 이렇게 바로 return해도 되고
    let data = await new Promise((resolve, reject) => { // 이렇게 data로 넣은 후 보내도 됨
        connection.query(str, value, function(error, results){ // value는 str의 ?에 들어감
            resolve(results);  // 성공하면 resolve()의 인수 (ex. result)가 return // 실패하면 reject()의 인수가 return (ex. reject('실패') => '실패' 문자열 리턴)
        });
    });

    // console.log('data ===== =====', data);
    return data;


    /*     
        let a;        // str: 'SELECT * from member'
        let b = await connection.query(str, function (error, results) { // results에 조회한 내용이 나옴  
        if (error) throw error;
        console.log('The solution is: ', results[0]);

        a = results; 
        return a; // 이때의 return은 connection의 return이 아닌, function (error, results) {} 콜백함수의 return임 // 그러므로 b에는 connection의 별 쓸모없는 리턴값 내놓음
        });

        console.log('들어오기 전------------------------', a); // undefined // a = result 전에 콘솔이 먼저 찍힘
        // connection이 동기함수이나 function (error, results) {}콜백함수가 다 실행하기 전에 connection만 실행해서 
           a = results; 로 값이 넣어지기 전에 콘솔이 실행되서 undefined가 나옴 그래서 콜백함수도 전부 실행후 다음 실행되도록 await를 써야하는데
           await는 비동기 함수에만 가능(connection은 동기 함수) 그러므도 new Promise()로 비동기로 만들기

        console.log('bbbbbbbb==========================', b); 
        return a; 
    */

}//queryExecute(str) 함수정의
 
// connection.end();