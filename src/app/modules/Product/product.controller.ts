import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

// Product controllers

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Product retrieved successfully',
    data: '',
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: '',
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully',
    data: '',
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
