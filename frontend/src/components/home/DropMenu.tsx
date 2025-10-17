import "./HomeComponent.css";
import type { Tag } from "../../types/post";

const DropMenu = (props: { data: Tag[]; onSelect: (item: string) => void; }) => {
    return (
        <div>
            {props.data.map((item, index) => (
                <div className="dropdown-item" key={index} onClick={() => props.onSelect(item.name)}>
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export { DropMenu };