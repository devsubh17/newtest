import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { numFormatter } from "../../util/helper";
import HashTagWrapper from "./style.hashtag";

const HashTagCard = (props) => {
  const { tag } = props;
  return (
    <HashTagWrapper>
      <Link href={`/hash/${tag}`}>
        <a>
          <div className="hashtag">
            <div className="content">
              <h3>#{props.tag}</h3>
              <span>{numFormatter(props.count)} Post</span>
            </div>
          </div>
        </a>
      </Link>
    </HashTagWrapper>
  );
};

export default HashTagCard;
