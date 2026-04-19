import { AddendaService } from './addenda.service';
import { CreateAddendumDto } from './dto/create-addendum.dto';
export declare class AddendaController {
    private readonly addendaService;
    constructor(addendaService: AddendaService);
    create(dto: CreateAddendumDto, req: any): Promise<import("./entities/addendum.entity").Addendum>;
    findAllBySession(sessionId: string, req: any): Promise<import("./entities/addendum.entity").Addendum[]>;
    findOne(id: string, req: any): Promise<import("./entities/addendum.entity").Addendum>;
}
