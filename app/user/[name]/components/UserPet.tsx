import Image from "next/image";
import { petProps } from "../../userProps/props";

export default function UserPet({ pets = [] }: { pets?: petProps[] }) {
    if (!pets.length) return null;

    return (
        <div className="w-full flex flex-col gap-[8px]">
            <p className="font-bold">펫</p>
            <div className="grid grid-cols-1 pc:grid-cols-2 gap-[8px]">
                {pets.map((pet, idx) => {
                    const equipment = pet.pet_equipment;
                    const attack = equipment?.item_option?.find((option) => option.option_type === '공격력')?.option_value;
                    const magic = equipment?.item_option?.find((option) => option.option_type === '마력')?.option_value;

                    return (
                        <div key={idx} className="border border-neutral-400 p-[12px] rounded-[8px]">
                            <div className="flex items-center gap-[8px]">
                                <Image src={pet.pet_icon || ""} alt={pet.pet_name || ""} width={40} height={40} />
                                <div>
                                    <p className="text-[12px] text-neutral-500 dark:text-neutral-400">{pet.pet_type}</p>
                                    <p className="text-[14px] font-bold">{pet.pet_name}</p>
                                </div>
                            </div>
                            {equipment?.item_name && (
                                <div className="flex items-center gap-[8px] mt-[8px] pt-[8px] border-t border-neutral-400">
                                    <Image src={equipment.item_icon || ""} alt={equipment.item_name} width={30} height={30} />
                                    <div className="text-[12px]">
                                        <p>{equipment.item_name}</p>
                                        {attack && <p>공격력 +{attack}</p>}
                                        {magic && <p>마력 +{magic}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
