import { queryExecute } from "../db";

export async function DELETE(req, {params}){
    console.log('req req req req req req req', params);

    await queryExecute(`delete from member where num=?`, [params.num])
    const data = await queryExecute(`select * from member`);

    console.log('afterDelete afterDelete afterDelete afterDelete afterDelete ', data);
    
    return Response.json(data);
    // return Response.json([]);
}

export async function PUT(req, {params}){
    console.log('update update update update update', params);

    const data = await req.json(); //req과 string으로 들어오는지 json()형태로 바꿔줘야함
    console.log('data data data data data', data)
    const q = await queryExecute(`update member set name=? where num=?`, [data.name, params.num]);

    const getData = await queryExecute('select * from member');
    
    return Response.json(getData); // Response는 window처럼 기본으로 주어지는 객체()
    // return Response.json([]);
}