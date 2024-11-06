import React, { useMemo, useState } from "react";
import './style.css'
import dayjs, { Dayjs } from "dayjs";
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md';


// interface: 캘린더 Props //
interface CalendarProps{
    selectDate: Dayjs;
    setSelectDate: (date: Dayjs) => void;
}

// component: 캘린더 컴포넌트 //
export default function Calendar({selectDate, setSelectDate}:CalendarProps) {
    
    dayjs.extend(weekday);
    dayjs.extend(isoWeek);
    dayjs.extend(weekOfYear);

    // state: 보여질 날짜 상태 //
    const [viewDate, setViewDate] = useState<Dayjs>(dayjs());

    // state: 보여질 날짜가 속한 달의 첫 주차 계산 상태 //
    const startWeek = viewDate.startOf('month').week();
    // state: 해당 달의 마지막 주차 상태 //
    const endWeek = viewDate.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();
    // state: 요일 배열 상태 //
    const weekDays = useMemo(()=> ['일', '월', '화', '수', '목', '금', '토'], []);

    // event handler: 달 변경 클릭 이벤트 처리 //
    const onCalendarMonthChangeClickButtonHandler = (date: Dayjs, changeString: 'add' | 'subtract' | 'today') => {
        // 다음 달로 이동 //
        if(changeString === 'add'){
            return setViewDate(viewDate.add(1, 'month'));
        // 이전 달로 이동 //
        }else if(changeString === 'subtract'){
            return setViewDate(viewDate.subtract(1, 'month'));
        // 오늘 날짜로 이동 //
        }else if(changeString === 'today'){
            return setViewDate(dayjs());
        }else{
            return date;
        }
    } 
    
    // render: 캘린더 컴포넌트 렌더링 //
    return (
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={() => onCalendarMonthChangeClickButtonHandler(viewDate, 'subtract')}>
                        <MdArrowBackIos />
                    </button>
                    <span onClick={() => onCalendarMonthChangeClickButtonHandler(viewDate, 'today')}>{viewDate.format('M')}월</span>
                    <button onClick={() => onCalendarMonthChangeClickButtonHandler(viewDate, 'add')}>
                        <MdArrowForwardIos />
                    </button>
                </div>
                <div className="calendar-content">
                    <div className="week-header">
                        {weekDays.map((day, i) => (
                            <div key={i} className={`day-header ${i === 0 ? 'sunday' : ''}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="dates">
                    {Array.from({ length: endWeek - startWeek + 1 }, (_, index) => startWeek + index).map((week) => (
                        <div key={week} className="week">
                        {Array(7)
                            .fill(0)
                            .map((_, i) => {
                            // 나타낼 날짜
                            const current = viewDate.week(week).startOf('week').add(i, 'day');
                            // 선택됐는지 여부
                            const isSelected = selectDate.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
                            // 오늘 날짜 여부
                            const isToday = dayjs().format('YYYYMMDD') === current.format('YYYYMMDD') ? 'today' : '';
                            // 보여질 날짜가 아닌 경우 (다른 달의 날짜인 경우)
                            const isNone = current.format('MM') === viewDate.format('MM') ? '' : 'none';
                            
                            return (
                                <div key={`${week}_${i}`} className={`day-cell ${isSelected} ${isToday} ${isNone}`}>
                                <div
                                    className="date-box"
                                    onClick={() => {
                                    setSelectDate(current);
                                    }}
                                >
                                    {current.format('D')}
                                </div>
                                </div>
                            );
                            })}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
    );
}
