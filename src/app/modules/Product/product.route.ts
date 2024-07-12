import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router
  .route('/')
  .get(ProductControllers.getAllProducts)
  .post(
    validateRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct,
  );

router
  .route('/checkout')
  .post(
    validateRequest(ProductValidations.productCheckoutValidations),
    ProductControllers.checkoutProduct,
  );

router
  .route('/:id')
  .get(ProductControllers.getSingleProduct)
  .put(
    validateRequest(ProductValidations.updateProductValidationSchema),
    ProductControllers.updateSingleProduct,
  )
  .delete(ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
