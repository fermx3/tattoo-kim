import { redirect } from 'next/navigation';

// Root / → redirect to /es
export default function RootPage() {
  redirect('/es');
}
