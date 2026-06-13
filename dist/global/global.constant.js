"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_ENDPOINT = exports.COMMUNICATION_MAIL_CONSTANT = exports.COMMUNICATION_SMS_CONSTANT = exports.ENVIROMENT_CONSTANT = exports.MESSAGING_CONSTANT = exports.GLOBAL_CONSTANT = void 0;
exports.GLOBAL_CONSTANT = {
    FILE_PATH: "http://localhost:8080/file-uploader/file2?path=",
    UI_BASE_URL: "http://localhost:8080/",
    UI_VERIFICATION: "verify",
};
exports.MESSAGING_CONSTANT = {
    USER_REGISTER: "USER_REGISTER",
};
exports.ENVIROMENT_CONSTANT = {
    UI_URL: "localhost:4200",
};
exports.COMMUNICATION_SMS_CONSTANT = {
    API_PROVIDER: "SMSJUST",
    SMSJUST: {
        BASE_URL: "http://www.smsjust.com/sms/user/urlsms.php",
        username: "abc",
        password: "pwd",
        senderId: "abc",
    },
};
exports.COMMUNICATION_MAIL_CONSTANT = {
    EMAIL: "mailer2@pinnacleit.co.in",
    PASSWORD: "Password1234",
    DEFAULT_SENDER_NAME: "Reusable-Nest-Api",
    DEFAULT_SENDER_EMAIL: "mailer2@pinnacleit.co.in",
};
exports.AWS_ENDPOINT = { KEY: "s3.wasabisys.com" };
//# sourceMappingURL=global.constant.js.map