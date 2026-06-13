import { EnquiryService } from "./enquiry.service";
import { DeleteEnquiryDTO, EnquiryDTO } from "./entity/enquiry.dto";
export declare class EnquiryController {
    enquiryService: EnquiryService;
    constructor(enquiryService: EnquiryService);
    create(payload: EnquiryDTO): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getAllEnquiry(page: number, limit: number, search: string): Promise<{
        success: any;
        message: any;
        data: any;
        count: any;
    }>;
    deleteEnquiry(id: DeleteEnquiryDTO): Promise<{
        success: any;
        message: any;
        data: any;
    }>;
}
