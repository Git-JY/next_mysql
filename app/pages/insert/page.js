import Insert from '../../comp/Insert' //jsconfig.json 설정에 이렇게 되어있음
// import Insert from '../../comp/Insert.js';
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
        <h2>Insert..비주얼...설명..</h2>
        <Insert />

        <Link href="/">Home</Link>&nbsp;
        <Link href="./list">List보기</Link> {/* 이런 폴더중심 경로는 라우팅(Link같은 이동)만 그럼 */}
    </>
  )
}
