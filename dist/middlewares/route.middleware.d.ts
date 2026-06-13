import { NestMiddleware } from '@nestjs/common';
import { SessionService } from '../shared/services/session.service';
export declare class RouteMiddleware implements NestMiddleware {
    private ss;
    constructor(ss: SessionService);
    use(req: any, res: any, next: () => void): void;
}
