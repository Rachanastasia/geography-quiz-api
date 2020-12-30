const bcrypt = require('bcryptjs');

const UserService = {
  async hasUserWithEmail(db, email) {
    const [user] = await db
      .select('name', 'email', 'id', 'password')
      .from('users')
      .where({ email })
    return user;
  },
  insertUser(db, user) {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password
    }
    return db
      .insert(newUser)
      .into('users')
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
}

module.exports = UserService;