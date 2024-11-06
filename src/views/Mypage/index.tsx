import React, { useState } from 'react';
import './style.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

Modal.setAppElement('#root');

type EventType = {
    title: string;
    date: string;
    description?: string;
};

export default function Mypage() {
    const [events, setEvents] = useState<EventType[]>([
        { title: 'Sample Event 1', date: '2024-11-01' },
        { title: 'Sample Event 2', date: '2024-11-05' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // 날짜 클릭 시 모달 열기 및 날짜 설정
    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr); // 클릭한 날짜를 selectedDate에 저장
        setIsModalOpen(true); // 모달 열기
    };

    // 일정 추가
    const handleAddEvent = () => {
        if (newEventTitle) {
            const newEvent: EventType = {
                title: newEventTitle,
                date: selectedDate,
                description: newEventDescription,
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            setIsModalOpen(false);
            setNewEventTitle('');
            setNewEventDescription('');
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
                className="my-modal-content"
                overlayClassName="my-modal-overlay"
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="일정 추가"
            >
                <div>일정추가</div>
                <div>날짜: {selectedDate}</div> {/* 선택한 날짜 표시 */}
                <input className='modal-title'
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="일정 제목을 입력하세요"
                />
                <textarea
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    placeholder="일정 설명을 입력하세요"
                />
                <button onClick={handleAddEvent}>추가</button>
                <button onClick={() => setIsModalOpen(false)}>취소</button>
            </Modal>
        </div>
    );
}