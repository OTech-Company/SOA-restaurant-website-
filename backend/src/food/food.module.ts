import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodSchema } from './food.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    forwardRef(() => OrderModule),
    MongooseModule.forFeature([{ name: 'Food', schema: FoodSchema }], 'foodDB'),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Directory for storing uploaded files
        filename: (req, file, callback) => {
          // Generate a unique filename with the original file extension
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(
            file.originalname,
          )}`;
          callback(null, uniqueName);
        },
      }),
    }),
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
