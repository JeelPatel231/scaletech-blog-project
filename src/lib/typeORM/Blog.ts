import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConstructorBaseEntity } from "./TypeORMUtils";
import { TORMUser } from "./User";

@Entity()
export class TORMBlog extends ConstructorBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToOne(() => TORMUser)
  @JoinColumn()
  author!: TORMUser;

  @Column('text', { array: true })
  tags!: string[]

  @Column('text')
  title!: string;

  @Column('text')
  description!: string;

  @Column('text')
  content!: string;

  @Column('timestamptz')
  creation_date: Date = new Date();
}

