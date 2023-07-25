import { Column, Entity, PrimaryColumn } from "typeorm";
import { ConstructorBaseEntity } from "./TypeORMUtils";

@Entity()
export class TORMUser extends ConstructorBaseEntity {
  @PrimaryColumn('text')
  username!: string;

  @Column('text')
  password!: string;

  @Column('text', { nullable: true })
  avatar: string | null = null;

  @Column('text')
  last_name!: string;

  @Column('text')
  first_name!: string;

  @Column('timestamptz')
  account_created: Date = new Date();
}

