"use client";

import Loader from "./Loader";

export default function Preloader({ onComplete }) {
  return <Loader onComplete={onComplete} />;
}
