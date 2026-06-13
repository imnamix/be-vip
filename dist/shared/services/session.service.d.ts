export interface IN_Session {
    id?: number;
    role?: string;
    email?: string;
}
export declare class SessionService {
    private data;
    constructor();
    set(val: any): void;
    get(): IN_Session;
    getUserId(): number;
}
