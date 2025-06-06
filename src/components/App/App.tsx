import { useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { fetchNotes } from '../../services/noteService';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import { BarLoader } from 'react-spinners';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsOpenModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedText] = useDebounce(searchQuery, 300);

	const { data, isSuccess, isPending, isError } = useQuery({
		queryKey: ['tasks', currentPage, debouncedText],
		queryFn: () => fetchNotes(currentPage, debouncedText),
	});

	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedText]);

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox onChange={setSearchQuery} />

				{isSuccess && data.totalPages > 1 && (
					<Pagination totalPages={data.totalPages} setPage={setCurrentPage} currentPage={currentPage} />
				)}

				<button className={css.button} onClick={() => setIsOpenModal(true)}>
					Create note +
				</button>
			</header>
			{isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
			{isError && <ErrorMessage />}
			{isModalOpen && <NoteModal closeModal={() => setIsOpenModal(false)} />}
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
		</div>
	);
}
