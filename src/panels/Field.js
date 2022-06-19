import React, {lazy, useState} from 'react';
import {Button, FormItem, Input, Panel, PanelHeader, Popper} from "@vkontakte/vkui";

const Field = (props) => {

    const [shown, setShown] = React.useState(false);
    const [isLast, setIsLast] = useState(props.number);
    const [current, setCurrent] = useState(0)
    const buttonRef = React.useRef();


    const doing = () => {
        setShown(false)
        setCurrent(current  + 1)
        setIsLast(isLast - 1)
        if (isLast <= 0){

        }
    }

    console.log(current)
    console.log(props.gamers)
    return (
        <Panel id={props.id} centered={true}>
            <PanelHeader centered={true}>Spy...</PanelHeader>
            <React.Fragment>
                <Button onClick={() => doing}
                >
                    Следующий игрок
                </Button>
                <Button
                    getRootRef={buttonRef}
                    onClick={() => setShown(!shown)}
                    style={{ margin: 50 }}
                >
                    {shown ? "Закрыть" : "Посмотреть"}
                </Button>

                {shown && (
                    <Popper
                        offsetDistance={8}
                        style={{ padding: "9px 12px" }}
                        targetRef={buttonRef}
                    >
                        Твой номер: {props.gamers[current]}
                    </Popper>
                )}
            </React.Fragment>
        </Panel>
    );
};

export default Field;