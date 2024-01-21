interface Props {
    className?: string;
}

export const SuccessIcon = ({ className }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="81"
            viewBox="0 0 80 81"
            fill="none"
            className={className}>
            <g id="vuesax/bulk/tick-circle">
                <g id="tick-circle">
                    <path
                        id="Vector"
                        opacity="0.4"
                        d="M40 73.8333C58.4095 73.8333 73.3333 58.9095 73.3333 40.5C73.3333 22.0905 58.4095 7.16666 40 7.16666C21.5905 7.16666 6.66667 22.0905 6.66667 40.5C6.66667 58.9095 21.5905 73.8333 40 73.8333Z"
                        fill="#16A34A"
                    />
                    <path
                        id="Vector_2"
                        d="M35.2667 52.4333C34.6 52.4333 33.9667 52.1667 33.5 51.7L24.0667 42.2667C23.1 41.3 23.1 39.7 24.0667 38.7333C25.0333 37.7667 26.6333 37.7667 27.6 38.7333L35.2667 46.4L52.4 29.2667C53.3667 28.3 54.9667 28.3 55.9333 29.2667C56.9 30.2333 56.9 31.8333 55.9333 32.8L37.0333 51.7C36.5667 52.1667 35.9333 52.4333 35.2667 52.4333Z"
                        fill="#16A34A"
                    />
                </g>
            </g>
        </svg>
    );
};
