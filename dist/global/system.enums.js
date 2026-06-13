"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectStatus = exports.MODULE = exports.eventType = exports.formType = exports.achievementType = exports.customerType = exports.projectType = exports.status = exports.productType = exports.permissions = exports.gender = exports.userRoles = void 0;
var userRoles;
(function (userRoles) {
    userRoles["SUPER_ADMIN"] = "SUPER_ADMIN";
    userRoles["OFFICE_ADMIN"] = "OFFICE_ADMIN";
    userRoles["USER"] = "USER";
})(userRoles || (exports.userRoles = userRoles = {}));
var gender;
(function (gender) {
    gender["MALE"] = "MALE";
    gender["FEMALE"] = "FEMALE";
    gender["OTHER"] = "OTHER";
})(gender || (exports.gender = gender = {}));
var permissions;
(function (permissions) {
    permissions["READ"] = "READ";
    permissions["WRITE"] = "WRITE";
    permissions["UPDATE"] = "UPDATE";
    permissions["DELETE"] = "DELETE";
})(permissions || (exports.permissions = permissions = {}));
var productType;
(function (productType) {
    productType["NEWS"] = "NEWS";
    productType["BLOGS"] = "BLOGS";
})(productType || (exports.productType = productType = {}));
var status;
(function (status) {
    status["ACTIVE"] = "ACTIVE";
    status["INACTIVE"] = "INACTIVE";
})(status || (exports.status = status = {}));
var projectType;
(function (projectType) {
    projectType["PROJECT"] = "PROJECT";
    projectType["BANNER"] = "BANNER";
})(projectType || (exports.projectType = projectType = {}));
var customerType;
(function (customerType) {
    customerType["CLIENT"] = "CLIENT";
    customerType["FEEDBACK"] = "FEEDBACK";
})(customerType || (exports.customerType = customerType = {}));
var achievementType;
(function (achievementType) {
    achievementType["BANNER"] = "BANNER";
    achievementType["PHOTO"] = "PHOTO";
    achievementType["VIDEO"] = "VIDEO";
})(achievementType || (exports.achievementType = achievementType = {}));
var formType;
(function (formType) {
    formType["EVENT"] = "EVENT";
    formType["BANNER"] = "BANNER";
})(formType || (exports.formType = formType = {}));
var eventType;
(function (eventType) {
    eventType["SEMINAR"] = "SEMINAR";
    eventType["WEBINAR"] = "WEBINAR";
    eventType["WORKSHOP"] = "WORKSHOP";
    eventType["CLIENT_MEETING"] = "CLIENT_MEETING";
})(eventType || (exports.eventType = eventType = {}));
var MODULE;
(function (MODULE) {
    MODULE["PROJECT"] = "PROJECT";
    MODULE["PLANT_LOCATION"] = "PLANT_LOCATION";
    MODULE["OFFICE_LOCATION"] = "OFFICE_LOCATION";
    MODULE["NEWS_BLOGS"] = "NEWS_BLOGS";
    MODULE["HOMEPAGE"] = "HOMEPAGE";
    MODULE["CUSTOMERS"] = "CUSTOMERS";
    MODULE["ABOUT_US"] = "ABOUT_US";
})(MODULE || (exports.MODULE = MODULE = {}));
var projectStatus;
(function (projectStatus) {
    projectStatus["ONGOING"] = "ONGOING";
    projectStatus["UPCOMING"] = "UPCOMING";
    projectStatus["COMPLETED"] = "COMPLETED";
})(projectStatus || (exports.projectStatus = projectStatus = {}));
(function (projectType) {
    projectType["RESIDENTIAL"] = "RESIDENTIAL";
    projectType["COMMERCIAL"] = "COMMERCIAL";
})(projectType || (exports.projectType = projectType = {}));
//# sourceMappingURL=system.enums.js.map