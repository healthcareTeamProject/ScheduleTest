import ResponseDto from "../response.dto";

// interface: get customer response body dto //
export default interface GetCustomerResponseDto extends ResponseDto {
    userId: string;
    name: string;
    nickname: string;
    profileImage: string;
    personalGoals: string;
    height: string;
}
