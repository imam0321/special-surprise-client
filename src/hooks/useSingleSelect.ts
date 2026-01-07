import { useEffect, useState } from "react";

interface UseSingleSelectProps {
  initialId?: string;
  isEdit: boolean;
  open: boolean;
}

interface UseSingleSelectReturn {
  selectedId: string;
  setSelectedId: (id: string) => void;
  reset: () => void;
}

export const useSingleSelect = ({
  initialId,
  isEdit,
  open,
}: UseSingleSelectProps): UseSingleSelectReturn => {
  const [selectedId, setSelectedId] = useState<string>(
    isEdit ? initialId ?? "" : ""
  );

  const reset = () => {
    setSelectedId(isEdit ? initialId ?? "" : "");
  };

  useEffect(() => {
    if (open) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialId]);

  return {
    selectedId,
    setSelectedId,
    reset,
  };
};
