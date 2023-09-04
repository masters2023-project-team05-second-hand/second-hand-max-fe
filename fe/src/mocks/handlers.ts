import { API_PATH } from "api/constants";
import { AuthInfo } from "api/type";
import { categories } from "./data/categories";
import { rest } from "msw";

export const handlers = [
  rest.post(API_PATH.login("kakao"), async (req, res, ctx) => {
    const { accessCode } = await req.json<{ accessCode: string }>();

    if (!accessCode) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "잘못된 요청입니다.",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json<AuthInfo>({
        tokens: {
          accessToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNjkxOTIyNjAzfQ.vCxUGMiv9bnb4JQGwk6NVx6kHi5hG80tDxafIvrfKbA",
          refreshToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTcxMDMwMDN9.FgoFySrenum985OrDzwwtaEhu1Iz7IVJtz5M6H8lzX8",
        },
        addresses: [],
        member: {
          nickname: "jjinbbang",
          profileImgUrl:
            "https://github.com/masters2023-project-team05-second-hand/second-hand-max-fe/assets/111998760/4ce425f1-d40b-421f-a24f-3c5b73737120",
        },
      })
    );
  }),

  rest.post(API_PATH.login("github"), async (req, res, ctx) => {
    const { accessCode } = await req.json<{ accessCode: string }>();

    if (!accessCode) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "잘못된 요청입니다.",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json<AuthInfo>({
        tokens: {
          accessToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNjkxOTIyNjAzfQ.vCxUGMiv9bnb4JQGwk6NVx6kHi5hG80tDxafIvrfKbA",
          refreshToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTcxMDMwMDN9.FgoFySrenum985OrDzwwtaEhu1Iz7IVJtz5M6H8lzX8",
        },
        addresses: [],
        member: {
          nickname: "jjinbbang",
          profileImgUrl:
            "https://github.com/masters2023-project-team05-second-hand/second-hand-max-fe/assets/111998760/4ce425f1-d40b-421f-a24f-3c5b73737120",
        },
      })
    );
  }),

  rest.post(API_PATH.logout, async (req, res, ctx) => {
    const { refreshToken } = await req.json<{ refreshToken: string | null }>();

    if (!refreshToken) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "잘못된 요청입니다.",
        })
      );
    }

    return res(ctx.status(200));
  }),

  rest.get(API_PATH.categories, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categories));
  }),

  rest.post(API_PATH.userAddress, async (req, res, ctx) => {
    const { addressIds } = await req.json<{ addressIds: number[] }>();

    if (!addressIds) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "잘못된 요청입니다.",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          address: "역삼1동",
        },
        {
          id: 5,
          address: "역삼5동",
        },
      ])
    );
  }),

  rest.post(API_PATH.userProfile, async (req, res, ctx) => {
    const { image } = (await req.body) as { image: File };

    if (!image) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "잘못된 요청입니다.",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json<{ profileImgUrl: string }>({
        profileImgUrl: "https://avatars.githubusercontent.com/u/111998760?v=4",
      })
    );
  }),
];
