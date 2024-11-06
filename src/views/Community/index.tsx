import { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';
import { useLocation, useNavigate } from 'react-router';
import { Board } from 'src/types';
import { ACCESS_TOKEN, BOARD_DETAIL_ABSOLUTE_PATH, POST_ABSOLUTE_PATH } from 'src/constant';
import { useCookies } from 'react-cookie';
import { getBoardListRequest } from 'src/apis';
import { GetBoardListResponseDto } from 'src/apis/dto/response/board';
import { ResponseDto } from 'src/apis/dto/response';

interface TableRowProps {
    board: Board;
    getBoardList: () => void;
}

function TableRow({ board, getBoardList }: TableRowProps) {

    const navigator = useNavigate();

    // event handler: 상세 보기 버튼 클릭 이벤트 처리 함수 //
    const onDetailButtonClickHandler = () => {
        navigator(BOARD_DETAIL_ABSOLUTE_PATH(board.boardNumber));
    }

    return (
        <div className='content' onClick={onDetailButtonClickHandler}>
            <div className='number'>{board.boardNumber}</div>
            <div className='title'>{board.boardTitle}</div>
            <div className='author'>{board.nickname}</div>
            <div className='date'>{board.boardUploadDate}</div>
            <div className='views'>{board.boardViewCount}</div>
        </div>
    )
}

// component: 카테고리 네비게이션
function CategoryNavigation() {

    const { pathname } = useLocation();

    

    const navigator = useNavigate();

    const onItemClickHandler = (path: string) => {
        navigator(path);
    };

    return (
        <div className='categories'>
            <div className={`category-navigation-item`}>
                <div className='category-item-text'>식단</div>
            </div>
            <div className={`category-navigation-item`}>
                <div className='category-item-text'>홈 트레이닝</div>
            </div>
            <div className={`category-navigation-item`}>
                <div className='category-item-text'>운동기구</div>
            </div>
            <div className={`category-navigation-item`}>
                <div className='category-item-text'>헬스장</div>
            </div>
        </div>
    )

};

// component: 인기태그 네비게이션
function PopularTagNavigation1() {

    const { pathname } = useLocation();

    

    const navigator = useNavigate();

    const onItemClickHandler = (path: string) => {
        navigator(path);
    };

    return (
        <div className='popularTags'>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#운동일지</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#영양식단</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#상체</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#어꺠</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#하체</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#등</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#허리</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#가슴</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#체중감량</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#보충제</div>
            </div>
        </div>
    )

};

// component: 인기태그 네비게이션
function PopularTagNavigation2() {

    const { pathname } = useLocation();



    const navigator = useNavigate();

    const onItemClickHandler = (path: string) => {
        navigator(path);
    };

    return (
        <div className='popularTags'>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#대회식단</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#일반식단</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#단백질</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#부상/재활</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#유산소</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#맨몸운동</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#전신운동</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#다이어트 식단</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#영양제</div>
            </div>
            <div className={`popularTag-navigation-item`}>
                <div className='item-text'>#바디프로필</div>
            </div>
        </div>
    )

};

// component: 커뮤니티 화면 컴포넌트 //
export default function Community() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 검색어 상태 //
    const [searchWord, setSearchWord] = useState<string>('');

    // state: 원본 리스트 상태 //
    const [originalList, setOriginalList] = useState<Board[]>([]);

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: board list 불러오기 함수 //
    const getBoardList = () => {
        const accessToken = cookies[ACCESS_TOKEN];
        if (!accessToken) return;
        getBoardListRequest(accessToken).then(getBoardListResponse);
    };

    // function: get board list response 처리 함수 //
    const getBoardListResponse = (responseBody: GetBoardListResponseDto | ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다' :
            responseBody.code === 'AF' ? '잘못된 접근입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        const { boards } = responseBody as GetBoardListResponseDto;
        setTotalList(boards);
        setOriginalList(boards);
    };

    // event handler: 검색어 변경 이벤트 처리 함수 //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchWord(value);
    };

    // event handler: 검색 버튼 클릭 이벤트 처리 함수 //
    const onSearchButtonClickHandler = () => {
        const searchedBoardList = originalList.filter(board => board.nickname.includes(searchWord));
        setTotalList(searchedBoardList);
        initViewList(searchedBoardList);
    }

    // state: 페이징 관련 상태 
    const {
        currentPage, totalPage, totalCount, viewList,
        setTotalList, initViewList, ...paginationProps
    } = usePagination<Board>();

    // event handler: 글쓰기 버튼 클릭 이벤트 처리 함수
    const onPostButtonClickHandler = () => {
        navigator(POST_ABSOLUTE_PATH);
    };

    // effect: 컴포넌트 로드시 고객 리스트 불러오기 함수 //
    useEffect(getBoardList, []);

    // render: 커뮤니티 화면 컴포넌트 렌더링 //
    return (
        <div id='cm-wrapper'>
            <div className='top'>
                <div className="categoryHead">
            <label className='category'>카테고리</label>
            <div className='category-search'>
                <CategoryNavigation />
                <div id="search">
                    <input type="text" placeholder="검색어 입력" onChange={onSearchWordChangeHandler}/>
                    <button className='searchButton'>
                    
                    </button>
                </div>
            </div>
            <div className='mid'>
                <label className="popularTag">인기태그</label>
                <div className="popularTags1">
                    <PopularTagNavigation1 />
                </div>
                <div className="popularTagsNavigation">
                    <PopularTagNavigation2 />
                </div>
            </div>
            <div className='main'>
                <div className="board-table">
                    <div className='tablehead'>
                        <div className='number'>번호</div>
                        <div className='title'>제목</div>
                        <div className='author'>작성자</div>
                        <div className='date'>날짜</div>
                        <div className='views'>조회수</div>
                    </div>
                    {viewList.map((board, index) => <TableRow key={index} board={board} getBoardList={getBoardList}/>)}
                </div>
            </div>
        </div>
            </div>
            <div className='bottom'>
                <Pagination currentPage={currentPage} {...paginationProps} />
                <button className="post-on" onClick={onPostButtonClickHandler}>글쓰기</button>
            </div>
        </div>
    );
}
