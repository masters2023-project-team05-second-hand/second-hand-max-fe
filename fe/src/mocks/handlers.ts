import { API_PATH } from "api/constants";
import { Member, Tokens, UserAddressInfo } from "api/type";
import { rest } from "msw";
import { categories } from "./data/categories";

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
      ctx.json<{ tokens: Tokens }>({
        tokens: {
          accessToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNjkxOTIyNjAzfQ.vCxUGMiv9bnb4JQGwk6NVx6kHi5hG80tDxafIvrfKbA",
          refreshToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTcxMDMwMDN9.FgoFySrenum985OrDzwwtaEhu1Iz7IVJtz5M6H8lzX8",
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
      ctx.json<{ tokens: Tokens }>({
        tokens: {
          accessToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwiZXhwIjoxNjkxOTIyNjAzfQ.vCxUGMiv9bnb4JQGwk6NVx6kHi5hG80tDxafIvrfKbA",
          refreshToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTcxMDMwMDN9.FgoFySrenum985OrDzwwtaEhu1Iz7IVJtz5M6H8lzX8",
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

  rest.get(API_PATH.member, async (req, res, ctx) => {
    const Authorization = req.headers.get("Authorization");

    if (!Authorization) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "잘못된 요청입니다.",
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json<{ member: Member }>({
        member: {
          nickname: "jjinbbang",
          profileImgUrl:
            "https://github.com/masters2023-project-team05-second-hand/second-hand-max-fe/assets/111998760/4ce425f1-d40b-421f-a24f-3c5b73737120",
        },
      })
    );
  }),

  rest.get(API_PATH.memberAddress, async (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<{ addresses: UserAddressInfo[] }>({
        addresses: [
          {
            id: 1,
            name: "역삼1동",
            isLastVisited: true,
          },
          {
            id: 2,
            name: "역삼2동",
            isLastVisited: false,
          },
        ],
      })
    );
  }),
];
