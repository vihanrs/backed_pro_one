import express from "express";
import { productRouter } from "./api/product";
import { categoryRouter } from "./api/category";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { connectDB } from "./infrastructure/db";
import cors from "cors";

const app = express();

const port = 8000;

app.use(express.json()); // For parsing JSON requests*
app.use(cors({ origin: "http://localhost:5173" }));

// pre middleware
// app.use((req, res, next) => {
//   console.log("Recieved a Request");
//   console.log(req.method, req.url);
//   next();
// });

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

// app.get("/products", getProducts);
// app.get("/products/:id", getProductById);
// app.post("/products", createProduct);
// app.put("/products/:id", updateProduct);
// app.delete("/products/:id", deleteProduct);

// post middleware
app.use(globalErrorHandlingMiddleware);

connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
