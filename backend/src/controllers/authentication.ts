import { createUser, getUserByEmail, updateUserById } from "db";
import express from "express";
import { authentication, random } from "helpers";

export const register = async ( req: express.Request, res: express.Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("Missing name, email or password");
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const salt = random();
        const user = await createUser({
            name,
            email,
            salt,
            password: await authentication(salt, password),
        });
        return res.json(user);
    } catch (error) {
        console.error(error);
        throw new Error("Error registering user");
    }
}

export const login = async ( req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Missing email or password");
        }
        const result = await getUserByEmail(email);
        if (!result) {
            throw new Error("User not found");
        }
        const user = result[0];

        const expectedHash = await authentication(user.salt, password);

        if (user.password !== expectedHash) {
            throw new Error("Invalid password");
        }
        user.sessionToken = await authentication(random(), user.password);

        const updatedUser = await updateUserById(user.id, user);

        res.cookie("sessionToken", user.sessionToken, { 
            domain: "localhost",
            path: "/",
            expires: new Date(Date.now() + 900000)
         });
        return res.json(updatedUser);

    } catch (error) {
        console.error(error);
        throw new Error("Error logging in");
    }
}