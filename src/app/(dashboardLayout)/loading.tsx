import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Spinner className="h-20 w-20 text-surprise-pink" />
        </div>
    );
}
