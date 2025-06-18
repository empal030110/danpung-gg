export default async function SearchPage({ params }: { params: { name: string } }) {
    const name = decodeURIComponent(params.name);

    return (
        <div>
            <p>{name}</p>
        </div>
    );
}
