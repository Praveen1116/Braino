import { useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { CrossIcon } from "../icons/CrossIcon";
import axios from "axios";

enum ContentType {
  YouTube = "youtube",
  Twitter = "twitter",
  Link = "link",
  Article = "article",
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState(ContentType.YouTube);

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();
    const content = contentRef.current?.value?.trim();

    if (!title) {
      alert("Please add a title");
      return;
    }

    if (type === ContentType.Article && !content) {
      alert("Please add the text content");
      return;
    }

    if (type !== ContentType.Article && !link) {
      alert("Please add the link");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/braino/content`,
        {
          title,
          link: type === ContentType.Article ? content : link,
          content: type === ContentType.Article ? content : "",
          type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      if (contentRef.current) contentRef.current.value = "";
      setType(ContentType.YouTube);
      onClose();
    } catch (e) {
      alert("Failed to add content");
      console.error(e);
    }
}

    return (
      <div>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={onClose}
            />
            {/* Modal */}
            <div className="relative z-10 w-96 items-center p-10 rounded-3xl shadow-2xl bg-blue-50">
              <div
                className="flex justify-end mb-2 cursor-pointer"
                onClick={onClose}
              >
                <CrossIcon />
              </div>
              <div>
                <Input reference={titleRef} placeholder={"Title"} />
                {type === ContentType.Article ? (
                  <div className="m-2">
                    <textarea
                      ref={contentRef}
                      placeholder="Paste article, docs, or plain text"
                      className="p-3 bg-white outline-none rounded-xl w-full min-h-36 resize-none"
                    />
                  </div>
                ) : (
                  <Input reference={linkRef} placeholder={"Link"} />
                )}
              </div>

              <div className="flex flex-1 gap-2 pl-2.5 items-center mt-3 mb-3 flex-wrap">
                <Button
                  title="Youtube"
                  variant={
                    type === ContentType.YouTube ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.YouTube);
                  }}
                />
                <Button
                  title={"Tweet"}
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => {
                    setType(ContentType.Twitter);
                  }}
                />
                <Button
                  title={"Link"}
                  variant={type === ContentType.Link ? "primary" : "secondary"}
                  onClick={() => {
                    setType(ContentType.Link);
                  }}
                />
                <Button
                  title={"Text"}
                  variant={type === ContentType.Article ? "primary" : "secondary"}
                  onClick={() => {
                    setType(ContentType.Article);
                  }}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  title={"Add"}
                  variant="submission"
                  onClick={addContent}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

