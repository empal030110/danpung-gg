interface Props {
    params: { name: string }
}

export default function SearchPage({ params }: Props) {
    const name = decodeURIComponent(params.name);

    return (
        <div>
            <p>{name}</p>
        </div>
    );
}
