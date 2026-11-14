'use client';

import { useParams } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';
import { ErrorNote } from '@/components/admin/ui';

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const n = Number(id);
  if (!Number.isInteger(n) || n < 1) return <ErrorNote>This post could not be found.</ErrorNote>;
  // key: a fresh editor when moving from /new to the saved post's page
  return <BlogEditor key={n} id={n} />;
}
