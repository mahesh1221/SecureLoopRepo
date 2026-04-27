import { eq } from 'drizzle-orm';
import type { DbClient } from '@secureloop/db';
import { users, type User, type NewUser } from '../schema/users';

export class UsersRepository {
  constructor(private readonly client: DbClient) {}

  private get db() {
    return this.client.db;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);
    return row ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const [row] = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return row ?? null;
  }

  async create(input: NewUser): Promise<User> {
    const [row] = await this.db
      .insert(users)
      .values({ ...input, email: input.email.toLowerCase() })
      .returning();
    if (!row) throw new Error('Insert returned no row');
    return row;
  }

  async recordLogin(id: string): Promise<void> {
    await this.db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, id));
  }
}
