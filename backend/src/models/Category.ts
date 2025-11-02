import mongoose, {Schema} from "mongoose";

export interface ICategory {
	id: string;
	key: string;
	label: string;
}

const categoriesSchema: Schema<ICategory> = new mongoose.Schema({
	id: { type: String, required: true },
	key: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});

export const Categories = mongoose.model("Categories", categoriesSchema);


