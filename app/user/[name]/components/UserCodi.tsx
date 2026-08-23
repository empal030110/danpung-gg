import Image from "next/image";
import { cashItemProps } from "../../userProps/props";

// 노출 순서 고정. 반지 4개는 항상 한 줄로 묶어서 보여줘야 해서 나머지 슬롯과 분리해서 그림
const MAIN_SLOTS = ['모자', '얼굴장식', '눈장식', '귀고리', '상의', '하의', '신발', '장갑', '망토', '무기'];
const RING_SLOTS = ['반지1', '반지2', '반지3', '반지4'];

function CodiCell({ slot, item }: { slot: string; item?: cashItemProps }) {
    return (
        <div className="flex items-center gap-[8px] border border-neutral-400 p-[12px] rounded-[8px] min-w-0">
            {item ? (
                <>
                    <Image src={item.cash_item_icon} alt={item.cash_item_name} width={40} height={40} className="shrink-0" />
                    <div className="text-[12px] min-w-0">
                        <p className="text-neutral-500 dark:text-neutral-400 truncate">{item.cash_item_equipment_part}</p>
                        <p className="font-bold text-[14px] truncate">{item.cash_item_name}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-[40px] h-[40px] bg-neutral-400"></div>
                    <div className="text-[12px] min-w-0">
                        <p className="text-neutral-500 dark:text-neutral-400 truncate">{slot}</p>
                        <p className="text-[12px] text-neutral-500 dark:text-neutral-400">-</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default function UserCodi({ items = [] }: { items?: cashItemProps[] }) {
    const findItem = (slot: string) => items.find((cashItem) => cashItem.cash_item_equipment_slot === slot);

    return (
        <div className="w-full flex flex-col gap-[8px]">
            <div className="grid grid-cols-2 pc:grid-cols-4 gap-[8px]">
                {MAIN_SLOTS.map((slot) => (
                    <CodiCell key={slot} slot={slot} item={findItem(slot)} />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-[8px]">
                {RING_SLOTS.map((slot) => (
                    <CodiCell key={slot} slot={slot} item={findItem(slot)} />
                ))}
            </div>
        </div>
    );
}
