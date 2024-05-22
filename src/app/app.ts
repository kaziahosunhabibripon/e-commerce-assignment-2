import express, { Errback, NextFunction, Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/order/order.route";
import cors from "cors";
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
