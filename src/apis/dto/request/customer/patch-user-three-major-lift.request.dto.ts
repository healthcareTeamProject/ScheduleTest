// interface: 운동 정보 Request Body Dto //
export default interface PatchUserThreeMajorLiftRequestDto {
    userId: string;
    benchPress: string;
    deadlift: string;
    squat: string;
}