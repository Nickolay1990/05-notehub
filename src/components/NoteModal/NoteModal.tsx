import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';
import { useEffect } from 'react';
import NoteForm from '../NoteForm/NoteForm';

interface NoteModalProps {
	closeModal: () => void;
}

export default function NoteModal({ closeModal }: NoteModalProps) {
	function handleBackdrop(event: React.MouseEvent<HTMLDivElement>) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	useEffect(() => {
		function handleKeyboard(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				closeModal();
			}
		}

		document.addEventListener('keydown', handleKeyboard);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleKeyboard);
			document.body.style.overflow = '';
		};
	}, [closeModal]);

	return createPortal(
		<div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
			<div className={css.modal}>
				<NoteForm closeModal={closeModal} />
			</div>
		</div>,
		document.body
	);
}
