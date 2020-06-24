const { DataSource } = require('apollo-datasource')
const isEmail = require('isemail')

class UserAPI extends DataSource {
  constructor({ prisma }) {
    super()
    this.prisma = prisma
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg
    if (!email || !isEmail.validate(email)) return null

    const users = await this.store.users.findOrCreate({ where: { email } })
    return users && users[0] ? users[0] : null
  }

  async createUser({ email, password, name }) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    })
    return user
  }

  findUserByEmail({ email, id }) {
    return this.prisma.user.findOne({
      where: {
        email,
        id,
      },
    })
  }

  findUserById({ id }) {
    return this.prisma.user.findOne({
      where: {
        id,
      },
    })
  }
}

module.exports = UserAPI
