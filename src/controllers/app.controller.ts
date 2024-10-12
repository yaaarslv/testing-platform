import { Controller, Get, NotFoundException, Param, Redirect, Res, UseFilters } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {
    constructor() {
    }

    @Get()
    @Redirect("active_tests", 302)
    root() {
    }

    @Get(":pageName")
    async dynamicPage(@Param("pageName") pageName: string, @Res() res: Response) {
        res.render(pageName);
    }
}
