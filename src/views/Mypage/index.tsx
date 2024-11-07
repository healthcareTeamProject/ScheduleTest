import React, { useState, useEffect } from 'react';
import './style.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// EventType 타입 정의
type EventType = {
    id: string;
    title: string;
    start: string;
    description?: string;
};

export default function Mypage() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

    // 선택한 이벤트에 따라 상태 업데이트
    useEffect(() => {
        if (selectedEvent) {
            setNewEventTitle(selectedEvent.title);
            setNewEventDescription(selectedEvent.description || '');
        }
    }, [selectedEvent]);

    // 날짜 클릭 시 일정 추가 모달 열기
    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr);
        setIsModalOpen(true);
    };

    // 일정 클릭 시 수정/삭제 모달 열기
    const handleEventClick = (arg: any) => {
        setSelectedEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start.toISOString().split('T')[0],  // 날짜만 가져오기 (시간 제외)
            description: arg.event.extendedProps.description || ''
        });
        setIsEditModalOpen(true);
    };

    // 일정 추가
    const handleAddEvent = () => {
        if (newEventTitle) {
            const newEvent: EventType = {
                id: (events.length + 1).toString(),
                title: newEventTitle,
                start: selectedDate,
                description: newEventDescription,
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            setIsModalOpen(false);
            setNewEventTitle('');
            setNewEventDescription('');
        }
    };

    // 일정 수정
    const handleEditEvent = () => {
        if (selectedEvent && newEventTitle) {
            const updatedEvent = {
                ...selectedEvent,
                title: newEventTitle,
                description: newEventDescription,
                start: selectedEvent.start,  // 기존 start 값 그대로 유지
            };
            setEvents((prevEvents) =>
                prevEvents.map((event) => (event.id === selectedEvent.id ? updatedEvent : event))
            );
            setIsEditModalOpen(false);
            setSelectedEvent(null);
            setNewEventTitle('');
            setNewEventDescription('');
        }
    };

    // 일정 삭제
    const handleDeleteEvent = () => {
        if (selectedEvent) {
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
            setIsEditModalOpen(false);
            setSelectedEvent(null);
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
                eventClick={handleEventClick}
                editable={true}
                droppable={true}
            />

            {/* 일정 추가 모달 */}
            <Modal
                className="my-modal-content"
                overlayClassName="my-modal-overlay"
                isOpen={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(false);
                    setNewEventTitle('');
                    setNewEventDescription('');
                }}
                contentLabel="일정 추가"
            >
                <div>일정추가</div>
                <div>날짜: {selectedDate}</div>
                <select
                    className="modal-title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                >
                    <option value="" disabled>일정 시간을 선택하세요</option>
                    <option value="아침">아침</option>
                    <option value="점심">점심</option>
                    <option value="저녁">저녁</option>
                </select>
                <textarea
                    className="modal-memo"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    placeholder="일정 설명을 입력하세요"
                />
                <button onClick={handleAddEvent}>추가</button>
                <button onClick={() => setIsModalOpen(false)}>취소</button>
            </Modal>

            {/* 일정 수정/삭제 모달 */}
            <Modal
                className="my-modal-content"
                overlayClassName="my-modal-overlay"
                isOpen={isEditModalOpen}
                onRequestClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedEvent(null);
                    setNewEventTitle('');
                    setNewEventDescription('');
                }}
                contentLabel="일정 수정"
            >
                <div>일정 수정</div>
                <div>날짜: {selectedEvent?.start}</div>
                <select
                    className="modal-title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                >
                    <option value="" disabled>일정 시간을 선택하세요</option>
                    <option value="아침">아침</option>
                    <option value="점심">점심</option>
                    <option value="저녁">저녁</option>
                </select>
                <textarea
                    className="modal-memo"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    placeholder="일정 설명을 입력하세요"
                />
                <div>
                    <button onClick={handleEditEvent}>수정</button>
                    <button onClick={handleDeleteEvent}>삭제</button>
                    <button onClick={() => setIsEditModalOpen(false)}>취소</button>
                </div>
            </Modal>
        </div>
    );
}