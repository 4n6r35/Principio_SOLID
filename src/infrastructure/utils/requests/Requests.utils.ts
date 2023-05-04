import { Request } from "express";

export interface GetUsersRequest extends Request {
    query: {
        page: string;
        size: string;
    }
}