import { Test, TestingModule } from '@nestjs/testing';
import { StoreToProductController } from './store-to-product.controller';

describe('StoreToProductController', () => {
  let controller: StoreToProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreToProductController],
    }).compile();

    controller = module.get<StoreToProductController>(StoreToProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
