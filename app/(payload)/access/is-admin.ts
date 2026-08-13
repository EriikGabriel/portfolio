import type { Access, FieldAccess } from "payload";
import type { User } from "../payload-types";

export const isAdmin: Access = ({ req: { user } }) => {
	return Boolean(user?.role === "admin");
};

export const isAdminField: FieldAccess<User> = ({ req: { user } }) => {
	return Boolean(user?.role === "admin");
};
