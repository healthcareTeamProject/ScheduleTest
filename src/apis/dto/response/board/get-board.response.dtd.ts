import ResponseDto from "../response.dto";

// interface: get board response body dto //
export default interface GetBoardResponseDto extends ResponseDto {
  boardNumber: Number;
  boardTitle: String;
  nickname: String;
  boardUploadDate: String;
  boardContents: String;
  youtubeVideoLink: String | null;
  boardFileContents: String[] | null;
  boardViewCount: Number;
  boardLikeCount: Number;
  comments: Comment[];
}
