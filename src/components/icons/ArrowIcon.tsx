interface Props {
    className?: string;
}

export const ArrowIcon = ({ className }: Props) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}>
            <g id="vuesax/outline/arrow-down">
                <g id="arrow-down">
                    <path
                        id="Vector"
                        d="M8.00001 11.1998C7.53335 11.1998 7.06668 11.0198 6.71335 10.6664L2.36668 6.31977C2.17335 6.12643 2.17335 5.80643 2.36668 5.6131C2.56001 5.41977 2.88001 5.41977 3.07335 5.6131L7.42001 9.95977C7.74001 10.2798 8.26001 10.2798 8.58001 9.95977L12.9267 5.6131C13.12 5.41977 13.44 5.41977 13.6333 5.6131C13.8267 5.80643 13.8267 6.12643 13.6333 6.31977L9.28668 10.6664C8.93335 11.0198 8.46668 11.1998 8.00001 11.1998Z"
                        fill="#647184"
                    />
                </g>
            </g>
        </svg>
    );
};
