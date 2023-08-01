import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { ConstructorBaseEntity } from "./TypeORMUtils";
import { Blog } from "./Blog";

@Entity()
export class User extends ConstructorBaseEntity {
  @PrimaryColumn('text')
  username!: string;

  //{ select: false }
  @Column('text', { nullable: false })
  password!: string;

  // TODO: search more about class transformers
  // @Column('text', { nullable: true })
  // avatar: string | null = null

  @Column('text')
  last_name!: string;

  @Column('text')
  first_name!: string;

  @Column('timestamptz', { nullable: false })
  account_created: Date = new Date();

  @OneToMany(() => Blog, (blog) => blog.author)
  @JoinColumn()
  blogs!: Blog[]

  static async getUserDetails(username: string): Promise<User | null> {
    return await this.findOne({
      where: { username: username },
      relations: { blogs: true },
      select: {
        blogs: {
          title: true,
          id: true,
          description: true,
          tags: true,
        },
      }
    })
  }

  static async getUserPassword(username: string): Promise<string | null> {
    const userData = await this.findOne({ where: { username: username }, select: { password: true } })
    return userData?.password ?? null;
  }
}

