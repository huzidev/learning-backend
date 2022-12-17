import express from "express";

declare global {
  namespace Express {
    interface Request {
        userInfo, token, userID: Record<string,any>
    }
  }
}