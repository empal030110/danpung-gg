import { userPageProps } from "./props/userProps";

export default function SearchPage({ params }: userPageProps) {
    const name = decodeURIComponent(params.name);

    return (
        <div>
            <p>{name}</p>
        </div>
    );
}
