/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function SurprisesSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    const query = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm) {
      query.set("searchTerm", debouncedSearchTerm);
    } else {
      query.delete("searchTerm");
    }

    router.replace(`?${query.toString()}`);
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-full md:w-1/2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search surprise..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
