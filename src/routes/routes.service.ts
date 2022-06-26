import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { BaseModel, InjectModel } from '@iaminfinity/express-cassandra';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route)
    private readonly routeModel: BaseModel<Route>,
  ) {}

  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  async findAll() {
    return this.routeModel.findAsync({});
  }

  async findOne(id: number) {
    return this.routeModel.findOneAsync({ id });
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
