'use client';
import { PageContainer } from '@/components/layouts/page-container';
import KanbanView from '@/components/sections/kanban-view';

export default function Home() {
  return (
    <PageContainer>
      <KanbanView />
    </PageContainer>
  );
}
