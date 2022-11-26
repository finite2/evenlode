import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Role } from "@prisma/client";
import { ZodError } from "zod";

export interface ApiError {
  status: number;
  type?: string;
  message: string;
  details?: any;
}

export class ApiError {
  constructor(err: ApiError) {
    Object.assign(this, { ...err });
    if (!this.type) {
      this.type = this.message;
    }
  }
}

export const response = {
  json: (res: NextApiResponse, payload: any) => res.status(200).json({ data: payload }),
  ok: (res: NextApiResponse) => res.status(200).end(),
};

export const error = {
  notLoggedIn: (): never => {
    throw new ApiError({
      status: 401,
      message: `Authentication required`,
    });
  },
  notAuthorised: (): never => {
    throw new ApiError({
      status: 403,
      message: `Not authorised`,
    });
  },
  methodNotAllowed: (req: NextApiRequest): never => {
    throw new ApiError({
      status: 403,
      type: "Method Not Allowed",
      message: `Method ${req.method} not allowed`,
    });
  },
  methodNotImplemented: (): never => {
    throw new ApiError({
      status: 405,
      message: `Method not yet implemented`,
    });
  },
  objectNotFound404: (): never => {
    throw new ApiError({
      status: 404,
      message: `Page not found`,
    });
  },
};

export const auth = {
  isLoggedIn: async (req: NextApiRequest): Promise<Session> => {
    const session = await getSession({ req });

    if (!session) {
      throw error.notLoggedIn();
    }

    return session;
  },

  isAdmin: async (req: NextApiRequest): Promise<Session> => {
    const session = await getSession({ req });

    if (!session) {
      throw error.notLoggedIn();
    }

    if (session.user.role !== Role.ADMIN) {
      throw error.notAuthorised();
    }

    return session;
  },

  isAdminOrOwner: async (req: NextApiRequest, userId?: string): Promise<Session | void> => {
    const session = await getSession({ req });

    if (!session) {
      throw error.notLoggedIn();
    }

    if (!userId || (session.user.id !== userId && session.role !== Role.ADMIN)) {
      throw error.notAuthorised();
    }

    return session;
  },
};

type NextHandler = (req: NextApiRequest, res: NextApiResponse) => any;

export const catchErrorMiddleware =
  (next: NextHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await next(req, res);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: {
            status: 400,
            error: "Invalid request",
            message: "Request does not match endpoint schema",
            detail: error,
          },
        });
      } else if (error instanceof ApiError) {
        res.status(error.status).json({ error });
      } else {
        throw error;
      }
    }
  };
