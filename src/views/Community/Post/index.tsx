import React from "react";
import './style.css';

export default function Post() {

    return (
        <div id='post'>
            <div className='Top'>
                <div className='category-tag'>
                    <div className='categoryTitle'>카테고리*</div>
                    <div className='categorySelectBar'>카테고리</div>
                    <div className='tagSelectBar'>태그</div>
                </div>
                <div className='titleHead'>
                    <div className='title'>제목</div>
                    <input className='titleInput' placeholder='숫자, 글자, 특수문자를 포함한 한글 30자 영문 90자 이내 제목 입력'/>
                </div>
                <div className='youtube'>
                    <div className='youtubeLink'>유튜브 링크</div>
                    <input className='youtubeInput' placeholder='d'/>
                </div>
                <div className='content'>
                    <div className='contentTitle'>내용</div>
                    <input className='contentInput' placeholder='숫자, 글자, 특수문자를 포함한 1000자 이내 내용 입력' />
                </div>
                <div className='attachment'>
                    <div className='attachmentTitle'>첨부파일</div>
                    <div className='attachmentBottom'>
                        <div className='fileSelectBox1'>
                            <div className='fileSelectButton1'>파일선택</div>
                            <div className='fileSelectInput1'></div>
                            <div className='cancel1'>취소</div>
                        </div>
                        <div className='fileSelectBox2'>
                            <div className='fileSelectButton2'>파일선택</div>
                            <div className='fileSelectInput2'></div>
                            <div className='cancel2'>취소</div>
                        </div>
                        <div className='fileSelectBox3'>
                            <div className='fileSelectButton3'>파일선택</div>
                            <div className='fileSelectInput3'></div>
                            <div className='cancel3'>취소</div>
                        </div>
                    </div>
                    <div className='attachmentText'>'png','gif','jpg','jpeg','mp4','mkv','avi'파일만 등록 가능합니다.</div>
                </div>
            </div>
            <div className='Bottom'>
                <div className='bottomButton'>
                    <div className='uploadButton'>업로드</div>
                    <div className='cancelButton'>취소</div>
                </div>
            </div>
        </div>
    )
}