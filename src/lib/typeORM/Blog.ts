import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConstructorBaseEntity } from "./TypeORMUtils";
import { User } from "./User";

@Entity()
export class Blog extends ConstructorBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (author) => author.blogs)
  @JoinColumn()
  author!: User;

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

