import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { DomainError } from "../domains/errors/Errors";
import { ResponseStatus } from "../domains/errors/ErrorTypes";

// export function errorHandlerWrapper(
//   handler: (
//     error: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void
// ) {
//   return (error: Error, req: Request, res: Response, next: NextFunction) => {
//     try {
//       handler(error, req, res, next);
//     } catch (err) {
//       next(err); // Forward error to the default Express error handler
//     }
//   };
// }

// const asyncHandler = fn => (req, res, next) => {
//   return Promise
//       .resolve(fn(req, res, next))
//       .catch(next);
// };
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(ResponseStatus.BAD_REQUEST).json({
      status: ResponseStatus.BAD_REQUEST,
      message: error.message,
      error: error,
      type: "ZodError",
    });
    return;
  }
  if (error instanceof AxiosError) {
    res.status(ResponseStatus.BAD_REQUEST).json({
      status: ResponseStatus.BAD_REQUEST,
      message: error.message,
      error: error,
      type: "AxiosError",
    });
    return;
  }
  if (error instanceof DomainError) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error,
      type: "DomainError",
    });
    return;
  }

  res.status(ResponseStatus.INTERNAL_ERROR).json({
    status: ResponseStatus.INTERNAL_ERROR,
    message: "Something went wrong!",
    error: error,
  });
};
