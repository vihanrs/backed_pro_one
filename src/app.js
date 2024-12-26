import express from "express";
import { productRouter } from "./api/product.js";
import { categoryRouter } from "./api/category.js";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";
import { connectDB } from "./infrastructure/db.js";

const app = express();

const port = 8000;

app.use(express.json()); // For parsing JSON requests*

// pre middleware
// app.use((req, res, next) => {
//   console.log("Recieved a Request");
//   console.log(req.method, req.url);
//   next();
// });

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

// app.get("/products", getProducts);
// app.get("/products/:id", getProductById);
// app.post("/products", createProduct);
// app.put("/products/:id", updateProduct);
// app.delete("/products/:id", deleteProduct);

// post middleware
app.use(globalErrorHandlingMiddleware);

connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
