import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { motion } from "framer-motion";
import { SideBar } from "../components/SideBar";
import { CreateContentModal } from "../components/CreateContentModal";
import { useEffect, useState } from "react";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const {content, refresh} = useContent();

  useEffect(() => {
    refresh();
  }, [modelOpen])

  return (
    <div className="flex min-h-screen bg-gray-100 font-['Poppins'] text-gray-800">
      
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 min-h-screen hidden md:block pl-2">
        <SideBar />
      </div>

      <div>
        <CreateContentModal open={modelOpen} onClose={() => setModelOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
             <h1 className="text-2xl font-bold text-gray-900">All Notes</h1>
          </div>
          
          <div className="flex gap-4">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
              onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/braino/share`, {
                  share: true
                }, {
                  headers: {
                    "Authorization": localStorage.getItem("token")
                  }
                });

                const shareURL = `http://localhost:5173/braino/share/${response.data.hash}`;
                alert(shareURL);
              }}
                title={"Share Brain"}
                variant="secondary"
                startIcon={<ShareIcon size={"sm"} />}
              />
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                title={"Add Content"}
                onClick={() => {setModelOpen(true)}}
                variant="primary"
                startIcon={<PlusIcon size={"sm"} />}
              />
            </motion.div>

          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {content.map(({_id, title, link, type}) => <Card key={_id} contentId={_id} refresh={refresh} title={title} link={link} type={type} />)}
        </div>

      </div>
    </div>
  );
}