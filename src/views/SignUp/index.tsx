import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import InputBox from 'src/components/InputBox'
import { ResponseDto } from 'src/apis/dto/response';
import { IdCheckRequestDto, SignUpRequestDto, TelAuthCheckRequestDto, TelAuthRequestDto } from 'src/apis/dto/request/auth';
import { fileUploadRequest, idCheckRequest, nicknameCheckRequest, signUpRequest, telAuthCheckRequest, telAuthRequest } from 'src/apis';
import NicknameCheckRequestDto from 'src/apis/dto/request/auth/nickname-check.request.dto';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MAIN_ABSOLUTE_PATH, MAIN_PATH } from 'src/constant';

interface SignUpFirstProps {
    onNext: () => void;
    name: string;
    setName: (name: string) => void;
    id: string;
    setId: (id: string) => void;
    nickname: string;
    setNickname: (nickname: string) => void;
    password: string;
    setPassword: (password: string) => void;
    passwordCheck: string;
    setPasswordCheck: (passwordCheck: string) => void;
    telNumber: string;
    setTelNumber: (telNumber: string) => void;
    authNumber: string;
    setAuthNumber: (authNumber: string) => void;
}

// component: 회원가입 화면1 컴포넌트 //
function SignUpFirst({ 
    onNext, 
    name, setName, 
    id, setId, 
    nickname, setNickname, 
    password, setPassword, 
    passwordCheck, setPasswordCheck, 
    telNumber, setTelNumber, 
    authNumber, setAuthNumber 
    }: SignUpFirstProps) {

    // state: 사용자 입력 메시지 상태 //
    const [idMessage, setIdMessage] = useState<string>('');
    const [nicknameMessage, setNicknameMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

    // state: 사용자 정보 메시지 에러 상태 //
    const [idMessageError, setIdMessageError] = useState<boolean>(false);
    const [nicknameMessageError, setNicknameMessageError] = useState<boolean>(false);
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);

    // state: 입력값 검증 상태 //
    const [isCheckedId, setCheckedId] = useState<boolean>(false);
    const [isCheckedNickname, setCheckedNickname] = useState<boolean>(false);
    const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
    const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
    const [isSend, setSend] = useState<boolean>(false);
    const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

    // variable: 다음페이지 이동 가능 여부 //
    const isComplete = name && id && isCheckedId && nickname && isCheckedNickname && password && passwordCheck && isMatchedPassword && isCheckedPassword
    && telNumber && isSend && authNumber && isCheckedAuthNumber;

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: 아이디 중복 확인 Response 처리 함수 //
    const idCheckResponse = (responseBody: ResponseDto | null) => {

        const message = 
            !responseBody ? '서버에 문제가 있습니다' : 
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다' : 
            responseBody.code === 'DI' ? '이미 사용중인 아이디 입니다' : 
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' : 
            responseBody.code === 'SU' ? '사용 가능한 아이디 입니다' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setIdMessage(message);
        setIdMessageError(!isSuccessed);
        setCheckedId(isSuccessed);

    }

    // function: 닉네임 중복 확인 Response 처리 함수 //
    const nicknameCheckResponse = (responseBody: ResponseDto | null) => {

        const message = 
            !responseBody ? '서버에 문제가 있습니다' : 
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다' : 
            responseBody.code === 'DN' ? '이미 사용중인 닉네임 입니다' : 
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' : 
            responseBody.code === 'SU' ? '사용 가능한 닉네임 입니다' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setNicknameMessage(message);
        setNicknameMessageError(!isSuccessed);
        setCheckedNickname(isSuccessed);

    }

    // function: 전화번호 인증 Response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {

        const message = 
            !responseBody ? '서버에 문제가 있습니다' : 
            responseBody.code === 'VF' ? '숫자 11자 입력해주세요' : 
            responseBody.code === 'DT' ? '중복된 전화번호 입니다' : 
            responseBody.code === 'MSF' ? '인증번호 전송에 실패하였습니다' : 
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' : 
            responseBody.code === 'SU' ? '인증번호가 전송되었습니다': '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setTelNumberMessage(message);
        setTelNumberMessageError(!isSuccessed);
        setSend(isSuccessed);

    }

    // function: 전화번호 인증 확인 Response 처리 함수 //
    const telAuthCheckResponse = (responseBody: ResponseDto | null) => {

        const message = 
            !responseBody ? '서버에 문제가 있습니다' : 
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다' : 
            responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다' : 
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' : 
            responseBody.code === 'SU' ? '인증번호가 확인되었습니다': '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setAuthNumberMessage(message);
        setAuthNumberMessageError(!isSuccessed);
        setCheckedAuthNumber(isSuccessed);

    }

    // event handler: 이름 변경 이벤트 처리 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    // event handler: 아이디 변경 이벤트 처리 //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
        setCheckedId(false);
        setIdMessage('');

        const pattern = /^[a-zA-Z0-9]*$/;
        if (!pattern.test(value) && value.length > 0) {
            setIdMessage('영어와 숫자만 사용 가능한 아이디입니다.');
            setIdMessageError(true);
            return;
        }

    };

    // event handler: 닉네임 변경 이벤트 처리 //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNickname(value);
        setCheckedNickname(false);
        setNicknameMessage('');
    };

    // event handler: 비밀번호 변경 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
        const isMatched = pattern.test(value);

        const message = (isMatched || !value) ? '' : '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요';
        setPasswordMessage(message);
        setPasswordMessageError(!isMatched);
        setMatchedPassword(isMatched);
    };

    // event handler: 비밀번호 확인 변경 이벤트 처리 //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPasswordCheck(value);
    };

    // event handler: 전화번호 변경 이벤트 처리 //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
    
        const isValidTelNumber = (value: string): boolean => {
            const pattern = /^[0-9]*$/;
            return (pattern.test(value) || value === '') && value.length <= 11;
        };

        if (isValidTelNumber(value)) {
            setTelNumber(value);
            setTelNumberMessage('');
            return;
        }
    };

    // event handler: 인증번호 변경 이벤트 처리 //
    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        const isValidAuthNumber = (value: string): boolean => {
            const pattern = /^[0-9]*$/;
            return (pattern.test(value) || value === '') && value.length <= 4;
        };

        if (isValidAuthNumber(value)) {
            setAuthNumber(value);
            setAuthNumberMessage('');
            return;
        }
        setCheckedAuthNumber(false);
        setAuthNumberMessage('');
    };

    // event handler: 아이디 중복 확인 버튼 클릭 이벤트 처리 //
    const onIdCheckClickHandler = () => {
        if (!id) return;

        const pattern = /^[a-zA-Z0-9]*$/;
        if (!pattern.test(id)) {
            setIdMessage('영어와 숫자만 사용 가능한 아이디입니다.');
            setIdMessageError(true);
            return;
        }

        const requestBody: IdCheckRequestDto = {
            userId: id
        }

        idCheckRequest(requestBody).then(idCheckResponse);

    }

    // event handler: 닉네임 중복 확인 버튼 클릭 이벤트 처리 //
    const onNicknameCheckClickHandler = () => {
        if (!nickname) return;

        const requestBody: NicknameCheckRequestDto = {
            nickname: nickname
        }

        nicknameCheckRequest(requestBody).then(nicknameCheckResponse);

    }

    // event handler: 전화번호 인증 버튼 클릭 이벤트 처리 //
    const onTelNumberSendClickHandler = () => {
        if (!telNumber) return;

        const pattern = /^[0-9]{11}$/;
        const isMatched = pattern.test(telNumber);

        if (!isMatched) {
            setTelNumberMessage('숫자 11자 입력해주세요');
            setTelNumberMessageError(true);
            return;
        }

        const requestBody: TelAuthRequestDto = { telNumber }

        telAuthRequest(requestBody).then(telAuthResponse);

        setTelNumberMessage('인증번호가 전송되었습니다');
        setSend(true);

    }

    // event handler: 인증 확인 버튼 클릭 이벤트 처리 //
    const onAuthNumberCheckClickHandler = () => {
        if (!authNumber) return;

        const requestBody: TelAuthCheckRequestDto = { telNumber, authNumber }

        telAuthCheckRequest(requestBody).then(telAuthCheckResponse);

        if (authNumber === '1234') {
            setAuthNumberMessage('인증번호가 일치합니다');
            setAuthNumberMessageError(false);
            setCheckedAuthNumber(true);
        } else {
            setAuthNumberMessage('인증번호가 일치하지않습니다');
            setAuthNumberMessageError(true);
        }

    }

    // event handler: 홈 버튼 클릭 이벤트 처리 //
    const onHomeClickHandler = () => {
        navigator(MAIN_PATH);
    };

    // effect: 비밀번호 및 비밀번호 확인 변경 시 실행할 함수 //
    useEffect(() => {
        if (!password || !passwordCheck) return;

        const isEqual = password === passwordCheck;
        const message = isEqual ? '' : '비밀번호가 일치하지 않습니다';
        setPasswordCheckMessage(message);
        setPasswordCheckMessageError(!isEqual);
        setCheckedPassword(isEqual);
    }, [password, passwordCheck]);

    // render: 회원가입 화면1 컴포넌트 렌더딩 //
    return (
        <div className='auth-box'>
            <div className="input-container">
                <InputBox label='이름' type='text' placeholder='이름을 입력해주세요' value={name} onChange={onNameChangeHandler} />
                <InputBox label='아이디' type='text' placeholder='아이디를 입력해주세요' value={id} messageError={idMessageError} message={idMessage} buttonName='중복 확인' onChange={onIdChangeHandler} onButtonClick={onIdCheckClickHandler} />
                <InputBox label='닉네임' type='text' placeholder='닉네임을 입력해주세요' value={nickname} messageError={nicknameMessageError} message={nicknameMessage} buttonName='중복 확인' onChange={onNicknameChangeHandler} onButtonClick={onNicknameCheckClickHandler} />
                <InputBox label='비밀번호' type='password' placeholder='비밀번호를 입력해주세요' value={password} messageError={passwordMessageError} message={passwordMessage} onChange={onPasswordChangeHandler} />
                <InputBox label='비밀번호 확인' type='password' placeholder='비밀번호를 다시 입력해주세요' value={passwordCheck} messageError={passwordCheckMessageError} message={passwordCheckMessage} onChange={onPasswordCheckChangeHandler} />
                <InputBox label='전화번호' type='text' placeholder='전화번호를 입력해주세요' value={telNumber} messageError={telNumberMessageError} message={telNumberMessage} buttonName='전화번호 인증' onChange={onTelNumberChangeHandler} onButtonClick={onTelNumberSendClickHandler} />
                <InputBox label='인증번호' type='text' placeholder='인증번호를 입력해주세요' value={authNumber} messageError={authNumberMessageError} message={authNumberMessage} buttonName='인증 확인' onChange={onAuthNumberChangeHandler} onButtonClick={onAuthNumberCheckClickHandler} />
            </div>
            <div className='button-box'>
                <div className='main-home-button' onClick={onHomeClickHandler}>홈</div>
                <div className={`next-button ${!isComplete ? 'disabled' : ''}`} 
                    onClick={() => {
                        if (isComplete) {
                            onNext();
                        }
                    }}
                >다음페이지
                </div>
            </div>
        </div>
    );
}

