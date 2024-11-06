import { Board } from "src/types";
import ResponseDto from "../response.dto";

// interface: get board list response body dto //
export default interface GetBoardListResponseDto extends ResponseDto {
  boards: Board[];
}
