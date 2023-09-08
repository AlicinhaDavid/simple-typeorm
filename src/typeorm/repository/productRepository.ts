import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
export const productRepository = (): any => {
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
        console.log(error);
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      console.log(error);
    } finally {
      await AppDataSource.destroy();
    }
  };
};
