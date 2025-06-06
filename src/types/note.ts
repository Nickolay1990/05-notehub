export interface Note {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	tag: string;
}

export type TagsValue = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface OrderFormValues {
	title: string;
	content: string;
	tag: TagsValue;
}
