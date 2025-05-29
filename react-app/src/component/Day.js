import useFetch from "../hooks/useFetch";
import Word from "./Word";
import { useParams } from "react-router-dom";

const Day = () => {
  const { day } = useParams();
  const words = useFetch(`http://localhost:3001/words?day=${day}`);

  return (
    <div>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word key={word.id} word={word} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Day;
