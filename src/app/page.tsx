import BasicChat from "@/modules/basic_chat/Index";
import EmailForm from "@/modules/email/Index";
import Map from "@/modules/map/Index";
import VideoChat from "@/modules/video_chat/Index";

export default function Home() {
  return (
    <div>
      <BasicChat />
      <VideoChat />
      <Map />
      <EmailForm />
    </div>
  );
}
