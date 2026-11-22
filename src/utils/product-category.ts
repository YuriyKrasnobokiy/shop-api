import { PRODUCT_CATEGORY_IDS } from "../types/product.js";
import type { ProductCategoryId } from "../types/product.js";

export function isProductCategoryId(
  value: number
): value is ProductCategoryId {
  return (PRODUCT_CATEGORY_IDS as readonly number[]).includes(value);
}