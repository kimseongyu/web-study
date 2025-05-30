import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Control from './Control';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type Topic = {
  id: string;
  title: string;
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // server component: 서버에서 데이터를 가져와서 페이지를 렌더링
  const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
    cache: 'no-store',
  });
  const topics: Topic[] = await res.json();

  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic: Topic) => (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
};

export default RootLayout;
