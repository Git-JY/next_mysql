"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function insert() { 
  const navi = useRouter();

  const insertFn = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const values = Object.fromEntries(formdata);
    console.log(values);

    axios.post('/api', values);
    navi.push('./list');


  }//insertFn() 함수정의

  return (
    <div>
      <form onSubmit={insertFn}>
        <p><input type='text' name='id' placeholder='id를 입력해주세요.'/></p>
        <p><input type='text' name='name' placeholder='이름을 입력해주세요.'/></p>
        <p><input type='email' name='email' placeholder='이메일을 입력해주세요.'/></p>
        <p><input type='submit' value="저장" /></p>
      </form>
    </div>
  )
}
