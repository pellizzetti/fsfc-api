import { Entity, Column } from '@iaminfinity/express-cassandra';

@Entity({
  table_name: 'route',
  key: ['id'],
})
export class Route {
  @Column({
    type: 'int',
  })
  id!: number;

  @Column({
    type: 'text',
  })
  title!: string;

  @Column({
    type: 'frozen',
    typeDef: '<position>',
  })
  startPosition!: string;

  @Column({
    type: 'frozen',
    typeDef: '<position>',
  })
  endPosition!: string;
}
