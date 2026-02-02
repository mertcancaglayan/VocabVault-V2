import mongoose, { Model, Schema } from "mongoose";

export interface ILangMap {
	[langCode: string]: string;
}

export interface IWord {
	_id: string;
	category_key: string;
	sub_category_key: string;
	sub_category_label: string;
	level: string;
	translations: ILangMap;
	example: ILangMap;
	phonetics: ILangMap;
}

export interface IDictionary {
	words: IWord[];
	page: number;
	pageCount: number;
}

export const wordSchema: Schema<IWord> = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		category_key: { type: String, required: true },
		sub_category_key: { type: String, required: true },
		sub_category_label: { type: String, required: true },
		level: { type: String, required: true },
		translations: {
			type: Map,
			of: String,
			required: true,
		},
		example: { type: Map, of: String },
		phonetics: { type: Map, of: String },
	},
	{ collection: "dictionaryv3" },
);

export const Dictionary: Model<IWord> = mongoose.model("Dictionary", wordSchema);
