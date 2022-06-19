import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, PanelHeaderBack, FormItem, Input, Button} from '@vkontakte/vkui';




const Intro = (props) => {
    const [number, setNumber] = useState('')
    const form = document.getElementById('10')

    const input = (e) => {
        console.log('d')
        console.log(number)
        try {
            if  (!(isNaN(number) && number !== '')){
                props.number(number)
            }
        }
        catch (e) {
            form.status="error"
        }

    }


    return (
        <Panel id={props.id} centered={true}>
            <PanelHeader centered={true}>Spy...</PanelHeader>

            <FormItem top="Введите количество игроков"
                      id={'10'}
                >
                <Input type="text"
                       placeholder="Количество игроков"
                       value={number}
                       onChange={(e) => setNumber(e.target.value)}
                />
            </FormItem>
            <Button size="l" mode="secondary" onClick={(e) => input(e)}>
                Войти в игру
            </Button>
        </Panel>
    )
}
export default Intro;
