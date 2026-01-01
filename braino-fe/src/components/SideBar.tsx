import { useState } from "react";
import { DocsIcon } from "../icons/ArticleIcon";
import { LinkIcon } from "../icons/LinksIcon";
import { LogoIcon } from "../icons/LogoIcon";
import { TwitterIcon } from "../icons/TweetIcon";
import { VideoIcon } from "../icons/VideoIcon";
import { YTIcon } from "../icons/YouTubeIcon";
import { SideBarItem } from "./SideBarItem";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function SideBar() {
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    function logout() {
      localStorage.removeItem("token");
      navigate("/signin")
    }

  return (
    <>
      <div className="main">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div>
              <LogoIcon />
            </div>
            <div className="text-2xl font-bold">Braino</div>
          </div>

          <div className="pl-6 mt-6">
            <SideBarItem title={"Tweet"} startIcon={<TwitterIcon />} isSelected={selected === "Tweet"} onClick={() => setSelected("Tweet")} />
            <SideBarItem title={"YouTube"} startIcon={<YTIcon />} isSelected={selected === "YouTube"} onClick={() => setSelected("YouTube")} />
            <SideBarItem title={"Video"} startIcon={<VideoIcon />} isSelected={selected === "Video"} onClick={() => setSelected("Video")} />
            <SideBarItem title={"Article/Docs"} startIcon={<DocsIcon />} isSelected={selected === "Article"} onClick={() => setSelected("Article")} />
            <SideBarItem title={"Link"} startIcon={<LinkIcon />} isSelected={selected === "Link"} onClick={() => setSelected("Link")} />
          </div>

          <div className="mt-50">
            <Button title={"Logout"} variant="danger" onClick={logout} />
          </div>
        </div>
      </div>
    </>
  );
}
