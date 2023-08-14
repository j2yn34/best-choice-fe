import { rest } from "msw";
import { postListData, PostListData } from "./mockDatas/postListData";
import { commentListData, CommentListData } from "./mockDatas/commentListData";
import { activeChatListData } from "./mockDatas/activeChatListData";

export const handlers = [
  // postListData 조회
  rest.get("/postListData", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postListData));
  }),

  // postListData 추가
  rest.post("/postListData", (req, res, ctx) => {
    const newData = req.body as PostListData["content"][0];
    postListData.content.push(newData);
    return res(ctx.status(201));
  }),

  // commentListData 조회
  rest.get("/commentListData", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentListData));
  }),

  // commentListData 추가
  rest.post("/commentListData", (req, res, ctx) => {
    const newData = req.body as CommentListData["content"][0];
    commentListData.content.push(newData);
    return res(ctx.status(201));
  }),

  // activeChatListData 조회
  rest.get("/activeChatListData", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(activeChatListData));
  }),
];
