import { INITIAL_KANBAN_DATA } from '@/data/initial-kanban-data';

export async function fetchInitialKanbabData(): Promise<KanbanListType[]> {
  const storedData: string | null = localStorage.getItem('kanban');

  if (!storedData) {
    const initialDataString: string = JSON.stringify(INITIAL_KANBAN_DATA);
    localStorage.setItem('kanban', initialDataString);
    return Promise.resolve(INITIAL_KANBAN_DATA);
  } else {
    let response: KanbanListType[] = JSON.parse(storedData);
    return Promise.resolve(response);
  }
}
