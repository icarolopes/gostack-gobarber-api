import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from './CreateUserService'
import { AuthenticateUserService } from './AuthenticateUserService'
import { FakeHashProvider } from '../provider/HashProvider/fakes/FakeHashProvider'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@exemple.com',
      password: '123123'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })
})
