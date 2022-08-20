import { Controller, Get, Req } from "@nestjs/common"
import { Request } from "express"

@Controller("cards")
export class CardsController {
    @Get()
    findAll(@Req() req: Request): string {
        return "This action returns all cards"
    }
}
