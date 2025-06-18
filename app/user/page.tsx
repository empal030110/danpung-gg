interface SearchPageProps {
    searchParams: Promise<{ name?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { name } = await searchParams;

    return (
        <div>
            <p>{name}</p>
        </div>
    );
}
