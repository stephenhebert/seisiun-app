import { createPool, sql } from '@vercel/postgres'

const orderedTables = [
  'TuneTag',
  'TuneComment',
  'TuneName',
  'UserSession',
  'UserTune',
  'DatabaseTune',
  'Tune',
  'Database',
  'User',
  'Session',
  'Tag',
  '_prisma_migrations'
]

const db = createPool()
orderedTables.forEach(async table => {
  await db.query(`DROP TABLE IF EXISTS "${table}" CASCADE;`)
  // await db.query(sql`TRUNCATE TABLE "${table}" CASCADE;`)
})
db.end()
