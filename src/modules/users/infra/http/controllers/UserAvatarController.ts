import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService'

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user, file } = request.body

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const userWithAvatar = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: file.filename
    })

    delete user.password

    return response.json(userWithAvatar)
  }
}
