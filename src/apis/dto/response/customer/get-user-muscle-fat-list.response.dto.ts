
import { UserMuscleFat } from "src/types";
import ResponseDto from "../response.dto";

// interface: get user muscle fat list response body dto //
export default interface GetUserMuscleFatListResponseDto extends ResponseDto {
    userMuscleFatLists: UserMuscleFat[];
}