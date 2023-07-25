import { BaseEntity } from "typeorm"
import type { Primitive, PickByValue } from "utility-types";
import { instanceToPlain } from "class-transformer";

export class ConstructorBaseEntity extends BaseEntity {
  setAttributes(values: PickByValue<this,
    Primitive | Primitive[] |
    ConstructorBaseEntity | ConstructorBaseEntity[]> |
    Promise<any>
  ) {
    Object.assign(this, values)
  }

  getPOJO(): Record<string, any> {
    return instanceToPlain(this)
  }
}