interface SignUpSecondProps {
    profileImageFile: File | null;
    setProfileImageFile: (file: File | null) => void;
    height: string;
    setHeight: (height: string) => void;
    weight: string;
    setWeight: (weight: string) => void;
    skeletalMuscleMass: string;
    setSkeletalMuscleMass: (skeletalMuscleMass: string) => void;
    bodyFatMass: string;
    setBodyFatMass: (bodyFatMass: string) => void;
    deadlift: string;
    setDeadlift: (deadlift: string) => void;
    benchPress: string;
    setBenchPress: (benchPress: string) => void;
    squat: string;
    setSquat: (squat: string) => void;
    personalGoals: string;
    setPersonalGoals: (personalGoals: string) => void;
}

// variable: 기본 프로필 이미지 URL //
const defaultProfileImageUrl = 'https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png';

function SignUpSecond({
    profileImageFile, setProfileImageFile,
    height, setHeight,
    weight, setWeight,
    skeletalMuscleMass, setSkeletalMuscleMass,
    bodyFatMass, setBodyFatMass,
    deadlift, setDeadlift,
    benchPress, setBenchPress,
    squat, setSquat, 
    personalGoals, setPersonalGoals
    }: SignUpSecondProps) {

    // state: 이미지 입력 참조 //
    const imageInputRef = useRef<HTMLInputElement|null>(null);

    // state: 프로필 미리보기 URL 상태 //
    const [previewUrl, setPreviewUrl] = useState<string>(defaultProfileImageUrl);

    // state: 사용자 입력 메시지 상태 //
    const [heightMessage, setHeightMessage] = useState<string>('키를 입력해주세요');
    const [weightMessage, setWeightMessage] = useState<string>('몸무게를 입력해주세요');

    // state: 사용자 정보 메시지 에러 상태 //
    const [heightMessageError, setHeightMessageError] = useState<boolean>(true);
    const [weightMessageError, setWeightMessageError] = useState<boolean>(true);

    // event handler: 프로필 이미지 클릭 이벤트 처리 //
    const onProfileImageClickHandler = () => {
        const { current } = imageInputRef;
        if (!current) return;
        current.click();
    }

    // event handler: 이미지 변경 이벤트 처리 //
    const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files || !files.length) return;

        const file = files[0];
        setProfileImageFile(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setPreviewUrl(fileReader.result as string);
        }
    }

    // event handler: 키 변경 이벤트 처리 //
    const onHeightChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const pattern = /^\d*\.?\d*$/;
        const isMatched = pattern.test(value);

        if (isMatched) {
            setHeight(value);
        }

        const message = (!value || !isMatched) ? '키를 입력해주세요' : '';
        setHeightMessage(message);
    };

    // event handler: 몸무게 변경 이벤트 처리 //
    const onWeightChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const pattern = /^\d*\.?\d*$/;
        const isMatched = pattern.test(value);

        if (isMatched) {
            setWeight(value);
        }

        const message = (!value || !isMatched) ? '몸무게를 입력해주세요' : '';
        setWeightMessage(message);
    };

    // event handler: 골격근량 변경 이벤트 처리 //
    const onSkeletalMuscleMassChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const pattern = /^\d*\.?\d*$/;

        if (pattern.test(value)) {
            setSkeletalMuscleMass(value);
        }
    };

    // event handler: 체지방량 변경 이벤트 처리 //
    const onBodyFatMassChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const pattern = /^\d*\.?\d*$/;

        if (pattern.test(value)) {
            setBodyFatMass(value);
        }
    };

    // event handler: 데드리프트 변경 이벤트 처리 //
    const onDeadliftChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const pattern = /^\d*\.?\d*$/;

        if (pattern.test(value)) {
            setDeadlift(value);
        }
    };

    // event handler: 벤치프레스 변경 이벤트 처리 //
    const onBenchPressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const pattern = /^\d*\.?\d*$/;

        if (pattern.test(value)) {
            setBenchPress(value);
        }
    };

    // event handler: 스쿼트 변경 이벤트 처리 //
    const onSquatChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const pattern = /^\d*\.?\d*$/;

        if (pattern.test(value)) {
            setSquat(value);
        }
    };

    // event handler: 개인 목표 변경 이벤트 처리 //
    const onUserGoalsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;

        if (value.length <= 50) {
            setPersonalGoals(value);
        }
    };

    // render: 회원가입 화면2 컴포넌트 렌더딩 //
    return (
        <div className='auth-box'>
            <div className='auth-second-box'>
                <div className='input-left'>
                    <div className='profile-box'>
                        <div className='profile-tile'>프로필 이미지</div>
                        <div className='profile-image' style={{ backgroundImage: `url(${previewUrl})` }} onClick={onProfileImageClickHandler}>
                            <input ref={imageInputRef} style={{ display: 'none' }} type='file' accept='image/*' onChange={onImageInputChangeHandler} />
                        </div>
                    </div>
                    <div className='bigthree-box'>
                        <div className='bigthree-title'>3대측정</div>
                        <div className='bigthree-unit'>(1RM)</div>
                    </div>
                    <div className='goal-title'>개인목표</div>
                </div>
                <div className="input-container">
                    <InputBox label='키(cm)' type='text' placeholder='키(cm)를 입력해주세요' value={height} messageError={heightMessageError} message={heightMessage} unit='cm' onChange={onHeightChangeHandler} />
                    <InputBox label='몸무게(kg)' type='text' placeholder='몸무게(kg)을 입력해주세요' value={weight} messageError={weightMessageError} message={weightMessage} unit='kg' onChange={onWeightChangeHandler} />
                    <InputBox label='골격근량(kg)' type='text' placeholder='골격근량(kg)을 입력해주세요' value={skeletalMuscleMass} unit='kg' onChange={onSkeletalMuscleMassChangeHandler} />
                    <InputBox label='체지방량(kg)' type='text' placeholder='체지방량(kg)을 입력해주세요' value={bodyFatMass} unit='kg' onChange={onBodyFatMassChangeHandler} />
                    <InputBox label='벤치프레스(kg)' type='text' placeholder='중량을(kg)을 입력해주세요' value={benchPress} unit='kg' onChange={onBenchPressChangeHandler} />
                    <InputBox label='데드리프트(kg)' type='text' placeholder='중량을(kg)을 입력해주세요' value={deadlift} unit='kg' onChange={onDeadliftChangeHandler} />
                    <InputBox label='스쿼트(kg)' type='text' placeholder='중량을(kg)을 입력해주세요' value={squat} unit='kg' onChange={onSquatChangeHandler} />
                    <textarea className='user-goal' value={personalGoals} placeholder='개인 목표를 입력해 주세요' onChange={onUserGoalsChangeHandler} />
                </div>
            </div>
        </div>
    );
}

