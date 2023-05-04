import { Response } from "express";
import { Send } from "express-serve-static-core";
import { IUserEntity } from "../../../domain/entities/User.entity";

export interface GetUsersResponse extends Response {
    json: Send<
        { ok: boolean; count_pages: number; count_items: number; data: Array<IUserEntity> } | { ok: boolean; message: string },
        this
    >;
}