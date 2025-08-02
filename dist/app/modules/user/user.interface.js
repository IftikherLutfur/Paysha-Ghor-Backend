"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["AGENT"] = "AGENT";
})(Role || (exports.Role = Role = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["APPROVED"] = "APPROVED";
    UserStatus["PENDING"] = "PENDING";
    UserStatus["SUSPEND"] = "SUSPEND";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
