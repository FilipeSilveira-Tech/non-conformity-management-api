import type { Request, Response } from "express";
import type { FullUser } from "./user.types";

import { UserCreateSchema } from "./user.schema";
import UserService from "./user.service";
const dateISO = new Date().toISOString();

export const userCreate = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userValidate = await UserCreateSchema.safeParse(req.body);

  if (!userValidate.success) {
    return res.status(400).json({
      sucess: false,
      message: "Todos os parametros são necessários",
      timestamp: dateISO,
      error: userValidate.error.format(),
    });
  }

  const { response } = await UserService.createUser(userValidate.data);
  return res.status(response.statusCode).json(response);
};

export const getUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: "O parametro {username} está faltando",
      timestamp: dateISO,
    });
  }
  if (typeof req.params.username !== "string") {
    return res.status(400).json({
      success: false,
      message: "O username deve ser uma string",
      timestamp: dateISO,
    });
  }
  const { response } = await UserService.seachUser(req.params.username);

  return res.status(response.statusCode).json(response);
};
