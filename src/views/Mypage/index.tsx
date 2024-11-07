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
    end: string;  // end 필드 추가 (끝 날짜)
    description?: string;
};

export default function Mypage() {
    // 상태 정의
    const [events, setEvents] = useState<EventType[]>([]);  // 일정 리스트
    const [isModalOpen, setIsModalOpen] = useState(false);  // 일정 추가 모달 상태
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // 일정 수정/삭제 모달 상태
    const [newEventTitle, setNewEventTitle] = useState('');  // 일정 제목
    const [newEventDescription, setNewEventDescription] = useState('');  // 일정 설명
    const [selectedStartDate, setSelectedStartDate] = useState('');  // 선택된 시작 날짜
    const [selectedEndDate, setSelectedEndDate] = useState('');  // 선택된 끝 날짜
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);  // 선택된 이벤트 (수정용)

    // 선택된 이벤트가 있을 때 상태 업데이트
    useEffect(() => {
        if (selectedEvent) {
            setNewEventTitle(selectedEvent.title);
            setNewEventDescription(selectedEvent.description || '');
        }
    }, [selectedEvent]);

    // 날짜 클릭 시 일정 추가 모달 열기
    const handleDateClick = (arg: any) => {
        setSelectedStartDate(arg.dateStr);  // 클릭한 날짜를 시작 날짜로 설정
        setSelectedEndDate(arg.dateStr);  // 끝 날짜는 기본적으로 시작 날짜로 설정
        setIsModalOpen(true);  // 일정 추가 모달 열기
    };

    // 일정 클릭 시 수정/삭제 모달 열기
    const handleEventClick = (arg: any) => {
        setSelectedEvent({
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start.toISOString().split('T')[0],  // 날짜만 포맷 (start)
            end: arg.event.end ? arg.event.end.toISOString().split('T')[0] : arg.event.start.toISOString().split('T')[0],  // 날짜만 포맷 (end), 없으면 start로 설정
            description: arg.event.extendedProps.description || ''  // 설명
        });
        setIsEditModalOpen(true);  // 일정 수정/삭제 모달 열기
    };

    // 일정 추가 함수
    const handleAddEvent = () => {
        if (newEventTitle && selectedStartDate && selectedEndDate) {
            const newEvent: EventType = {
                id: (events.length + 1).toString(),  // 새로운 ID는 현재 일정 개수 + 1
                title: newEventTitle,  // 일정 제목
                start: selectedStartDate,  // 시작 날짜
                end: selectedEndDate,  // 끝 날짜
                description: newEventDescription,  // 설명
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);  // 일정 리스트에 새로운 일정 추가
            setIsModalOpen(false);  // 일정 추가 모달 닫기
            setNewEventTitle('');  // 제목 초기화
            setNewEventDescription('');  // 설명 초기화
            setSelectedStartDate('');  // 시작 날짜 초기화
            setSelectedEndDate('');  // 끝 날짜 초기화
        }
    };

    // 일정 수정 함수
    const handleEditEvent = () => {
        if (selectedEvent && newEventTitle) {
            const updatedEvent = {
                ...selectedEvent,  // 기존 이벤트 정보 유지
                title: newEventTitle,  // 수정된 제목
                description: newEventDescription,  // 수정된 설명
                start: selectedEvent.start,  // 기존 시작 날짜 그대로 유지
                end: selectedEvent.end,  // 기존 끝 날짜 그대로 유지
            };
            setEvents((prevEvents) =>
                prevEvents.map((event) => (event.id === selectedEvent.id ? updatedEvent : event))  // 수정된 이벤트 반영
            );
            setIsEditModalOpen(false);  // 수정 모달 닫기
            setSelectedEvent(null);  // 선택된 이벤트 초기화
            setNewEventTitle('');  // 제목 초기화
            setNewEventDescription('');  // 설명 초기화
            setSelectedStartDate('');  // 시작 날짜 초기화
            setSelectedEndDate('');  // 끝 날짜 초기화
        }
    };

    // 일정 삭제 함수
    const handleDeleteEvent = () => {
        if (selectedEvent) {
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));  // 선택된 이벤트 삭제
            setIsEditModalOpen(false);  // 수정 모달 닫기
            setSelectedEvent(null);  // 선택된 이벤트 초기화
            setNewEventTitle('');  // 제목 초기화
            setNewEventDescription('');  // 설명 초기화
        }
    };

    return (
            
        <div id="my-wrapper">
            <div className='cal-box'>
                <div className='cal-left'></div>
                <div className='cal-right'>
                {/* FullCalendar 컴포넌트 */}
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}  // 플러그인 설정
                        initialView="dayGridMonth"  // 초기 보기 설정 (달력 형태)
                        events={events}  // 렌더링할 이벤트 리스트
                        dateClick={handleDateClick}  // 날짜 클릭 시 호출
                        eventClick={handleEventClick}  // 일정 클릭 시 호출
                        editable={true}  // 일정 드래그 및 수정 가능
                        droppable={true}  // 일정 드래그 가능
                        height="auto"
                    />
                </div>
            </div>
            {/* 일정 추가 모달 */}
            <Modal
                className="my-modal-content"
                overlayClassName="my-modal-overlay"
                isOpen={isModalOpen}  // 모달 열림 여부
                onRequestClose={() => {
                    setIsModalOpen(false);  // 모달 닫기
                    setNewEventTitle('');  // 제목 초기화
                    setNewEventDescription('');  // 설명 초기화
                    setSelectedStartDate('');  // 시작 날짜 초기화
                    setSelectedEndDate('');  // 끝 날짜 초기화
                }}
                contentLabel="일정 추가"
            >
                <div>일정추가</div>
                <div>시작 날짜: {selectedStartDate}</div>
                <div>
                    <label>시작 날짜</label>
                    <input
                        type="date"
                        value={selectedStartDate}
                        onChange={(e) => setSelectedStartDate(e.target.value)}  // 시작 날짜 변경
                    />
                </div>
                <div>
                    <label>끝 날짜</label>
                    <input
                        type="date"
                        value={selectedEndDate}
                        onChange={(e) => setSelectedEndDate(e.target.value)}  // 끝 날짜 변경
                    />
                </div>
                <select
                    className="modal-title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}  // 제목 변경
                >
                    <option value="" disabled>일정 시간을 선택하세요</option>
                    <option value="아침">아침</option>
                    <option value="점심">점심</option>
                    <option value="저녁">저녁</option>
                </select>
                <textarea
                    className='modal-memo'
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}  // 설명 변경
                    placeholder="일정 설명을 입력하세요"
                />
                <button onClick={handleAddEvent}>추가</button>
                <button onClick={() => setIsModalOpen(false)}>취소</button>
            </Modal>

            {/* 일정 수정/삭제 모달 */}
            <Modal
                className="my-modal-content"
                overlayClassName="my-modal-overlay"
                isOpen={isEditModalOpen}  // 모달 열림 여부
                onRequestClose={() => {
                    setIsEditModalOpen(false);  // 모달 닫기
                    setSelectedEvent(null);  // 선택된 이벤트 초기화
                    setNewEventTitle('');  // 제목 초기화
                    setNewEventDescription('');  // 설명 초기화
                }}
                contentLabel="일정 수정"
            >
                <div>일정 수정</div>
                <div>날짜: {selectedEvent?.start}</div>
                <div>
                    <label>시작 날짜</label>
                    <input
                        type="date"
                        value={selectedEvent?.start}
                        onChange={(e) => setSelectedStartDate(e.target.value)}  // 시작 날짜 변경
                    />
                </div>
                <div>
                    <label>끝 날짜</label>
                    <input
                        type="date"
                        value={selectedEvent?.end || selectedEvent?.start}
                        onChange={(e) => setSelectedEndDate(e.target.value)}  // 끝 날짜 변경
                    />
                </div>
                <select
                    className="modal-title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}  // 제목 변경
                >
                    <option value="" disabled>일정 시간을 선택하세요</option>
                    <option value="아침">아침</option>
                    <option value="점심">점심</option>
                    <option value="저녁">저녁</option>
                </select>
                <textarea
                    className="modal-memo"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}  // 설명 변경
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