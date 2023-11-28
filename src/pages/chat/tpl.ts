const tpl = `
  <div class='chat__left'>
    <div class='chat__left-header'>
      <a class='chat__link' data-nav='/profile'>
        <span class='chat__link-text'>Профиль</span>
        <div class='chat__link-icon'></div>
      </a>
      {{{ search }}}
    </div>
    {{{ chatList }}}
  </div>
  <div class='chat__main'>
    {{{ messages }}}
  </div>
`;

export default tpl;
