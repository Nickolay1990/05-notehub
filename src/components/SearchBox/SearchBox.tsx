import css from './SearchBox.module.css';

interface SearchBoxProps {
	onChange: (query: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
	function updateSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
		onChange(event.target.value);
	}

	return <input className={css.input} type="text" placeholder="Search notes" onChange={updateSearchQuery} />;
}
