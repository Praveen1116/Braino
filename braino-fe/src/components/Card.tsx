import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useEffect, useRef } from "react";
// import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  contentId: string,
  title: string;
  link: string;
  type:
    | "image"
    | "twitter"
    | "video"
    | "link"
    | "audio"
    | "article"
    | "youtube";
  refresh: () => void;
}

export function Card({ contentId, title, link, type, refresh }: CardProps) {

  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const tweetRef = useRef<HTMLDivElement>(null)

  async function deleteBtn() {
    await axios.delete(`${BACKEND_URL}/api/v1/braino/delete/${contentId}`,
      {
        headers: {
          "Authorization": localStorage.getItem("token")
      }
    });
    refresh();
  }

  useEffect(() => {
    if(type === "twitter" && (window as any).twttr && tweetRef.current) {
      (window as any).twttr.widgets.load(tweetRef.current);
    }
  }, [type, link]);

  return (
    <div className="break-inside-avoid mb-6">
      <div className="w-80 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        <div className="p-4 pb-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg text-gray-800 leading-tight line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-gray-400">
              {/* <button className="p-2 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <ShareIcon size="sm" />
              </button> */}
              <button className="p-2 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer" onClick={deleteBtn}>
                <DeleteIcon size="sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="px-4 py-2 flex-1 flex items-center justify-center">
          {type === "youtube" && (
            <div className="w-full rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <iframe
                className="w-full aspect-video"
                src={link.replace("watch", "embed").replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {type === "twitter" && (
            <div className="w-full flex justify-center" ref={tweetRef}>
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}

          {type === "link" && (
            <div className="w-full flex justify-center">
              <a href={link} rel="noopener noreferrer" className="text-blue-600 underline break-all">{link}</a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 pt-2 mt-auto">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize tracking-wide
          ${
            type === "youtube"
              ? "bg-red-50 text-red-700 border border-red-100"
              : type === "link"
              ? "bg-gray-200 text-gray-700 border border-gray-300"
              : "bg-blue-50 text-blue-700 border border-blue-100"
          }`}
          >
            {type}
          </span>
        </div>
      </div>
    </div>
  );
}
