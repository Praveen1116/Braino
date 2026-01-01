import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

export function SharePage() {
  const { shareLink } = useParams();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState([]);

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
        {content.map(({ _id, title, link, type }) => (
          <Card key={_id} contentId={_id} title={title} link={link} type={type} refresh={() => {}} />
        ))}
      </div>
    </div>
  );
}