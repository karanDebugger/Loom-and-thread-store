const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// ===================================
// Upload Image To Cloudinary
// ===================================
const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "fashion-store/products",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ===================================
// Create Product
// ===================================
const createProduct = async (req, res) => {
  try {
    console.log("========== CREATE PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        console.log("Uploading:", file.originalname);

        const uploaded = await uploadImage(file.buffer);

        console.log("Cloudinary URL:", uploaded.secure_url);

        imageUrls.push(uploaded.secure_url);
      }
    }

    const product = await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      stock: req.body.stock,
      featured:
        req.body.featured === "true" ||
        req.body.featured === true,
      images: imageUrls,
    });

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Get Products
// Search + Filter + Sort + Pagination
// ===================================
const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      featured,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 8,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          brand: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Brand
    if (brand) {
      query.brand = brand;
    }

    // Featured
    if (featured === "true") {
      query.featured = true;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = {};

    switch (sort) {
      case "priceAsc":
        sortOption.price = 1;
        break;

      case "priceDesc":
        sortOption.price = -1;
        break;

      case "nameAsc":
        sortOption.title = 1;
        break;

      case "latest":
        sortOption.createdAt = -1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const currentPage = Number(page);
    const pageSize = Number(limit);

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        totalProducts,
        currentPage,
        totalPages: Math.ceil(totalProducts / pageSize),
        pageSize,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Get Single Product
// ===================================
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Update Product
// ===================================
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let imageUrls = product.images;

    if (req.files && req.files.length > 0) {
      imageUrls = [];

      for (const file of req.files) {
        const uploaded = await uploadImage(file.buffer);
        imageUrls.push(uploaded.secure_url);
      }
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || product.title,
        description: req.body.description || product.description,
        price: req.body.price || product.price,
        brand: req.body.brand || product.brand,
        category: req.body.category || product.category,
        stock: req.body.stock ?? product.stock,
        featured:
          req.body.featured !== undefined
            ? req.body.featured === "true" ||
              req.body.featured === true
            : product.featured,
        images: imageUrls,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Delete Product
// ===================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Exports
// ===================================
module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};