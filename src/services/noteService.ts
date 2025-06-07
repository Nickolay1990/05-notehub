import axios from 'axios';
import type { Note } from '../types/note';

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NotesResponse {
	notes: Note[];
	totalPages: number;
}

export interface createNoteValues {
	title: string;
	content?: string;
	tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
}

interface SearchParams {
	page: number;
	search?: string;
	perPage: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export async function fetchNotes(page: number, perPage: number, search: string): Promise<NotesResponse> {
	const params: SearchParams = { page, perPage };

	if (search) params.search = search;

	const res = await axios.get<NotesResponse>('/notes', {
		params,
	});

	return res.data;
}

export async function createNote({ title, content, tag }: createNoteValues): Promise<Note> {
	const res = await axios.post<Note>('/notes', {
		title,
		content,
		tag,
	});

	return res.data;
}

export async function deleteNote(id: number): Promise<Note> {
	const res = await axios.delete<Note>(`/notes/${id}`);
	return res.data;
}
