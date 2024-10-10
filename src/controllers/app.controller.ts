import { Controller, Get, Redirect, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {
    constructor() {
    }

    @Get()
    @Redirect("index", 302)
    root() {
    }

    @Get(":pageName")
    dynamicPage(@Res() res: Response) {
        const pageName = res.req.params.pageName;
        return res.render(pageName);
    }
}
