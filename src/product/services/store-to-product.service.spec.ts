import { Test, TestingModule } from '@nestjs/testing';
import { StoreToProductService } from './store-to-product.service';

describe('StoreToProductService', () => {
  let service: StoreToProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreToProductService],
    }).compile();

    service = module.get<StoreToProductService>(StoreToProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
