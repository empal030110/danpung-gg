import { userNameProps } from "../userProps/props";

export default async function SearchPage({ params }: userNameProps) {
    const { name } = await params;
    const userName = decodeURIComponent(name);

    return (
        <div>
            <p>{userName}</p>
        </div>
    );
}
