import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';
import { IProduct } from './product.interface';
import { Product } from './product.model';

// creating a Product in the db
const createProductIntoDB = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

// getting all the Products
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

// get single Product
const getSingleProductFromDB = async () => {};

// update a Product
const updateAProductInDB = async () => {};

// deleting a Product
const deleteAProductFromDB = async () => {};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateAProductInDB,
  deleteAProductFromDB,
};
