import NotFoundError from "../domain/errors/not-found-error.js";
import Product from "../infrastructure/schemas/Product.js";

const products = [
  {
    categoryId: "1",
    image: "/assets/products/airpods-max.png",
    id: "1",
    name: "AirPods Max",
    price: "549.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "3",
    image: "/assets/products/echo-dot.png",
    id: "2",
    name: "Echo Dot",
    price: "99.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "2",
    image: "/assets/products/pixel-buds.png",
    id: "3",
    name: "Galaxy Pixel Buds",
    price: "99.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "1",
    image: "/assets/products/quietcomfort.png",
    id: "4",
    name: "Bose QuiteComfort",
    price: "249.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "3",
    image: "/assets/products/soundlink.png",
    id: "5",
    name: "Bose SoundLink",
    price: "119.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "5",
    image: "/assets/products/apple-watch.png",
    id: "6",
    name: "Apple Watch 9",
    price: "699.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "4",
    image: "/assets/products/iphone-15.png",
    id: "7",
    name: "Apple Iphone 15",
    price: "1299.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
  {
    categoryId: "4",
    image: "/assets/products/pixel-8.png",
    id: "8",
    name: "Galaxy Pixel 8",
    price: "549.00",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sequi?",
  },
];

export const getProducts = async (req, res, next) => {
  try {
    const data = await Product.find();
    return res.status(200).json(data).send();
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const selectedId = req.params.id;
    // const product = products.find((prod) => prod.id == selectedId);
    const product = await Product.findById(selectedId);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return res.status(200).json(product).send();
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    // products.push(req.body);
    await Product.create(req.body);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const selectedId = req.params.id;
    // const product = products.find((prod) => prod.id == selectedId);

    const product = await Product.findByIdAndUpdate(selectedId, req.body);

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.body.image;

    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const selectedId = req.params.id;
    // const index = products.findIndex((pro) => pro.id == selectedId);
    const product = await Product.findByIdAndDelete(selectedId);

    if (!product) {
      throw new NotFoundError("Product not found");
    }
    // products.splice(index, 1);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
