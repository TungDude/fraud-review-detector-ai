interface DashedBoxProps {
    children?: React.ReactNode;
}

export default function DashedBox({ children }: Readonly<DashedBoxProps>) {
    return (
        <div className="rounded-lg border border-dashed border-gray-600/40 bg-muted/30 py-16 text-center text-sm text-gray-600">
            {children}
        </div>
    )
}