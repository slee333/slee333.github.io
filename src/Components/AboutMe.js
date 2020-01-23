import React, { useState } from "react";
import MedStudent from "./MedStudent";
import Developer from "./Developer";
import Engineer from "./Engineer";
import Me from "./Me";
import Hobby from "./Hobby";
import Blog from "./Blog";

export default () => {
  const [about, setAbout] = useState(0);
  if (about == 0) {
    return <Me setAbout={setAbout} />;
  } else if (about === 1) {
    return <MedStudent setAbout={setAbout} />;
  } else if (about === 2) {
    return <Developer setAbout={setAbout} />;
  } else if (about === 3) {
    return <Engineer setAbout={setAbout} />;
  } else if (about === 4) {
    return <Blog setAbout={setAbout} />;
  } else if (about === 5) {
    return <Hobby setAbout={setAbout} />;
  }
  // return (
  //   <>
  //     <Me me={me}, setMe = {setMe} />
  //     <MedStudent />
  //     <Developer />
  //     <Engineer />
  //     <Hobby />
  //   </>
  // );
};
