import mongoose, { Model, Schema } from "mongoose";

export interface ILangMap {
	[langCode: string]: string;
}

export interface IWord {
	_id: string;
	category: string;
	translations: ILangMap;
	partOfSpeech?: string;
}

export interface IDictionary {
	words: IWord[];
}

export const wordSchema: Schema<IWord> = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		category: { type: String, required: true },
		translations: {
			type: Map,
			of: String,
			required: true,
		},
		partOfSpeech: { type: String },
	},
	{ collection: "dictionary" },
);

export const Dictionary: Model<IWord> = mongoose.model("Dictionary", wordSchema);
