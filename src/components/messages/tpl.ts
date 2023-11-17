const tpl = `
  <div class='messages__header'>
    <div class='messages__user'>
      <img class='messages__avatar' src={{avatar}} />
      <span class='messages__name'>{{title}}</span>
    </div>
    <div class='messages__settings'></div>
  </div>
  <ul class='messages__list'>
    {{{ messagesItems }}}
  </ul>
  <form class='messages__footer'>
    <button class='messages__attach'></button>
    {{{ inputMessage }}}
    <button class='messages__send' type='submit'></button>
  </form>
`;

export default tpl;
