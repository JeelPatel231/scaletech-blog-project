import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type FindOptionsWhere } from "typeorm";
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

  static async getBlogEntries(where?: FindOptionsWhere<Blog>): Promise<Blog[]> {
    return await this.find({
      where,
      relations: {
        author: true
      },
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
      },
      order: {
        creation_date: 'DESC'
      }
    })
  }

  static async getFullBlog(id: string): Promise<Blog | null> {
    return await this.findOne({
      where: { id: id },
      relations: { author: true },
      select: { author: { username: true } }
    })
  }

}

