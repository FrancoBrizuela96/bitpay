interface Props {
    className?: string;
}

export const Divider = ({ className }: Props) => {
    return (
        <div
            className={`h-[2px] bg-gray-200 w-full m-auto flex ${className}`}
        />
    );
};