// component: 회원가입 컴포넌트 //
export default function SignUp() {

    // state: 페이지 전환 상태 //
    const [signUpPage, setSignUpPage] = useState(true);

    // state: Query Parameter 상태 //
    const [queryParam] = useSearchParams();
    const snsId = queryParam.get('snsId');
    const joinPath = queryParam.get('joinPath');

    // state: 사용자 입력 정보 상태 //
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');
    const [authNumber, setAuthNumber] = useState<string>('');
    const [profileImageFile, setProfileImageFile] = useState<File|null>(null);
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [skeletalMuscleMass, setSkeletalMuscleMass] = useState<string>('');
    const [bodyFatMass, setBodyFatMass] = useState<string>('');
    const [deadlift, setDeadlift] = useState<string>('');
    const [benchPress, setBenchPress] = useState<string>('');
    const [squat, setSquat] = useState<string>('');
    const [personalGoals, setPersonalGoals] = useState<string>('');

    // variable: SNS 회원가입 여부 //
    const isSnsSignUp = snsId !== null && joinPath !== null;

    // variable: 회원가입 가능 여부 //
    const isComplete = name && id && nickname && password && passwordCheck && telNumber && authNumber &&
        height && weight;

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: 회원가입 Response 처리 함수 //
    const signUpResponse = (responseBody: ResponseDto | null) => {

        const message = 
            !responseBody ? '서버에 문제가 있습니다' : 
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다' : 
            responseBody.code === 'DI' ? '중복된 아이디 입니다' : 
            responseBody.code === 'DN' ? '중복된 닉네임 입니다' : 
            responseBody.code === 'DT' ? '중복된 전화번호 입니다' : 
            responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다' : 
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

    }

    // event handler: 회원가입 페이지 전환 핸들러 //
    const onSignUpPageChangeHandler = () => {
        setSignUpPage(prev => !prev);
    };

    // event handler: 회원가입 버튼 클릭 이벤트 처리 //
    const onSignUpButtonHandler = async () => {
        if (!isComplete) return;
    
        let url: string | null = null;
        if (profileImageFile) {
            const formData = new FormData();
            formData.append('file', profileImageFile);
            url = await fileUploadRequest(formData);
        }
        url = url ? url : defaultProfileImageUrl;
    
        const signUpRequestBody: SignUpRequestDto = {
            name,
            userId: id,
            nickname,
            password,
            telNumber,
            authNumber,
            joinPath: joinPath || 'home',
            snsId,
            profileImage: url,
            personalGoals,
            height,
            weight,
            bodyFatMass,
            skeletalMuscleMass,
            deadlift,
            benchPress,
            squat,
        };

        signUpRequest(signUpRequestBody).then(signUpResponse)

        navigator(MAIN_ABSOLUTE_PATH);
    };

    // render: 회원가입 컴포넌트 렌더딩 //
    return (
        <div id='su-wrapper'>
            <div id='su-main'>
                <div className='sign-up-contain'>
                    <div className='sign-up-title'>회원가입</div>

                    {signUpPage ? 
                        (
                        <SignUpFirst 
                            onNext={onSignUpPageChangeHandler} 
                            name={name} setName={setName} 
                            id={id} setId={setId} 
                            nickname={nickname} setNickname={setNickname}
                            password={password} setPassword={setPassword}
                            passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck}
                            telNumber={telNumber} setTelNumber={setTelNumber}
                            authNumber={authNumber} setAuthNumber={setAuthNumber}
                        />) : 
                        (<div className='sign-up-second'>
                            <SignUpSecond
                                profileImageFile={profileImageFile} setProfileImageFile={setProfileImageFile} 
                                height={height} setHeight={setHeight} 
                                weight={weight} setWeight={setWeight} 
                                skeletalMuscleMass={skeletalMuscleMass} setSkeletalMuscleMass={setSkeletalMuscleMass} 
                                bodyFatMass={bodyFatMass} setBodyFatMass={setBodyFatMass} 
                                deadlift={deadlift} setDeadlift={setDeadlift} 
                                benchPress={benchPress} setBenchPress={setBenchPress} 
                                squat={squat} setSquat={setSquat} 
                                personalGoals={personalGoals} setPersonalGoals={setPersonalGoals}
                            />
                            <div className='button-box'>
                                <div className='previous-button' onClick={onSignUpPageChangeHandler}>이전 페이지</div>
                                <div className={`signup-button ${!isComplete ? 'disabled' : ''}`} 
                                    onClick={onSignUpButtonHandler}
                                >회원가입
                                </div>
                            </div>
                        </div>)
                    }

                </div>
            </div>
        </div>
    );
}
