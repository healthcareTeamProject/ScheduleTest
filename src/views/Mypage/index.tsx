import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { fileUploadRequest, getCustomerMyPageRequest, getUserMuscleFatListRequest, getUserThreeMajorLiftListRequest, nicknameCheckRequest, patchCustomerRequest, patchUserMuscleFatRequest, patchUserThreeMajorLiftRequest } from 'src/apis';
import { ACCESS_TOKEN } from 'src/constant';
import { GetCustomerMyPageResponseDto, GetUserMuscleFatListResponseDto, GetUserThreeMajorLiftListResponseDto } from 'src/apis/dto/response/customer';
import { ResponseDto } from 'src/apis/dto/response';
import { useSignInCustomerStroe } from 'src/stores';
import InputBox from 'src/components/InputBox';
import { NicknameCheckRequestDto } from 'src/apis/dto/request/auth';
import { PatchCustomerRequestDto, PatchUserMuscleFatRequestDto, PatchUserThreeMajorLiftRequestDto } from 'src/apis/dto/request/customer';


import FullCalendar from '@fullcalendar/react'; // FullCalendar React 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // DayGrid 뷰 (월별 보기)
import interactionPlugin from '@fullcalendar/interaction'; // 이벤트 드래그 & 드롭, 클릭 이벤트

import Modal from 'react-modal';

Modal.setAppElement('#root');


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);




// component: 마이페이지 컴포넌트 //
export default function Mypage() {

    const [events, setEvents] = useState([
        { title: 'Sample Event 1', date: '2024-11-01' },
        { title: 'Sample Event 2', date: '2024-11-05' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // 날짜 클릭 시 모달 열기
    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr);
        setIsModalOpen(true); // 모달 열기
    };

    // 일정 추가
    const handleAddEvent = () => {
        if (newEventTitle) {
            const newEvent = {
                title: newEventTitle,
                date: selectedDate,
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            setIsModalOpen(false);
            setNewEventTitle(''); // 입력값 초기화
        }
    };

    return (
        <div id="my-wrapper">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                editable={true}
                droppable={true}
            />

            {/* 모달 */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="일정 추가"
            >
                <h2>일정 추가</h2>
                <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="일정 제목을 입력하세요"
                />
                <button onClick={handleAddEvent}>추가</button>
                <button onClick={() => setIsModalOpen(false)}>취소</button>
            </Modal>
        </div>
    );
}
