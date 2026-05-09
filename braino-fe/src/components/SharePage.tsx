import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card";

export function SharePage() {
  const { shareLink } = useParams();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchSharedBrain() {
      const res = await axios.get(`${BACKEND_URL}/api/v1/braino/share/${shareLink}`);
      setUsername(res.data.username);
      setContent(res.data.content);
    }
    fetchSharedBrain();
  }, [shareLink]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{username}'s Shared Brain</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {content.map(({ _id, title, link, content, type }) => (
          <Card key={_id} contentId={_id} title={title} link={link} content={content} type={type} refresh={() => {}} />
        ))}
      </div>
    </div>
  );
}
