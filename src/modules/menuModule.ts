import { db } from './dbModule'

export default class MenuModule {
  static find() {
    return db('menu').find(
      {},
      { id: 1, title: 1, p_id: 1, path: 1, component: 1 }
    )
  }
}
