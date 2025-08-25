// src/client/components/LocationPane.tsx
import * as React from 'react';

interface PairedLine {
    isDiff: boolean;
}

interface LocationPaneProps {
    pairedLines: PairedLine[];
    onLineClick: (index: number) => void;
}

const LocationPane: React.FC<LocationPaneProps> = ({ pairedLines, onLineClick }) => {
    return (
        <div className="location-pane">
            {pairedLines.map((line, index) => (
                <div
                    key={index}
                    className={`location-line ${line.isDiff ? 'changed' : 'unchanged'}`}
                    onClick={() => onLineClick(index)}
                    title={`Line ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default LocationPane;