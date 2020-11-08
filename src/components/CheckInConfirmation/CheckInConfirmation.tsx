import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface CheckInConfrimationProps {
  clubber: string | undefined;
  groupId: string | undefined;
  onContinue: () => void;
}

const CheckInConfirmation = ({
  clubber,
  groupId,
  onContinue,
}: CheckInConfrimationProps): JSX.Element => {
  return (
    <div className={"container"}>
      <h2>
        you are entered <FontAwesomeIcon icon={faCheck} />
      </h2>
      <div>
        {clubber} is <strong>#{groupId}</strong>
      </div>
      <button className={"enrollClubber"} onClick={() => onContinue()}>
        Enroll next clubber
      </button>
    </div>
  );
};

export default CheckInConfirmation;
