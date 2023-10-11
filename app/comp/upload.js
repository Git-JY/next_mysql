"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function upload() {
  const [imageView, setImageView] = useState();
  const [data, setData] = useState([]);
  // const [testBlob, setTestBlob] = useState();

  console.log('imageView: ', imageView);

  // submit시 발동
  const uploadFile = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const obj = Object.fromEntries(formdata);
    console.log('obj', obj);
    
    const fr = new FileReader(); //파일 읽는 거
    fr.readAsDataURL(obj.upload); // 읽는데 시간이 걸림

    fr.addEventListener('load', () => {//이미지를 읽는 시간
        console.log('-----', fr.result);

        // 이미지 명 => obj.title
        // 이미지 => fr.result
        axios.post('/api/upload/files', {
            title: obj.title,
            imgUrl: fr.result
        })

    })

  }//uploadFile(e) 함수정의

  const getFile = async () => {
    // const d = await axios.get('/api/upload/files');
    // console.log(d.data);
    // setData(d.data);

    const d = await axios.get('/api/upload/files');
    const setD = d.data.map(obj => {
      obj.imgUrl = base64Blob(obj.imgUrl);

      return obj;
    })
    
    setData(setD)
  }//getFile() 함수정의

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// DB에서 가져온 사진의 긴 코드를 가져올 때, 해당 url이 필요해서 브라우저에서 잠깐 저장해두는 걸 용량을 적게 하기 위해 쓰는 코드 
// 긴 코드 압축하기  
  function base64Blob(b64Data, contentType = '') {
    const image_data = atob(b64Data.split(',')[1]); // data:image/gif;base64 필요없으니 떼주고, base64 인코딩을 풀어준다 //atob()함수가 떼줘서 깨지는 걸 방지해주기 위함 -> 지금보다 원본으로 만들어줌
 

    // 중간과정(new Blob()의 인수에 넣기 위한 중간 과정) ↓
    const arraybuffer = new ArrayBuffer(image_data.length); // 큰 공간에 image_data.length 개수만큼의 방을 만듦
    const view = new Uint8Array(arraybuffer); // 더 쪼개진 공간에 넣음 // 하지만 arraybuffer와 연결되어 있음
    
    for (let i = 0; i < image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff; // i번째의 한 글자 바이트(byte)로 추출
        // charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
        // 2진수
        // 비트연산자 & 와 0xff(255) 값은 숫자를 양수로 표현하기 위한 설정
    }
    // 중간과정 ↑
    
    const blob =  new Blob([arraybuffer], { type: contentType });
    return URL.createObjectURL(blob); // 이 방식은 1회성이라서 해당 브라우저에서만 가능 // url을 브라우저에 옮겨 붙인다고 안 나옴 // 인터넷이 아닌, 내 브라우저 안 공간에 존재하기 때문
 }
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  useEffect(() => {
    getFile();
  }, []);

  return (
    <div>
        <h2>파일 업로드</h2>
        <form 
        onSubmit={uploadFile} 
        method='post' // get의 url방식으로는 사진의 긴 글자를 못 보냄, post로 바꾸삼  
        encType='multipart/form-data'
        > 
            <p><input type='text' name='title' /></p>
            <p>
                <input type='file' name='upload'  // 우리 컴퓨터에 있는 거라 읽어들일 수 있음
                onChange={ (e) => {
                    console.log(e.target.files);
                    
                    const file = e.target.files[0];
                    file && setImageView( URL.createObjectURL(file) ); // URL.createObjectURL() 브라우저의 어느 공간에 있는 해당 파일(복사된 거)의 url 보내줌
                    // file && : file이 존재할 때(true일 때), setImageView(URL.createObjectURL(file)); 실행 // 취소버튼을 누를 경우를 생각함
                } }
                /><br/>
                <img src={imageView} width="200"/>
            </p>
            <p><input type='submit' value='저장' /></p>
        </form>

        <div>
            {
                data.map(obj => (
                    <figure key={obj.num}>
                        <img src={obj.imgUrl} alt="" width="200"/>
                        <figcaption>{obj.title}</figcaption>
                    </figure>
                ))
            }
        </div>
    </div>
  )
}
