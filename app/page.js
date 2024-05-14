import Link from 'next/link';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="items-center justify-between">
        <p> Do you have an account? <Link href="/signin"> Sign in </Link> </p>
        <p> If not yet <Link href="/signup"> Sign Up </Link> Here! </p>
      </div>
    </main>
  );
}
