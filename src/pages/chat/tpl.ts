const tpl = `
  <div class='chat__left'>
    <div class='chat__left-header'>
      {{{ createChatBtn }}}
      {{{ profileLink }}}
      {{{ search }}}
    </div>
    {{{ chatList }}}
  </div>
  <div class='chat__main'>
    {{{ messages }}}
  </div>
`;

export default tpl;
