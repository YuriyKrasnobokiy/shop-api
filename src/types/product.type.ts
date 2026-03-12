export type Product = {
  id: number,
  name: string,
  band: string,
  categoryId: number,
  price: number,
  stock: number,
  size?: string,
  image: string,
  description: string
};