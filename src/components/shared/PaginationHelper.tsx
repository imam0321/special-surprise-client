import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function PaginationHelper() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="ghost" size="sm">
          2
        </Button>
        <Button variant="ghost" size="sm">
          3
        </Button>
        <span className="mx-2">...</span>
        <Button variant="ghost" size="sm">
          8
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
