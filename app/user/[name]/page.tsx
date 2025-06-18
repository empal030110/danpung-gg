interface Props {
    params: { name: string }
}

export default async function SearchPage({ params }: Props) {
    const name = decodeURIComponent(params.name);

    return (
        <div>
            <p>{name}</p>
        </div>
    );
}
