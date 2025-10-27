import { drizzle } from "drizzle-orm/node-postgres";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { Pool } from "pg";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    salt: text("salt"),
    sessionToken: text("sessionToken"),
    role: text("role"),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const pool = new Pool({
    connectionString: process.env.DB,
});

export const db = drizzle(pool);

export const getUsers = async () => await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
}).from(users);

export const getUserByEmail = async (email: string) => await db.select().from(users).where(eq(users.email, email));

export const getUserBySessionToken = async (sessionToken: string) => await db.select().from(users).where(eq(users.sessionToken, sessionToken));

export const createUser = async (user: NewUser) => await db.insert(users).values(user).returning({id: users.id, name: users.name, email: users.email});

export const updateUserById = async (id: number, user: User) => await db.update(users).set(user).where(eq(users.id, id)).returning({id: users.id, name: users.name, email: users.email, role: users.role});

export const deleteUser = async (id: number) => await db.delete(users).where(eq(users.id, id));