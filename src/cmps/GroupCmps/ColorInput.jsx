export function ColorInput({ onUpdateGroupColor }) {


    const colors = ['#072227', '#064635', '#91C483', '#BAFFB4',
        '#781D42', '#9A0680','#F2789F','#FEE3EC',
        '#3E8E7E','#406882','#7CD1B8','#B1D0E0'
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

// '#C84B31'