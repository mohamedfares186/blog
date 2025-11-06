import SessionRepository from "../../users/repositories/contract/sessions.repository.ts";
import Session from "../../users/models/sessions.model.ts";

class SessionRepoImpl extends SessionRepository {
  public override async create(
    userId: string,
    token: string,
    expire: Date
  ): Promise<Session> {
    return await Session.create({
      userId,
      token,
      expiresAt: expire,
      isRevoked: false,
    });
  }

  public override async findOne(token: string): Promise<Session | null> {
    return await Session.findOne({
      where: { token },
    });
  }

  public override async update(token: string): Promise<[number]> {
    return await Session.update(
      {
        isRevoked: true,
      },
      {
        where: { token },
      }
    );
  }
}

export default SessionRepoImpl;
