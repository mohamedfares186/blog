import Session from "../../models/sessions.model.ts";

abstract class SessionRepository {
  protected abstract create(
    userId: string,
    token: string,
    expire: Date
  ): Promise<Session>;
  protected abstract findOne(token: string): Promise<Session | null>;
  protected abstract update(token: string): Promise<[number]>;
}

export default SessionRepository;
