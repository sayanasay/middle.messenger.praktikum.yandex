import imgUrl from '../assets/default.jpg'

export const chats = [
  {
    id: 1,
    title: 'Вадим',
    avatar: imgUrl,
    unread: 0,
    messages: [
      {
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        time: '06:06',
      },
      {
        file: imgUrl,
        time: '07:07',
      },
      {
        me_author: 'true',
        text: 'Круто!',
        time: '08:08',
      },
    ],
  },
  {
    id: 2,
    title: 'chat-2',
    avatar: imgUrl,
    unread: 2,
    messages: [
      {
        text: 'Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus.',
        time: '06:06',
      },
      {
        me_author: 'true',
        file: imgUrl,
        time: '07:07',
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '09:09',
      },
    ],
  },
  {
    id: 3,
    title: 'chat-3',
    avatar: imgUrl,
    unread: 3,
    messages: [
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '06:06',
      },
      {
        me_author: 'true',
        file: imgUrl,
        time: '07:07',
      },
      {
        text: 'Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus.',
        time: '10:10',
      },
    ],
  },
];
