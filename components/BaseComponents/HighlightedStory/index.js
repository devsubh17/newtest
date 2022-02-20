import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import StoryWrapper from "./style.highlightedstory";
import StoryIcon from "../../StoryIcon";
import { fromNow } from "../../../util/helper";
import { MEDIA } from "../../../util/constants";

const HighlightedStory = ({
  id,
  mediaDetail
}) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  if (!mediaDetail?.media_url) return null;
  return (
    <>
      <StoryIcon
        toggleModal={onOpenModal}
        title={fromNow(mediaDetail?.timestamp)}
        imageUrl={mediaDetail?.media_url}
      />

      <Modal
        open={open}
        center
        onClose={onCloseModal}
        classNames={{ modal: "customModal" }}
        styles={{
          modal: {
            background:
              "linear-gradient(18deg, #dee4e8 0%, rgb(236 229 228) 25%, rgb(239 237 237) 51%, #bfdaf3 75%, #d5e0ea 100%)",
            width: "360px",

            margin: "0",

            padding: "0",
          },
        }}
      >
        <StoryWrapper>
          <div className="content">
            <div className="video">
              {mediaDetail?.media_type === MEDIA.IMAGE ? (
                <img src={mediaDetail?.media_url} />
              ) : (
                <video
                  src={mediaDetail?.media_url}
                  loop
                  autoPlay
                />
              )}
            </div>
          </div>
        </StoryWrapper>
      </Modal>
    </>
  );
};

export default HighlightedStory;
