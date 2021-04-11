import { createAuth } from '@keystone-next/auth'
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'
import { config, createSchema } from '@keystone-next/keystone/schema'
import { User } from './schemas/User'
import { Product } from './schemas/Product'
import 'dotenv/config'

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sickfits'

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,  // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // ! TODO: add in initial roles here
  }
})

export default withAuth(config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // ! TODO: Add data seeding here
  },
  lists: createSchema({
    // ? Schema items go in here
    User,
    Product,
  }),
  ui: {
    // Show the UI only for user who pass this test
    isAccessAllowed: ({ session }) => !!session?.data,
  },
  session: withItemData(statelessSessions(sessionConfig), {
    // GraphQL Query
    User: `id name email`
  })
}))