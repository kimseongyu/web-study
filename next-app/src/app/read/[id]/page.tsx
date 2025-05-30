type Topic = {
  id: string;
  title: string;
  body: string;
};

const Read = async (props: { params: { id: number } }) => {
  const { id } = await props.params;
  const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, {
    cache: 'no-store',
  });
  const topic: Topic = await res.json();
  return (
    <div>
      <h2>{topic.title}</h2>
      {topic.body}
    </div>
  );
};

export default Read;
