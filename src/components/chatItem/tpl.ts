const tpl = `
  <img class='chat-item__avatar' src={{avatar}} />
  <div class='chat-item__content'>
    <div class='chat-item__name'>{{title}}</div>
    <div class='chat-item__time'>{{this.time}}</div>
    <div class='chat-item__message'>{{this.text}}</div>
    {{#if unread}}
      <div class='chat-item__count'>{{unread}}</div>
    {{/if}}
  </div>
`;

export default tpl;
