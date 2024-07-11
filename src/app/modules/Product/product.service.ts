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
    .priceRange()
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
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// update a Product
const updateAProductInDB = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// deleting a Product
const deleteAProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, { isDeleted: true });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateAProductInDB,
  deleteAProductFromDB,
};
