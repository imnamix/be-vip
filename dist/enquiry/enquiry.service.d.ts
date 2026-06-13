import { EN_Enquiry } from "./entity/enquiry.entity";
import { Repository } from "typeorm";
import { EnquiryDTO } from "./entity/enquiry.dto";
import { EmailService } from "../EmailService/mailService";
export declare class EnquiryService {
    private readonly enquiryRepo;
    private readonly emailService;
    constructor(enquiryRepo: Repository<EN_Enquiry>, emailService: EmailService);
    createEnquiry(payload: EnquiryDTO): Promise<any>;
    getAllEnquiry(pagination: {
        page: number;
        limit: number;
        search: string;
    }): Promise<any>;
    deleteEnquiry(id: number[]): Promise<any>;
}
