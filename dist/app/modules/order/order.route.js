"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_service_1 = require("./order.service");
const router = express_1.default.Router();
router.post("/", order_service_1.OrderServices.createOrder);
exports.OrderRoutes = router;
