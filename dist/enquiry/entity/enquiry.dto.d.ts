export declare class EnquiryDTO {
    id: number;
    name: string;
    mobile: string;
    message: string;
    lookingFor: string[];
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
}
export declare class DeleteEnquiryDTO {
    ids?: number[];
}
