import ResponseDto from "../response.dto";

// interface: get customer response body dto //
export default interface GetCustomerMyPageResponseDto extends ResponseDto {
    userId: string;
    name: string;
    nickname: string;
    profileImage: string;
    personalGoals: string;
    height: string;
    weight: string;
    deadlift: string;
    benchPress: string;
    squat: string;
    skeletalMuscleMass: string;
    bodyFatMass: string;
}
