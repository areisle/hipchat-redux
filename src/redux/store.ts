import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import { rootReducer } from './reducers';
import { State } from '../types';
const uuid = require('uuid/v1');

const dummyStoreContent: State = {
    user: '3',
    activeConversation: '1',
    conversations: {
        1: {
            private: true,
            people: ['2'],
            unread: new Set(),
            messages: [],
        },
        2: {
            private: true,
            people: ['1'],
            unread: new Set(['9']),
            messages: ['7', '8', '9'],
        },
        3: {
            private: false,
            people: ['1', '2', '4'],
            unread: new Set(['5', '6']),
            messages: ['1', '2', '3', '4', '5', '6'],
            title: 'the Dans'
        },
    },
    messages: {
        1: {
            content: `Austin normcore kinfolk YOLO. Fanny pack adaptogen butcher, deep v fixie yr scenester listicle la croix semiotics before they sold out iPhone kale chips.`,
            createdAt: new Date(2019, 1, 13, 12, 1),
            person: '5',
        },
        2: {
            content: `bread green juice thundercats, craft beer palo santo jianbing 8-bit paleo hashtag. Pok pok blue bottle deep v, enamel pin jianbing 90's you probably haven't heard of them salvia irony PBR&B la croix subway tile. Brooklyn authentic hammock `,
            createdAt: new Date(2019, 1, 13, 12, 2),
            person: '4',
        },
        3: {
            content: `sartorial pork belly succulents air plant shaman `,
            createdAt: new Date(2019, 1, 13, 12, 3),
            person: '1',
        },
        4: {
            content: 'bicycle rights street art. Lo-fi farm-to-table ',
            createdAt: new Date(2019, 1, 13, 12, 4),
            person: '3',
        },
        5: {
            content: `wolf fam palo santo VHS. Crucifix schlitz yuccie food
            truck bicycle rights retro. Listicle shaman cray
             lomo kombucha`,
            createdAt: new Date(2019, 1, 13, 12, 5),
            person: '2',
        },
        6: {
            content: `cliche pitchfork beard fingerstache schlitz
            lumber selvage vegan chia roof party.`,
            createdAt: new Date(2019, 1, 13, 12, 5),
            person: '5',
        },
        7: {
            content: `Tattooed etsy blue bottle, tacos crucifix vaporware
            bushwick. Portland chillwave drinking vinegar`,
            createdAt: new Date(2019, 1, 13, 12, 6),
            person: '3',
        },
        8: {
            content: `blargh monkeys`,
            createdAt: new Date(2019, 1, 13, 12, 6),
            person: '3',
        },
        9: {
            content: `tacos crucifix vaporware bushwick. Portland chillwave drinking  Tattooed etsy blue bottle, vinegar`,
            createdAt: new Date(2019, 1, 13, 12, 6),
            person: '1',
        }
    },
    people: {
        1: {
            name: 'cooldan',
            handle: 'TheRealEricChuah',
        },
        2: {
            name: 'wutdan',
        },
        3: {
            name: 'holidan',
        },
        4: {
            name: 'grossdan',
        },
        5: {
            name: 'happydan',
        },
    }
}

const store = createStore(
    rootReducer,
    dummyStoreContent,
    devToolsEnhancer({}),
);

export { store };