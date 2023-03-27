import {Input} from "./Input";
import {useState} from "react";


export function Root(): JSX.Element {
    const [model, setModel] = useState('');
    return (
        <div>
            <div>{model}</div>
            <Input type='password' modelChange={(e) =>setModel(e)}/>
        </div>
    );
}
