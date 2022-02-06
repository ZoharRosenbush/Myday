export function ColorInput({ onUpdateGroupColor }) {


    const colors = ['#125C13', '#0C9463', '#91C483', '#BAFFB4',
        '#0061A8', '#3DB2FF', '#7CD1B8', '#B1D0E0',
        '#CE1F6A', '#FF9A8C', '#F2789F', '#FEE3EC',
        '#DD4A48', '#FFB740', '#F0C929', '#F7E590'

    ]
    return (
        <div className="color-input">
            {colors.map(color => {
                return <div
                    onClick={() => onUpdateGroupColor(color)}
                    style={{ backgroundColor: color }}
                    key={color}
                    className="color-value"
                >
                </div>
            })}
        </div>
    )
}
