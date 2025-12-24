import mongoose, { Schema } from "mongoose";

export interface Subcategory {
	key: string;
	label: string;
	emoji: string;
	description: string;
}

export interface CategoryDocument {
	key: string;
	label: string;
	subcategories: Subcategory[];
}

const SubcategorySchema = new Schema<Subcategory>({
	key: { type: String, required: true, unique: false },
	label: { type: String, required: true },
	emoji: { type: String, required: true },
	description: { type: String, required: true },
});

const CategorySchema = new Schema<CategoryDocument>({
	key: { type: String, required: true, unique: true },
	label: { type: String, required: true },
	subcategories: { type: [SubcategorySchema], required: true },
});

export const Categories = mongoose.model("categoriesv3", CategorySchema);
