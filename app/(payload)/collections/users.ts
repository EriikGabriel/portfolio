import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "../access/is-admin";
import { isAdminOrSelf } from "../access/is-admin-or-self";

export const Users: CollectionConfig = {
	slug: "users",
	labels: {
		singular: "Usuário",
		plural: "Usuários",
	},
	admin: {
		useAsTitle: "email",
		group: "Administração",
		defaultColumns: ["email", "role", "createdAt"],
		hidden: ({ user }) => user?.role !== "admin",
	},
	auth: true,
	access: {
		create: isAdmin,
		read: isAdminOrSelf,
		update: isAdminOrSelf,
		delete: isAdmin,
	},
	fields: [
		{
			name: "role",
			type: "select",
			options: [
				{
					label: "Admin",
					value: "admin",
				},
			],
			defaultValue: "admin",
			required: true,
			access: {
				create: isAdminField,
				update: isAdminField,
			},
			admin: {
				description: "Define o nível de acesso do usuário",
			},
		},
	],
};
