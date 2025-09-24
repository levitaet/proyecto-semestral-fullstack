import "./HomeComponent.css";

const DropMenu = (props: { data: {id: number, name: string}[]; onSelect: (item: string) => void; }) => {
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