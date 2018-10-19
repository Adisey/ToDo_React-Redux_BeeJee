// Core
import { object, string} from 'yup';

const isRequired    = 'Не должно быть пустым!';
const isEmail       = 'Не валидный Email!';
const min3          = 'Минимум 3 символа!';
const min5          = 'Минимум 5 символов!';
const max25         = 'Максимум 25 символов!';


export const login = {
    shape: {
        login:    'admin',
        password: '',
    },
    schema: object().shape({
        login: string()
            .required(isRequired)
            .min(5, min5),
        password: string()
            .required(isRequired)
            .min(3, min3),
    }),
};
export const task = {
    shape: {
        username: 'Adisey',
        email:    'admin@g.mail',
        text:     'Задача № Х',
    },
    schema: object().shape({
        username: string()
            .required(isRequired)
            .min(5, min5)
            .max(25, max25),
        email: string()
            .email(isEmail)
            .required(isRequired),
        text: string()
            .required(isRequired)
            .min(3, min3)
            .max(25, max25),
    }),
};
