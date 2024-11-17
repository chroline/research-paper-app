"use client";

import { useAtom } from "jotai/react";

import { useEffect } from "react";

import { paperModalOpenAtom } from "../../atom";

export default function PhotoModal() {
  const [, setModalOpen] = useAtom(paperModalOpenAtom);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  return null;
}
