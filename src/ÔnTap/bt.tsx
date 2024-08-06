import React, { useState } from 'react';

type PropType = {
    name: string;
    sex: boolean;
};

export const BT = (props: PropType) => {
    const [count, setCount] = useState<number>(0);
    const [isUpCollapsed, setIsUpCollapsed] = useState<boolean>(false);
    const [isDownCollapsed, setIsDownCollapsed] = useState<boolean>(false);

    return (
        <>
            {/* <p>Name: {props.name}</p>
            <p>Sex: {props.sex ? 'Nam' : 'Nữ'}</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount((pre) => pre + 1)}>Increment Count</button> */}

            <div className='up'>
                <p>
                    {isUpCollapsed ? 'Show' : 'Hide'} Title 1:
                    <button  onClick={() => setIsUpCollapsed(!isUpCollapsed)} >Click</button>
                </p>
                {!isUpCollapsed && (
                    <>
                        <p>Hello</p>
                    </>
                )}
            </div>

            <div className='down'>
                <p>
                    {isDownCollapsed ? 'Show' : 'Hide'} Title 2:
                    <button onClick={() => setIsDownCollapsed(!isDownCollapsed)}>Click</button>
                </p>
                {!isDownCollapsed && (
                    <>
                        <p>Bye Bye</p>
                    </>
                )}
            </div>
        </>
    );
};

export default BT
