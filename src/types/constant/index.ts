// variable: 상대 경로 상수 //
export const ROOT_PATH = '/';

export const MAIN_PATH = '/main';

export const USER_MYPAGE_DETAIL_PATH = (userId: string) => `/user/${userId}`;

export const AUTH_PATH = '/auth';

export const SIGN_UP_PATH = '/sign-up';

export const MY_PAGE_PATH = '/my-page';

export const BOARD_LIST_PATH = '/board';
export const BOARD_DETAIL_PATH = (boardNumber: number | string) => `/board/detail/${boardNumber}`;
export const BOARD_UPDATE_PATH =  (boardNumber: number | string) => `/board/detail/${boardNumber}/update`;
export const BOARD_WRITE_PATH = '/board/write';

export const SCHEDUL_DATH = '/schedul';

export const SNS_SUCCESS_PATH = '/sns-success';
export const OTHERS_PATH = '*';


// variable: 절대 경로 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;

export const MAIN_ABSOLUTE_PATH = MAIN_PATH;
export const MAIN_MYPAGE_DETAIL_ABSOLUTE_PATH = (userId: string) => `${MAIN_PATH}/${USER_MYPAGE_DETAIL_PATH(userId)}`;

export const AUTH_ABSOLUTE_PATH = AUTH_PATH;

export const SIGN_UP_ABSOLUTE_PATH = SIGN_UP_PATH;

export const MY_PAGE_ABSOLUTE_PATH = MY_PAGE_PATH;

export const BOARD_LIST_ABSOLUTE_PATH = BOARD_LIST_PATH;
export const BOARD_DETAIL_ABSOLUTE_PATH = (boardNumber: number | string) => `${BOARD_LIST_PATH}/${BOARD_DETAIL_PATH(boardNumber)}`;
export const BOARD_UPDATE_ABSOLUTE_PATH =  (boardNumber: number | string) => `${BOARD_LIST_PATH}/${BOARD_UPDATE_PATH(boardNumber)}`;
export const BOARD_WRITE_ABSOLUTE_PATH = '/board/write';

export const SCHEDUL_ABSOLUTE_DATH = SCHEDUL_DATH;

// variable: HTTP BEARER TOKEN COOKIE NAME //
export const ACCESS_TOKEN = 'accessToken';