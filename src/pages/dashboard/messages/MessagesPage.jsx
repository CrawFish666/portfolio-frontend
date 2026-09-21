import Card from "../../../components/ui/Card";
import { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useFeedback, useFeedbackList } from "../../../hooks/queries/useFeedback";
import { useFeedbackMutations } from "../../../hooks/mutations/useFeedbackMutations";
import { TechTags } from "../../../components/ui/TechTags";
import { Calendar, Mail, Search, Trash2 } from "lucide-react";
import { MessagesItem } from "./components/MessagesItem";
import { MessagesList } from "./components/MessagesList";
import { MessagesPagination } from "./components/MessagesPagination";
import { MessagesViewer } from "./components/MessagesViewer";
import { MessagesFilters } from "./components/MessagesFilters";
import { MessagesSearch } from "./components/MessagesSearch";

const STATUS_LIST = [
	{ value: "all", label: "Все" },
	{ value: "new", label: "Новые" },
	{ value: "read", label: "Прочитанные" },
	{ value: "answered", label: "Отвеченные" },
	{ value: "archived", label: "Архив" },
];

const STATUS_LABELS = {
	new: "Новое",
	read: "Прочитано",
	answered: "Отвечено",
	archived: "Архив",
};

export function MessagesPage() {

	const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
	const [status, setStatus] = useState("new");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [replyMessage, setReplyMessage] = useState("");
	const debouncedSearch = useDebounce(search, 1000);

	const listQuery = useFeedbackList({
		status,
		search: debouncedSearch || undefined,
		page,
		limit: 3,
	});

	const detailQuery = useFeedback(selectedFeedbackId);

	const {
		updateStatus,
		reply,
		remove,
	} = useFeedbackMutations();

	const feedbacks = listQuery.data?.items ?? [];
	const pages = listQuery.data?.pages ?? 1;
	const selectedFeedback = detailQuery.data ?? null;

	const handleStatusChange = (nextStatus) => {
		setStatus(nextStatus);
		setPage(1);
		setSelectedFeedbackId(null);
	};


	const openFeedback = (id) => {
		setSelectedFeedbackId(id);
	};

	const deleteFeedback = async (id) => {
		const confirmed = window.confirm(
			"Удалить сообщение? Это действие нельзя отменить."
		);

		if (!confirmed) return;

		try {
			await remove.mutateAsync(id);

			if (selectedFeedbackId === id) {
				setSelectedFeedbackId(null);
			}

			if (feedbacks.length === 1 && page > 1) {
				setPage((prev) => prev - 1);
			}
		} catch {
			// toast уведомление уже в глобальном состоянии
		}
	};

	const changeStatusMessage = async (newStatus) => {
		if (!selectedFeedbackId) {
			return;
		}

		try {
			await updateStatus.mutateAsync({ id: selectedFeedbackId, status: newStatus });
		} catch {
			// тост уже показан глобальным обработчиком
		}
	};

	const sendReply = async () => {
		if (!replyMessage.trim() || !selectedFeedbackId) {
			return;
		}

		try {
			await reply.mutateAsync({ id: selectedFeedbackId, data: { message: replyMessage } });
			setReplyMessage("");
		} catch {
			// тост уже показан глобальным обработчиком
		}


	};

	const getPageNumbers = () => {
		if (pages <= 7) {
			return Array.from(
				{ length: pages },
				(_, index) => index + 1
			);
		}

		const pageNumbers = [1];

		if (page > 3) {
			pageNumbers.push("...");
		}

		const start = Math.max(2, page - 1);
		const end = Math.min(pages - 1, page + 1);

		for (let index = start; index <= end; index += 1) {
			pageNumbers.push(index);
		}

		if (page < pages - 2) {
			pageNumbers.push("...");
		}

		pageNumbers.push(pages);

		return pageNumbers;
	};

	const isListLoading =
		listQuery.isLoading || listQuery.isFetching;

	useEffect(() => {
		setPage(1);
		setSelectedFeedbackId(null);
	}, [debouncedSearch]);


	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-white mb-1">
						Сообщения
					</h1>

					<p className="text-dark-400">
						Управление сообщениями
					</p>
				</div>
			</div>

			<div className="grid grid-cols-[7fr_13fr] gap-8 items-start">
				<Card title="Сообщения">
					<MessagesFilters
						status={status}
						statusList={STATUS_LIST}
						onStatusChange={handleStatusChange}
					/>

					<MessagesSearch
						value={search}
						onChange={setSearch}
					/>


					<MessagesList
						messages={feedbacks}
						selectedMessage={selectedFeedback}
						loading={isListLoading}
						onOpenMessage={openFeedback}
						onDeleteMessage={deleteFeedback}
						statusLabels={STATUS_LABELS}
					/>

					<MessagesPagination
						show={!isListLoading && feedbacks.length > 0}
						onPageChange={setPage}
						page={page}
						pages={pages}
						getPageNumbers={getPageNumbers}
					/>
				</Card>

				<Card
					title="Просмотр сообщения"
					className="flex flex-col"
				>
					<MessagesViewer
						selectedMessage={selectedFeedback}
						statusList={STATUS_LIST}
						onClose={() =>
							setSelectedFeedbackId(null)
						}
						replyMessage={replyMessage}
						onReplyChange={setReplyMessage}
						onReplySubmit={sendReply}
						sendingReply={reply.isPending}
						onStatusChange={changeStatusMessage}
						statusUpdating={updateStatus.isPending}
					/>
				</Card>
			</div>
		</div>
	);
}
