import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function APIinput({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data.value);

  const onChange = useCallback((evt) => {
      const cappedNumber = Math.min(255, Math.max(0, evt.target.value));
      setNumber(cappedNumber);
      updateNodeData(id, { value: cappedNumber });
    }, []);
    
    return (
        <div className="number-input">
        <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <div>URL</div>
      <input
        id={`number-${id}`}
        name="sting"
        type="text"
        onChange={onChange}
        // value={number}
      />
      <div>body JSON</div>
      <input
        id={`number-${id}`}
        name="text"
        type="tex"
        height="50"
        onChange={onChange}
        // value={}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default APIinput;