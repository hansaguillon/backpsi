"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddendumDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_addendum_dto_1 = require("./create-addendum.dto");
class UpdateAddendumDto extends (0, mapped_types_1.PartialType)(create_addendum_dto_1.CreateAddendumDto) {
}
exports.UpdateAddendumDto = UpdateAddendumDto;
//# sourceMappingURL=update-addendum.dto.js.map