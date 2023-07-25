import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { ConstructorBaseEntity } from "./TypeORMUtils";
import { Blog } from "./Blog";

@Entity()
export class User extends ConstructorBaseEntity {
  @PrimaryColumn('text')
  username!: string;

  //{ select: false }
  @Column('text')
  password!: string;

  // @Column('text', { nullable: true })
  // avatar: string | null = null;
  @Column('boolean')
  avatar: boolean = false

  @Column('text')
  last_name!: string;

  @Column('text')
  first_name!: string;

  @Column('timestamptz')
  account_created: Date = new Date();

  @OneToMany(() => Blog, (blog) => blog.author)
  @JoinColumn()
  blogs!: Promise<Blog[]>
}

