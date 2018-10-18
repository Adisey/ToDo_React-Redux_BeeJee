// Core
import { object, string} from 'yup';

const isRequired    = 'Не должно быть пустым!';
const isEmail       = 'Не валидный Email!';
const min3          = 'Минимум 3 символа!';
const min5          = 'Минимум 5 символов!';


export const login = {
    shape: {
        // email:    'admin@gmail.com', // Вначале думал, что дложен был быть Email
        login:    'admin',
        password: '',
    },
    schema: object().shape({
        // email: string()
        //     .email(isEmail)
        //     .required(isRequired),
        login: string()
            .required(isRequired)
            .min(5, min5),
        password: string()
            .required(isRequired)
            .min(3, min3),
    }),
};
