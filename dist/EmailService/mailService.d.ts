export declare class EmailService {
    private transporter;
    constructor();
    sendEnquiryEmail(to: string, enquiry: any): Promise<boolean>;
    sendOtpEmail(to: string, otp: number): Promise<boolean>;
}
