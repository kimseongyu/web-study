'use client';

import { useRouter } from 'next/navigation';

const Create = () => {
  const router = useRouter();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const body = (form.elements.namedItem('body') as HTMLTextAreaElement).value;

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`, options)
          .then(res => res.json())
          .then(result => {
            const lastId = result.id;
            const url = `/read/${lastId}`;
            router.refresh();
            router.push(url);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
};

export default Create;
