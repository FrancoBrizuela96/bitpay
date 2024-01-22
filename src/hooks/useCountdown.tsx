import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Props {
    endDate: string;
}

interface CountdownHookResult {
    timeRemaining: string;
}

const useCountdown = ({ endDate }: Props): CountdownHookResult => {
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const router = useRouter();

    const calculateTimeRemaining = (): number => {
        const now = new Date();
        const target = new Date(endDate);
        const difference = target.getTime() - now.getTime();

        // Timer finished
        if (difference <= 0) {
            // router.push("/order/failed");
            return 0;
        }

        // Convert the time difference to seconds
        return Math.floor(difference / 1000);
    };

    useEffect(() => {
        setTimeRemaining(calculateTimeRemaining());

        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [endDate, calculateTimeRemaining]);

    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        if (hours === 0) {
            return `${String(minutes).padStart(2, "0")}:${String(
                seconds
            ).padStart(2, "0")}`;
        }

        return `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    };

    return {
        timeRemaining: formatTime(timeRemaining),
    };
};

export default useCountdown;
