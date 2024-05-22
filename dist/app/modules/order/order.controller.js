"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
// create a new order controller
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const orderValidationData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrder(orderValidationData);
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error || "Woops! Order creation failed!",
            error: error.message,
        });
    }
});
// Get All Order Data
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof req.query.email === "string") {
            const email = req.query.email;
            const result = yield order_service_1.OrderServices.getAllOrders(email);
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result,
            });
        }
        else {
            const result = yield order_service_1.OrderServices.getAllOrders(null);
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error || "Order Not Found!",
            error: error.message,
        });
    }
});
//
exports.OrderController = {
    createOrder,
    getAllOrders,
};
