import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

interface ProductRepositoryInterface {
  createProduct(data: any): Promise<any>;
  getAllProducts(): Promise<Product[] | []>;
}

export const productRepository = (): ProductRepositoryInterface => ({
  createProduct: async (data: any): Promise<any> => {
    try {
      await AppDataSource.initialize();
      const repository = AppDataSource.getRepository(Product);

      const queryRunner = AppDataSource.createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const productCreated = repository.create(data);
        const productSaved = await queryRunner.manager.save(productCreated);

        await queryRunner.commitTransaction();
        return productSaved;
      } catch (error) {
        console.log("Transaction error", error);
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      console.log("Repository error", error);
    } finally {
      await AppDataSource.destroy();
    }
  },
  getAllProducts: async (): Promise<Product[] | []> => {
    try {
      await AppDataSource.initialize();
      const repository = AppDataSource.getRepository(Product);
      const products = await repository.find({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          color: true,
        },
      });

      return products;
    } catch (error) {
      console.log("Get All Products Repository Error:", error);
      return [];
    } finally {
      await AppDataSource.destroy();
    }
  },
});
