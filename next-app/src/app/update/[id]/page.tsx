'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Update = () => {
  const router = useRouter();
  const params = useParams();

  const id = params.id;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/topics/${id}`)
      .then(res => res.json())
      .then(result => {
        setTitle(result.title);
        setBody(result.body);
      });
  });

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const body = (form.elements.namedItem('body') as HTMLTextAreaElement).value;

        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, options)
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
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
};

export default Update;
