import { Controller, Query, Mutation } from "vesper";
import { EntityManager } from "typeorm";
import { Points } from "../entity/Points";

@Controller()
export class PointsController {
  constructor(private entityManager: EntityManager) {}

  // serves "points: [Points]" requests
  @Query()
  points() {
    return this.entityManager.find(Points);
  }

  @Query()
  getPoints({ id }: any) {
    return this.entityManager.findOne(Points, id);
  }

  @Mutation()
  async savePoints(args: any) {
    try {
      const points = await this.entityManager.create(Points, args);
      return this.entityManager.save(Points, points);
    } catch (error) {
      return null;
    }
  }

  @Mutation()
  async deletePoints({ id }: any) {
    await this.entityManager.remove(Points, { id });
    return true;
  }
}
