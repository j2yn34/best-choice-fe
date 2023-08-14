import { rest } from "msw";
import { postListData, PostListData } from "./mockDatas/postListData";
import { commentListData, CommentListData } from "./mockDatas/commentListData";
import {
  activeChatListData,
  ActiveChatListData,
} from "./mockDatas/activeChatListData";

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

  // postListData 조회
  rest.get("/activeChatListData", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(activeChatListData));
  }),

  // postListData 추가
  rest.post("/activeChatListData", (req, res, ctx) => {
    const newData = req.body as ActiveChatListData["content"][0];
    activeChatListData.content.push(newData);
    return res(ctx.status(201));
  }),
];
