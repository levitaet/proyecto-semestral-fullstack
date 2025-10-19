import "./HomeComponent.css";

const DropMenu = (props: { data: string[]; onSelect: (item: string) => void; }) => {
    return (
        <div>
            {props.data.map((item, index) => (
                <div className="dropdown-item" key={index} onClick={() => props.onSelect(item)}>
                    {item}
                </div>
            ))}
        </div>
    );
};

export { DropMenu };