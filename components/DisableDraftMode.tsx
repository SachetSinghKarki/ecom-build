"use client";

import { useRouter } from "next/navigation";
import {useDraftModeEnvironment} from "next-sanity/hooks";

export function DisableDraftMode() {
    const environment = useDraftModeEnvironment();
    const router = useRouter();

    if(environment !== "live" && environment !== "unknown") {
        return null; // No draft mode to disable
    }

    const handleClick = async () => {
        await fetch("/draft-mode/disable")
        router.refresh()
    };

    return (
        <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 px-4 py-2 z-50">
            Disable Draft Mode
        </button>
    )
}
