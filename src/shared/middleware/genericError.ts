import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const genericError = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
  
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
}

export default genericError;