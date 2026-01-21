import mongoose, { Schema } from "mongoose";

export interface Labels {
	en: string;
	tr: string;
	pl: string;
}

export interface Subcategory {
	key: string;
	labels: Labels;
	emoji: string;
	description: string;
}

export interface CategoryDocument {
	key: string;
	labels: Labels;
	subcategories: Subcategory[];
}

const LabelSchema = new Schema<Labels>({
	en: { type: String, required: true },
	tr: { type: String, required: true },
	pl: { type: String, required: true },
});

const SubcategorySchema = new Schema<Subcategory>({
	key: { type: String, required: true, unique: false },
	labels: { type: LabelSchema, required: true },
	emoji: { type: String, required: true },
	description: { type: String, required: true },
});

const CategorySchema = new Schema<CategoryDocument>({
	key: { type: String, required: true, unique: true },
	labels: { type: LabelSchema, required: true },
	subcategories: { type: [SubcategorySchema], required: true },
});

export const Categories = mongoose.model("categoriesv3", CategorySchema);
