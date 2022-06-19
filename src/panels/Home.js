import React from 'react';


import {Panel, PanelHeader, Header, Button, Group, Cell, Avatar, View} from '@vkontakte/vkui';
import {Icon28BrushOutline} from '@vkontakte/icons';
import { Icon28LikeOutline } from '@vkontakte/icons';
import {Icon28BuildingOutline} from '@vkontakte/icons';
import { Icon28FireOutline } from '@vkontakte/icons';
import { Icon28BasketballBallOutline } from '@vkontakte/icons';
import { Icon28MusicMicOutline } from '@vkontakte/icons';
import { Icon28PlaneOutline } from '@vkontakte/icons';
import { Icon28LogoVkOutline } from '@vkontakte/icons';
import { Icon28MasksOutline } from '@vkontakte/icons';
import { Icon28DiamondOutline } from '@vkontakte/icons';




const Home = ({id, cards}) => {

    return (
        <Panel id={id}>
            <PanelHeader centered={true}>Spy...</PanelHeader>

            <Group header={<Header mode="secondary">Локации</Header>}>
            {/*    {cards.map((card) =>*/}
            {/*        <Cell before='<'{card.icon} '/>'*/}
            {/*                children={card.place}*/}
            {/*              expandable*/}

            {/*        />*/}
            {/*    )}*/}

                <Cell
                    expandable
                    before={<Icon28LikeOutline  />}
                >
                    Палата в больнице
                </Cell>
                <Cell
                    expandable
                    before={<Icon28BrushOutline/>}
                >
                    Комната художника
                </Cell>
                <Cell
                    expandable
                    before={<Icon28BuildingOutline/>}
                >
                    А корпус ДВФУ
                </Cell>
                <Cell
                    expandable
                    before={<Icon28LogoVkOutline/>}
                >
                    Главный офис ВК
                </Cell>
                <Cell
                    expandable
                    before={<Icon28MasksOutline/>}
                >
                    Балкон в театре
                </Cell>
                <Cell
                    expandable
                    before={<Icon28DiamondOutline/>}
                >
                    Лучший вуз (ДВФУ)
                </Cell>
                <Cell
                    expandable
                    before={<Icon28MusicMicOutline/>}
                >
                    Караоке-бар
                </Cell>
                <Cell
                    expandable
                    before={<Icon28PlaneOutline/>}
                >
                    Борт самолета
                </Cell>
                <Cell
                    expandable
                    before={<Icon28BasketballBallOutline/>}
                >
                    Спортивная площадка
                </Cell>
                <Cell
                    expandable
                    before={<Icon28FireOutline />}
                >
                    VK-фест
                </Cell>
            </Group>

        </Panel>
    )
};


export default Home;
