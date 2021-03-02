export interface IArticle {
  id:number;
  regDate:string;
  updateDate:string;
  boardId:number;
  memberId:number;
  title:string;
  body:string;
  extra__writer:string;
}