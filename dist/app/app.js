"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/products/product.route");
const order_route_1 = require("./modules/order/order.route");
// Application level middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use("/api/products", product_route_1.ProductRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the API Home Page!");
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
    next();
});
exports.default = app;
