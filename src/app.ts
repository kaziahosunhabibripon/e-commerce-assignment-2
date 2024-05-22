import express, { Errback, NextFunction, Request, Response } from "express";

import cors from "cors";
import { ProductRoutes } from "./app/modules/products/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
// Application level middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.use("/api/products", ProductRoutes);

app.use("/api/orders", OrderRoutes);
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: "Route not found",
  });
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API Home Page!");
});

export default app;
