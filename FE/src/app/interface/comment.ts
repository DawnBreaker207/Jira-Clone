import { JUser } from './user';

export class JComment {
  id: string;
  body?: string;
  createAt: string;
  updatedAt: string;
  issueId: string;
  userId?: string;
  user: JUser;

  constructor(issueId: string, user: JUser) {
    const now = new Date();
    this.id = `${now.getTime()}`;
    this.issueId = issueId;
    this.user = user;
    this.createAt = now.toISOString();
    this.updatedAt = now.toISOString();
  }
}
