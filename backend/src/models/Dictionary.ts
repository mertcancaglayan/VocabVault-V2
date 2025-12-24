import mongoose, { Model, Schema } from "mongoose";

export interface ILangMap {
	[langCode: string]: string;
}

export interface IWord {
	_id: string;
	sub_category_key: string;
	level: string;
	word: ILangMap;
	example: ILangMap;
	partOfSpeech?: string;
}

export interface IDictionary {
	words: IWord[];
}

export const wordSchema: Schema<IWord> = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		sub_category_key: { type: String, required: true },
		level: {type: String, required :true},
		word: {
			type: Map,
			of: String,
			required: true,
		},
		example: { type: Map, of: String },
		partOfSpeech: { type: String },
	},
	{ collection: "dictionaryv2" },
);

export const Dictionary: Model<IWord> = mongoose.model("Dictionary", wordSchema);
