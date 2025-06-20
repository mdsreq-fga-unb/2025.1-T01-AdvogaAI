import { redirect } from 'next/navigation';

export default function ClientRedirectPage() {
  redirect('/client/clientList');
}
