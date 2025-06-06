import cssStyles from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import { BarLoader } from 'react-spinners';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

interface NoteListProps {
	notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: number) => deleteNote(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const { isPending, isError } = mutation;

	const handleDelete = (id: number) => {
		mutation.mutate(id);
	};

	return (
		<>
			<ul className={cssStyles.list}>
				{notes.map(note => {
					return (
						<li className={cssStyles.listItem} key={note.id}>
							<h2 className={cssStyles.title}>{note.title}</h2>
							<p className={cssStyles.content}>{note.content}</p>
							<div className={cssStyles.footer}>
								<span className={cssStyles.tag}>{note.tag}</span>
								<button className={cssStyles.button} onClick={() => handleDelete(note.id)}>
									{!isPending ? 'Delete' : 'In progress'}
								</button>
							</div>
						</li>
					);
				})}
			</ul>
			{isPending && (
				<BarLoader
					cssOverride={{
						display: 'block',
						margin: '0 auto',
						backgroundColor: 'red',
						width: '500px',
					}}
				/>
			)}
			{isError && <ErrorMessage />}
		</>
	);
}
