import { memo } from "react";
import { VideoJs } from "./VideoJs";
import { buildTracks } from "./subtitle";
import { useWowzaResource } from "./wowza";

type PlayerProps = {
  src: string;
  subtitles: Subtitle[];
  autoplay?: boolean;
  onEnded?: () => void;
};

function WowzaPlayerBase(props: PlayerProps) {
  const resource = useWowzaResource(props.src);
  const sources =
    resource.state === "success"
      ? [
          {
            type: "application/vnd.apple.mpegurl",
            src: resource.url,
          },
        ]
      : [];

  return (
    <VideoJs
      options={{
        sources,
        autoplay: props.autoplay,
      }}
      tracks={buildTracks(props.subtitles)}
      onEnded={props.onEnded}
    />
  );
}

export const WowzaPlayer = memo(WowzaPlayerBase);