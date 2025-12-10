"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function HeartButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      className="absolute top-3 left-3 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
    >
      <Heart
        size={18}
        className={
          liked ? "text-surprise-pink fill-surprise-pink" : "text-surprise-pink"
        }
      />
    </button>
  );
}
